import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Alert } from "react-native";
import { useTheme, Button, TextInput } from "react-native-paper";
import { fetchDisciplinaProfessor } from "../../Controller/DisciplinaController";
import { fetchAulaDisciplina } from "../../Controller/AulaController";
import { Context } from '../../contexts/Context';
import { obterDataAtualBrasileira } from '../../services/formatacao';
import InputDate from "../../components/inputDate";

import Loading from "../../components/LoadingDefaulft";
import DropdownSelect from '../../components/dropdown';
import TemaPrincipal from "../../assets/styles";
import styles from "./styles";

const SelecionaDisciplinaAula = ({ navigation }) => {
  const { colors } = useTheme();
  const { professorId } = useContext(Context);
  const [visible, setVisible] = useState(false);
  const [disciplinas, setDisciplina] = useState([]);
  const [aulas, setAula] = useState([]);
  const [data, setData] = useState(obterDataAtualBrasileira);
  const [disciplinaId, setDisciplinaId] = useState('');
  const [aulaId, setAulaId] = useState('');
  const [selectedDisciplina, setSelectedDisciplina] = useState(null); // Estado para disciplina selecionada
  const [selectedAula, setSelectedAula] = useState(null); // Estado para aula selecionada

  const opcoesDisciplinas = disciplinas.map(option => ({
    id: option.id,
    name: option.nome
  }));

  const opcoesAulas = aulas.map(option => ({
    id: option.id,
    name: option.dia_semana+' '+option.horario_inicio_aula+'-'+option.horario_fim_aula,
    quantidade_aulas: option.quantidade_aulas
  }));

  useEffect(() => {
    listaDisciplinas();
  }, []);

  const listaDisciplinas = async () => {
    try {
      setVisible(true);
      const listaDisciplina = await fetchDisciplinaProfessor(professorId);
      setDisciplina(listaDisciplina);
    } catch (error) {
      console.log('Não foi possível carregar as disciplinas. Verifique se a tabela existe.');
    }
    setVisible(false);
  };

  const listaAulas = async (disciplina_id) => {
    try {
      setVisible(true);
      const listaAula = await fetchAulaDisciplina(disciplina_id);
      setAula(listaAula);
    } catch (error) {
      console.log('Não foi possível carregar as aulas. Verifique se a tabela existe.');
    } finally {
        setVisible(false);
    }
  };

  const selecionaDisciplina = (item) => {
    setDisciplinaId(item);
    setAula([]);
    setAulaId('');
    const selected = opcoesDisciplinas.find(disciplina => disciplina.id === item);
    setSelectedDisciplina(selected); // Define o valor selecionado no estado
    setSelectedAula(null); // Limpa a seleção de aula
    listaAulas(item);
  };

  const selecionaAula = (item) => {
    const selected = opcoesAulas.find(aula => aula.id === item);
    setAulaId(item);
    setSelectedAula(selected); // Define o valor selecionado no estado, incluindo quantidade de aulas
  };

  const abrirChamada = () => {
    if (disciplinaId && aulaId && data) {
      let quantidade_aulas = selectedAula.quantidade_aulas.toString();
      navigation.navigate('MarcaPresencaP2', { disciplinaId: disciplinaId, aulaId: aulaId, quantidade_aulas: quantidade_aulas, data: data });
    } else {
      Alert.alert('Atenção', 'Por favor preencha todos os campos');
    }
  };

  return (
    <View style={[styles.fundoTela, { backgroundColor: colors.background }]}>
      <Loading visible={visible} />
      <Text style={[TemaPrincipal.titulo, { color: colors.text }]}>Marcar Presença</Text>

      <InputDate titulo={'Selecione para alterar a data'} icon={'calendar-month'} initialDate={data} onDateSelected={(dataSelecionada) => setData(dataSelecionada)}/>

      <DropdownSelect options={opcoesDisciplinas} onSelect={selecionaDisciplina} placeholder="Selecione uma Disciplina" selected={selectedDisciplina}/>

      <DropdownSelect options={opcoesAulas} onSelect={selecionaAula} placeholder="Selecione uma Aula" disabled={!disciplinaId} selected={selectedAula}/>

      <Button mode="contained" labelStyle={{ fontSize: 20 }} onPress={abrirChamada} style={[styles.marginBottomPrimario, TemaPrincipal.botaoPrincipal]}>
        Abrir Chamada
      </Button>
    </View>
  );
};

export default SelecionaDisciplinaAula;
