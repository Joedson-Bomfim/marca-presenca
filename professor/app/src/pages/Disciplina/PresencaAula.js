import React, { useEffect, useState, useContext } from "react";
import { Text, ScrollView, View, Alert, Platform, PermissionsAndroid } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { fetchPresencaByAula } from '../../Controller/PresencaController';
import AlunoPresenca from '../../components/alunoPresencaRegistrada';
import { useRoute } from '@react-navigation/native';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import exportarEmXML from '../../services/exportacaoXML';
import { closeDatabase } from '../../database/database';
import { converteDataAmericanaParaBrasileira } from '../../services/formatacao';

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Loading from "../../components/LoadingDefaulft";
import styles from "./styles";
import TemaPrincipal from "../../assets/styles";

const PresencaAula = ({ navigation }) => {
    const { colors } = useTheme();
    const route = useRoute();

    const { 
            aula_id, 
            data_presenca, 
            dia_semana, 
            horario_inicio_aula, 
            horario_fim_aula, 
            quantidade_aulas, 
            total_alunos, 
            nome_disciplina 
        } = route.params;

    const [alunosPresenca, setAlunosPresenca] = useState([]);
    const [quantidadeAlunosPresentes, setQuantidadeAlunosPresentes] = useState(0);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        listaDisciplinas();
    }, []);

    const listaDisciplinas = async () => {
        setVisible(true);
        try {
            const listaAluno = await fetchPresencaByAula(aula_id, data_presenca);
            setAlunosPresenca(listaAluno);
            
            const quantidade_presentes = listaAluno.reduce((count, item) => 
                item.situacao !== 'Ausente' ? count + 1 : count, 0
            );
            setQuantidadeAlunosPresentes(quantidade_presentes);
        } catch (error) {
            console.log('Não foi possível carregar os alunosPresenca. Verifique se a tabela existe.');
        } finally {
            setVisible(false);
        }
    };

    const handleSituacaoChange = () => {
        listaDisciplinas();
    };

    function abrirPasta() {
        const permissoes = async () => {
            if (Platform.Version <= 28) {
                const granted = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                  ]);
        
                  permissionsGranted = Object.values(granted).every(
                    (permission) => permission === PermissionsAndroid.RESULTS.GRANTED
                  );
                  
                  if (!permissionsGranted) {
                      Alert.alert('Atenção','A permissão necessária não foi concedida');
                      return;
                  }
            }
        }

        permissoes();

        const downloadDir = RNFS.DownloadDirectoryPath;
        const customDir = `${downloadDir}/Lista Presenca CheckMate`;

        const abrirPastaCustomizada = async () => {
            const exists = await RNFS.exists(customDir);
            if (!exists) {
                Alert.alert('Atenção', 'Ainda não há registros na lista de chamdas');

                return;
            }
        }

        abrirPastaCustomizada();
        closeDatabase();

        Alert.alert(
            'Confirmação',
            'Você deseja abrir a pasta de destino dos registros de presença?',
            [
                { text: 'Não', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'Sim', onPress: async () => {
                    try {
                        await FileViewer.open(customDir);
                        console.log('Pasta aberta com sucesso!');
                    } catch (error) {
                        console.log('Erro ao abrir a pasta:', error.message);
                        Alert.alert(
                            'Atenção',
                            'Não foi possível abrir a pasta. Por favor, utilize um gerenciador de arquivos alternativo.',
                            [{ text: 'OK' }]
                        );
                    }
                }},
            ],
            { cancelable: false }
        );
    }

    return (
        <View style={[styles.fundoTela, { backgroundColor: colors.background }]}>
            <Text style={[TemaPrincipal.titulo, { color: colors.text }]}>{nome_disciplina}</Text>

            <View style={styles.dataIcone}>
                <Text style={[styles.detalhes, { color: colors.text }]}>{converteDataAmericanaParaBrasileira(data_presenca)}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon name="account-group" color={colors.icone} size={25} />
                    <Text style={[{ color: colors.text }]}>{quantidadeAlunosPresentes}/{total_alunos}</Text>
                </View>
            </View>
            
            <Text style={[{ color: colors.text }]}>Dia da aula: {dia_semana}</Text>
            <Text style={[{ color: colors.text }]}>Horário: {horario_inicio_aula}-{horario_fim_aula} </Text>
            <Text style={[{color: colors.text, marginBottom: 15}]}>Quantidade de altas: {quantidade_aulas} </Text>

            <Button 
                    mode="contained" onPress={() => exportarEmXML(alunosPresenca, nome_disciplina, data_presenca, horario_inicio_aula, horario_fim_aula)} 
                    style={[TemaPrincipal.botaoPrincipal, TemaPrincipal.marginBottomPadrao]}
                    icon={() => <Icon name={'file-export'} size={30} color="#ffffff" />}>
                    Exportar Lista de Presenças
            </Button>
            <ScrollView style={[TemaPrincipal.lista, {backgroundColor: colors.tertiary}]}>
                <Loading visible={visible} />
                {alunosPresenca.map((item, index) => {
                    let iconeLista = '';
                    if(item.situacao == 'Presente') {
                        iconeLista = 'check-bold';
                    }else if(item.situacao != 'Ausente'){
                        iconeLista = 'information';
                    }else {
                        iconeLista = 'close-thick';
                    }

                    return (
                        <View key={item.id}>
                        <AlunoPresenca
                            id={item.id}
                            nome={item.nome}
                            situacao={item.situacao}
                            data={converteDataAmericanaParaBrasileira(item.data)}
                            aulas_assistidas={item.quantidade_aulas_assistidas}
                            observacao={item.observacao}
                            presenca={item}
                            atualizaSituacao={() => handleSituacaoChange()}
                            icon={iconeLista}
                        />
                    </View>
                    );
            })}
            </ScrollView>
            
            <View style={[TemaPrincipal.botoesEditRegistro, {marginTop: 10}]}>
                <Button 
                    mode="contained" 
                    style={{width: 150}}
                    onPress={() => {navigation.navigate('PresencaForm', { aula_fk: aula_id, data_antiga: data_presenca, quantidade_aulas: quantidade_aulas });}}>
                    Editar Grupo
                </Button>
            
                <Button 
                    mode="contained" onPress={abrirPasta} 
                    style={{width: 150}}
                    icon={() => <Icon name={'folder'} size={30} color="#ffffff" />}>
                    Abrir Pasta
                </Button>
            </View>
        </View>
    );
}

export default PresencaAula;
