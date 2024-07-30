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

    const { aula_id, data_presenca, dia_semana, horario_inicio_aula, horario_fim_aula, 
            quantidade_aulas, total_alunos, nome_disciplina } = route.params;

    const [alunosPresenca, setDisciplina] = useState([]);
    const [quantidadeAlunosPresentes, setQuantidadeAlunosPresentes] = useState(0);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        listaDisciplinas();
    }, []);

    const listaDisciplinas = async () => {
        setVisible(true);
        try {
            const listaAluno = await fetchPresencaByAula(aula_id, data_presenca);
            setDisciplina(listaAluno);
            
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

    return (
        <View style={[styles.fundoTela, { backgroundColor: colors.background }]}>
            <Text style={[TemaPrincipal.titulo, { color: colors.text }]}>{nome_disciplina}</Text>

            <View style={styles.dataIcone}>
                <Text style={styles.detalhes}>{converteDataAmericanaParaBrasileira(data_presenca)}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon name="account-group" color={colors.icone} size={25} />
                    <Text>{quantidadeAlunosPresentes}/{total_alunos}</Text>
                </View>
            </View>
            <Text>Dia da Semana: {dia_semana} </Text>
            <Text>Horário: {horario_inicio_aula}-{horario_fim_aula} </Text>
            <Text style={[{marginBottom: 30}]}>Quantidade de altas: {quantidade_aulas} </Text>
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
                            atualizaSituacao={() => handleSituacaoChange()}
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
