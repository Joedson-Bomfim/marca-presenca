import React, { useEffect, useState, useContext } from "react";
import { Text, ScrollView, View, Alert } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { fetchPresencaByAula } from '../../Controller/PresencaController';
import AlunoPresenca from '../../components/alunoPresencaRegistrada';
import { useRoute } from '@react-navigation/native';
import { converteDataAmericanaParaBrasileira } from '../../services/formatacao';
import { Context } from "../../contexts/Context";
import exportarEmXML from '../../services/exportacaoXML';

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Loading from "../../components/LoadingDefaulft";
import styles from "./styles";
import TemaPrincipal from "../../assets/styles";

const PresencaAula = ({ navigation }) => {
    const { colors } = useTheme();
    const route = useRoute();

    const { professorId } = useContext(Context);

    const { aula_id, data_presenca, horario_inicio_aula, horario_fim_aula, 
            total_alunos_presentes, total_alunos, nome_disciplina } = route.params;

    const [alunosPresenca, setDisciplina] = useState([]);
    const [visible, setVisible] = useState(false);
    const [presencas, setPresencas] = useState([]);

    useEffect(() => {
        listaDisciplinas();
    }, []);

    const listaDisciplinas = async () => {
        setVisible(true);
        try {
            const listaAluno = await fetchPresencaByAula(aula_id, data_presenca);
            setDisciplina(listaAluno);
            console.log(listaAluno);
        } catch (error) {
            console.log('Não foi possível carregar os alunosPresenca. Verifique se a tabela existe.');
        } finally {
            setVisible(false);
        }
    };

    const handlePresencaChange = (index, updatedPresenca) => {
        const newPresencas = [...presencas];
        newPresencas[index] = { ...updatedPresenca };
        setPresencas(newPresencas);
    };

    function varDump(variavel) {
        return JSON.stringify(variavel, null, 2);
    }

    return (
        <View style={[styles.fundoTela, { backgroundColor: colors.background }]}>
            <Text style={[TemaPrincipal.titulo, { color: colors.text }]}>{nome_disciplina}</Text>

            <View style={styles.dataIcone}>
                <Text style={styles.detalhes}>{converteDataAmericanaParaBrasileira(data_presenca)}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon name="account-group" color={colors.icone} size={25} />
                    <Text>{total_alunos_presentes}/{total_alunos}</Text>
                </View>
            </View>
            <Text style={[{marginBottom: 30}]}>Horário das {horario_inicio_aula} h até {horario_fim_aula} h </Text>
            <ScrollView>
                <Loading visible={visible} />
                {alunosPresenca.map((item, index) => (
                    <View key={item.id} style={styles.bookItem}>
                        <AlunoPresenca
                            id={item.id}
                            nome={item.nome}
                            situacao={item.situacao}
                            data={converteDataAmericanaParaBrasileira(item.data)}
                            aulas_assistidas={item.quantidade_aulas_assistidas}
                            observacao={item.observacao}
                            presenca={item}
                            setPresenca={(updatedPresenca) => handlePresencaChange(index, updatedPresenca)}
                            icon={item.situacao !== 'Ausente' ? "check-bold" : "close-thick"}
                        />
                    </View>
                ))}
            </ScrollView>
            
            <Button mode="contained" onPress={() => exportarEmXML(alunosPresenca)} labelStyle={{ fontSize: 20 }} style={[TemaPrincipal.botaoCadastro]} icon={() => <Icon name={'file-export'} size={30} color="#ffffff" />}>
                Exportar
            </Button>
        </View>
    );
}

export default PresencaAula;
