import React, { useContext, useEffect, useState } from "react";
import { Text, ScrollView, View } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { fetchAlunoProfessor } from '../../Controller/AlunoController';
import { Context } from '../../contexts/Context';
import InputSearch from "../../components/InputSearch";

import Loading from "../../components/LoadingDefaulft";
import styles from "./styles";
import TemaPrincipal from "../../assets/styles";

const Aluno = ( {navigation} ) => {
    const { colors } = useTheme();

    const { professorId } = useContext(Context);
    
    const [alunos, setAluno] = useState([]);
    const [visible, setVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        listaAlunos();
    }, []);

    const listaAlunos = async () => {
        setVisible(true);
        try {
            const listaluno = await fetchAlunoProfessor(professorId);
            setAluno(listaluno);
            console.log(listaluno);
        } catch (error) {
            console.log('Não foi possível carregar os alunos. Verifique se a tabela existe.');
        } finally {
            setVisible(false);
        }
    };

    const filteredAlunos = alunos.filter(aula =>
        aula.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return(
        //<Icon name="clipboard-text-clock-outline" color={ colors.icone } size={40}/>       
        <View style={[styles.fundoTela, {backgroundColor: colors.background}]}>
            <Text style={[styles.titulo, {color: colors.text }]}>Alunos</Text>

            <InputSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>

            <ScrollView>
                <Loading visible={visible}/>
                {filteredAlunos.map((item) => (
                <View key={item.id} style={styles.bookItem}>
                    <Button mode="contained" labelStyle={{ fontSize: 20 }}
                    onPress={() => {navigation.navigate('AlunoForm', { 
                    isEdit: true, id: item.id, professor_fk: professorId, nome: item.nome, matricula: item.matricula, beacon_id: item.beacon_id });}}
                    style={[TemaPrincipal.listaTabela, { backgroundColor: colors.secundary }]}>
                        {item.nome}
                    </Button>
                </View>
            ))}
            </ScrollView>

            <Button mode="contained" labelStyle={{ fontSize: 20 }} 
            onPress={() => {navigation.navigate('AlunoForm', { isEdit: false, id: '', professor_fk: professorId, nome: '', matricula: '', beacon_id: '' });}} 
            style={[TemaPrincipal.botaoCadastro, TemaPrincipal.botaoPrincipal]}>
                Nova Aluno
            </Button>  
        </View>
    )
}

export default Aluno;