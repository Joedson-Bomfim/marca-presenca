import React, { useEffect, useState } from "react";
import { Text, ScrollView, View } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { fetchPresencaByAula } from '../../Controller/PresencaController';
import AlunoPresenca from '../../components/alunoPresencaRegistrada';
import { useRoute } from '@react-navigation/native';
import { converteDataAmericanaParaBrasileira } from '../../services/formatacao';

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Loading from "../../components/loading";
import styles from "./styles";
import TemaPrincipal from "../../assets/styles";

const PresencaAula = ({ navigation }) => {
    const { colors } = useTheme();
    const route = useRoute();

    const { aula_id, data_presenca, horario_inicio_aula, horario_fim_aula, 
            total_alunos_presentes, total_alunos, nome_disciplina } = route.params;

    const [disciplinas, setDisciplina] = useState([]);
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
            console.log('Não foi possível carregar os disciplinas. Verifique se a tabela existe.');
        } finally {
            setVisible(false);
        }
    };

    const handlePresencaChange = (index, updatedPresenca) => {
        const newPresencas = [...presencas];
        newPresencas[index] = { ...updatedPresenca };
        setPresencas(newPresencas);
    };

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
                {disciplinas.map((item, index) => (
                    <View key={item.id} style={styles.bookItem}>
                        <AlunoPresenca
                            id={item.id}
                            nome={item.nome}
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

            <Button mode="contained" onPress={()=> {}}>
                Exportar
            </Button>
        </View>
    );
}

export default PresencaAula;
