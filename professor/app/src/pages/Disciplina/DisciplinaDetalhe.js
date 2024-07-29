import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, TouchableOpacity  } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { useRoute } from '@react-navigation/native';
import { fetchGrupoPresenca } from '../../Controller/PresencaController';
import { converteDataAmericanaParaBrasileira } from '../../services/formatacao';

import Loading from "../../components/LoadingDefaulft";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./styles";
import TemaPrincipal from "../../assets/styles";

const DisciplinaDetalhe = ( {navigation} ) => {
    const { colors } = useTheme();
    const route = useRoute();

    const { id, professor_fk, nome, codigo, curso, complemento } = route.params;
    const [presencas, setListaPresenca] = useState([]);
    const [visible, setVisible] = useState(false);
    const [isExist, setIsExist] = useState(true);

    useEffect(() => {
        listaDisciplinas();
    }, []);

    const listaDisciplinas = async () => {
        setVisible(true);
        setIsExist(true)
        try {
            const listPresenca = await fetchGrupoPresenca(id);
            listPresenca.length === 0 ? setIsExist(false) : setListaPresenca(listPresenca);
            console.log(listPresenca);
        } catch (error) {
            console.log('Não foi possível carregar os presencas. Verifique se a tabela existe.');
        } finally {
            setVisible(false);
        }
    };

    return(
        <View style={[styles.fundoTela, {backgroundColor: colors.background}]}>
            <Text style={[styles.titulo, {color: colors.text }]}>{nome}</Text>

            <View style={TemaPrincipal.botoesEditRegistro}>
                <Button mode="contained" labelStyle={{ fontSize: 20 }} 
                onPress={() => {navigation.navigate('DisciplinaForm', 
                { complemento: complemento });}}>
                    Alunos
                </Button>

                <Button mode="contained" labelStyle={{ fontSize: 20 }} 
                onPress={() => {navigation.navigate('Aulas', { disciplina_id: id, nome_disciplina: nome });}}>
                    Aulas
                </Button>
            </View> 

            {isExist ?
            <ScrollView>
                    <Loading visible={visible}/>
                    {presencas.map((item) => (
                    <View key={item.id} style={styles.bookItem}>
                        <TouchableOpacity 
                        onPress={() => { navigation.navigate('PresencaAula', { aula_id: item.aula_id, data_presenca: item.data, 
                        horario_inicio_aula: item.horario_inicio_aula, horario_fim_aula: item.horario_fim_aula, 
                        total_alunos_presentes: item.total_alunos_presentes, total_alunos: item.total_alunos, nome_disciplina: nome }); }}
                        style={[styles.buttonTouchable, { backgroundColor: colors.secondary }]}>
                            <View style={styles.buttonTouchableSegundo}>
                                <Text style={styles.fonteTextoTouchable}>{converteDataAmericanaParaBrasileira(item.data)+' '+item.horario_inicio_aula}</Text>
                                <Text style={styles.fonteTextoTouchable}><Icon name="account-group" color={colors.icone} size={25} />{item.total_alunos_presentes+'/'+item.total_alunos}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView> :
            <Text style={styles.aviso}>Ainda não há registros de presença</Text>}

            <Button mode="contained" labelStyle={{ fontSize: 20 }} 
            style={[TemaPrincipal.botaoCadastro]}
            onPress={() => {navigation.navigate('DisciplinaForm', { isEdit: true, id: id, professor_fk: professor_fk, nome: nome, codigo: codigo, curso: curso, complemento: complemento });}}>
            Editar Disciplina
            </Button>  
        </View>
    )
}

export default DisciplinaDetalhe;