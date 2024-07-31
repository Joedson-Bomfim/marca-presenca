import React, { useContext, useEffect, useState } from "react";
import { Text, ScrollView, View } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { fetchDisciplinaProfessor } from '../../Controller/DisciplinaController';
import { Context } from '../../contexts/Context';
import InputSearch from "../../components/InputSearch";

import Loading from "../../components/LoadingDefaulft";
import styles from "./styles";
import TemaPrincipal from "../../assets/styles";

const Disciplina = ( {navigation} ) => {
    const { colors } = useTheme();

    const { professorId } = useContext(Context);
    
    const [disciplinas, setDisciplina] = useState([]);
    const [visible, setVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        listaDisciplinas();
    }, []);

    const listaDisciplinas = async () => {
        setVisible(true);
        try {
            const listaluno = await fetchDisciplinaProfessor(professorId);
            setDisciplina(listaluno);
            console.log(listaluno);
        } catch (error) {
            console.log('Não foi possível carregar os disciplinas. Verifique se a tabela existe.');
        } finally {
            setVisible(false);
        }
    };

    const filteredDisciplinas = disciplinas.filter(aula =>
        aula.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return(
        //<Icon name="clipboard-text-clock-outline" color={ colors.icone } size={40}/>       
        <View style={[styles.fundoTela, {backgroundColor: colors.background}]}>
            <Text style={[styles.titulo, {color: colors.text }]}>Disciplinas</Text>

            <InputSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>

            <ScrollView style={[TemaPrincipal.lista, {backgroundColor: colors.tertiary}]}>
                <Loading visible={visible}/>
                {filteredDisciplinas.map((item) => (
                <View key={item.id} style={styles.bookItem}>
                    <View>

                    <Button mode="contained" labelStyle={{ fontSize: 18 }}
                    onPress={() => {navigation.navigate('DisciplinaDetalhe', { 
                    isEdit: true, id: item.id, professor_fk: item.professor_fk, nome: item.nome, codigo: item.codigo, 
                    curso: item.curso, complemento: item.complemento });}}
                    style={[TemaPrincipal.listaTabela, { backgroundColor: colors.secundary }]}>
                        {item.nome}
                    </Button>
                    </View>
                </View>
            ))}
            </ScrollView>

            <Button mode="contained" labelStyle={{ fontSize: 20 }} onPress={() => {navigation.navigate('DisciplinaForm', { isEdit: false, id: '', professor_fk: professorId });}} style={[TemaPrincipal.botaoCadastro]}>
                Nova Disciplina
            </Button>  
        </View>
    )
}

export default Disciplina;