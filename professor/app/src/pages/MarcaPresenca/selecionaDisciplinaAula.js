import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Alert } from "react-native";
import { useTheme, Button, TextInput } from "react-native-paper";
import { fetchDisciplinaProfessor } from "../../Controller/DisciplinaController";
import { fetchAulaDisciplina } from "../../Controller/AulaController";
import { Context } from '../../contexts/Context';
import Loading from "../../components/loading";
import DropdownSelect from '../../components/dropdown';
import TemaPrincipal from "../../assets/styles";
import styles from "./styles";

const SelecionaDisciplinaAula = ({ navigation }) => {
  const { colors } = useTheme();
  const { professorId } = useContext(Context);
  const [visible, setVisible] = useState(false);
  const [disciplinas, setDisciplina] = useState([]);
  const [aulas, setAula] = useState([]);
  const [data, setData] = useState('22/07/2024');
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
    name: option.dia_semana
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
    }
    setVisible(false);
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
    setAulaId(item);
    const selected = opcoesAulas.find(aula => aula.id === item);
    setSelectedAula(selected); // Define o valor selecionado no estado
  };

  const abrirChamada = () => {
    if (disciplinaId && aulaId && data) {
      navigation.navigate('MarcaPresencaP2', { disciplinaId: disciplinaId, aulaId: aulaId, data: data });
    } else {
      Alert.alert('Atenção', 'Por favor preencha todos os campos');
    }
  };

  return (
    <View style={[styles.fundoTela, { backgroundColor: colors.background }]}>
      <Loading visible={visible} />
      <Text style={[TemaPrincipal.titulo, { color: colors.text }]}>Marcar Presença</Text>

      <TextInput label="Data" mode="flat" value={data}
        onChangeText={setData} style={[styles.marginBottom, TemaPrincipal.inputPadrao]}
      ></TextInput>

      <DropdownSelect
        options={opcoesDisciplinas}
        onSelect={selecionaDisciplina}
        placeholder="Selecione uma Disciplina"
        selected={selectedDisciplina} // Passa o valor selecionado
      />

      <DropdownSelect
        options={opcoesAulas}
        onSelect={selecionaAula}
        placeholder="Selecione uma Aula"
        disabled={!disciplinaId}
        selected={selectedAula} // Passa o valor selecionado
      />

      <Button mode="contained" labelStyle={{ fontSize: 20 }} onPress={abrirChamada} style={[styles.marginBottomPrimario, TemaPrincipal.botaoPrincipal]}>
        Abrir Chamada
      </Button>
    </View>
  );
};

export default SelecionaDisciplinaAula;
