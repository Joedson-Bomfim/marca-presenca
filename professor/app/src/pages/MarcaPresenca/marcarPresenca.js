import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { useTheme, Button } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import useBeaconService from "../../services/BeaconService";
import AlunoPresenca from "../../components/alunoPresenca";
import { CheckBluetoothAndLocation } from "../../services/CheckBluetoothAndLocation";
import { fetchAlunoDisciplinaMarcaPresenca } from "../../Controller/AlunoDisciplinaController";
import { addMultiplePresenca } from "../../Controller/PresencaController";
import { converteDataBrasileiraParaAmericana } from "../../services/formatacao";

import Loading from "../../components/LoadingScreenDots";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import TemaPrincipal from "../../assets/styles";
import styles from "./styles";

const SelecionaDisciplinaAula = ({ navigation }) => {
    const route = useRoute();
    const { colors } = useTheme();
    
    const { disciplinaId, aulaId, quantidade_aulas, data } = route.params;
    const { uuidList, estadoBeacon, startBeaconRanging, stopBeaconRanging } = useBeaconService();
    const [ alunosDisciplinas, setAlunoDisciplina] = useState([]);
    const [ presencas, setPresencas] = useState([]);
    const [ procuraPrimeiraVez, setProcuraPrimeiraVez] = useState(true);

    const aula_fk = aulaId; 
    const dataPresenca = converteDataBrasileiraParaAmericana(data); 
    const[totalAlunos, setTotalAluno] = useState(0);
    const[alunosPresente, setAlunoPresente] = useState(0);
    

    useEffect(() => {
        procuarBeacons();
        listaAlunos();
    }, []);

    useEffect(() => {
        const presentes = alunosDisciplinas.filter(item => uuidList.includes(item.beacon_id)).length;
        setAlunoPresente(presentes); // Atualiza a quantidade de alunos presentes
    }, [uuidList, alunosDisciplinas]);

    async function procuarBeacons() {
        const isBluetoothAndLocationEnabled = await CheckBluetoothAndLocation();

        if (isBluetoothAndLocationEnabled) {
            startBeaconRanging();
        }
    }

    const listaAlunos = async () => {
        try {
            const listaluno = await fetchAlunoDisciplinaMarcaPresenca(disciplinaId);
            setAlunoDisciplina(listaluno);
            setTotalAluno(listaluno.length);
            const initialPresencas = listaluno.map(option => ({
                aluno_fk: option.alunoId,
                dataPresenca: dataPresenca,
                quantidade_aulas_assistidas: uuidList.includes(option.beacon_id) ? quantidade_aulas : '0',
                quantidade_aulas_total: quantidade_aulas,
                observacao: '',
                situacao: uuidList.includes(option.beacon_id) ? 'Presente' : 'Ausente',
                beaconInicial: uuidList.includes(option.beacon_id)  // Armazena se o beacon estava presente inicialmente
            }));
            setPresencas(initialPresencas);
            return listaAlunos;
        } catch (error) {
            console.log('Não foi possível carregar os alunos. Verifique se a tabela existe.');
            return 0;
        }
    };

    const atualizarPresencas = () => {
        const updatedPresencas = alunosDisciplinas.map(option => ({
            aluno_fk: option.alunoId,
            dataPresenca: dataPresenca,
            quantidade_aulas_assistidas: uuidList.includes(option.beacon_id) ? quantidade_aulas : '0',
            quantidade_aulas_total: quantidade_aulas,
            observacao: '',
            situacao: uuidList.includes(option.beacon_id) ? 'Presente' : 'Ausente',
            beaconInicial: uuidList.includes(option.beacon_id)  // Armazena se o beacon estava presente inicialmente
        }));
        setPresencas(updatedPresencas);
    };

    const handlePresencaChange = (index, updatedPresenca) => {
        const newPresencas = [...presencas];
        newPresencas[index] = { ...updatedPresenca };
        setPresencas(newPresencas);
    };

    function confirmarRegistroPresenca() {
        Alert.alert(
            "Confirmação",
            "Tem certeza que deseja finalizar a chamada?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Sim",
                    onPress: () => registrarPresenca()
                }
            ]
        );
    }
    
    const registrarPresenca = async () => {
        try {
            await addMultiplePresenca(aula_fk, dataPresenca, presencas);
            Alert.alert(
                "Sucesso", "Lista de chamada registrada com sucesso",
                [{ text: "OK", onPress: () => {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'PresencaStack' }],
                    });
                }}]
            );
            console.log('Presença registrada com sucesso.');
        } catch (error) {
            console.log('Erro ao registrar presença:', error.message);
            Alert.alert('Atenção', 'Houve um erro e a lista de presença não foi registrada');
        }
    };

    async function procurar() {
        const isBluetoothAndLocationEnabled = await CheckBluetoothAndLocation();

        if (!isBluetoothAndLocationEnabled) {
            return;
        }

        startBeaconRanging();
        setProcuraPrimeiraVez(true);
    }

    function pararProcura() {
        stopBeaconRanging();
        atualizarPresencas();
        setProcuraPrimeiraVez(false);
    }

    let situacaoBeacon = estadoBeacon ? 
    <View>
        <Loading/>
        <Icon name="lighthouse-on" color={colors.icone} size={40} style={{ alignSelf: 'flex-end' }}>{alunosPresente}/{totalAlunos}</Icon>  
    </View> :
    <Text 
        style={{ color: colors.text, alignSelf: 'center', fontSize: 20, fontWeight: "bold" }}>
        Editar presença 
        <Icon name="lighthouse-on" 
            color={colors.icone} 
            size={20} 
            style={{ alignSelf: 'flex-end' }}>
            {alunosPresente}/{totalAlunos}
        </Icon>
    </Text>

    let quantidadeAulas = quantidade_aulas == 1 ? '1 aula' : quantidade_aulas+' aulas';
    return (
        <View style={[styles.fundoTela, { backgroundColor: colors.background }]}>
            <Text style={[TemaPrincipal.titulo, { color: colors.text }]}>Marcar Presença</Text>
            
            <Text style={{color: colors.text, alignSelf: 'center'}}>{quantidadeAulas}</Text>
            {situacaoBeacon}
            <ScrollView style={[TemaPrincipal.lista, {backgroundColor: colors.tertiary}]}>
                {alunosDisciplinas.map((item, index) => {
                const presencaAtual = presencas && presencas.length > index ? presencas[index] : '';
                const situacao = presencaAtual ? presencaAtual.situacao : '';
                let icon = '';
                icon = uuidList.includes(item.beacon_id) ? "check-bold" : "close-thick";
                if(!procuraPrimeiraVez) {
                    if(situacao == 'Presente') {
                        icon = 'check-bold';
                    }else if(situacao != 'Ausente'){
                        icon = 'information';
                    }else {
                        icon = 'close-thick';
                    }
                }

                return (
                <View key={item.id}>
                    <AlunoPresenca 
                    nome={item.nome} 
                    data={data} 
                    estadoBeacon={estadoBeacon} 
                    icon={icon}
                    presenca={presencaAtual} 
                    setPresenca={(updatedPresenca) => handlePresencaChange(index, updatedPresenca)}
                    />
                </View>
                );
            })}
            </ScrollView>
            {estadoBeacon ?
            <Button mode="contained" labelStyle={{ fontSize: 20 }} onPress={pararProcura} 
            style={[TemaPrincipal.marginBottomPadrao, TemaPrincipal.botaoPrincipal, { backgroundColor: '#6346F5' }]}>
                Parar de Procurar
            </Button> :
            <View>
                <Button mode="contained" labelStyle={{ fontSize: 20 }} onPress={procurar} 
                    style={[TemaPrincipal.marginBottomPadrao, TemaPrincipal.botaoPrincipal]}>
                    Procurar Aluno
                </Button>

                <Button mode="contained" labelStyle={{ fontSize: 20 }} onPress={confirmarRegistroPresenca} 
                        style={[styles.marginBottomPrimario, TemaPrincipal.botaoPrincipal, { backgroundColor: colors.secundary }]}>
                    Registrar Presença
                </Button> 
            </View>}
        </View>
    );
}

export default SelecionaDisciplinaAula;
