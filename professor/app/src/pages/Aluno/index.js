import React, { useEffect, useState } from "react";
import { Text, ScrollView, View, TouchableOpacity } from "react-native";
import { TextInput, Button, useTheme } from "react-native-paper";
import { fetchAluno } from '../../Controller/AlunoController';

import Loading from "../../components/loading";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./styles";
import TemaPrincipal from "../../assets/styles";

const Aluno = ( {navigation} ) => {
    const { colors } = useTheme();
    
    const [alunos, setAluno] = useState([]);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        listaAlunos();
    }, []);

    const listaAlunos = async () => {
        setVisible(true);
        try {
            const listaluno = await fetchAluno();
            setAluno(listaluno);
            console.log(listaluno);
        } catch (error) {
            console.log('Não foi possível carregar os alunos. Verifique se a tabela existe.');
        } finally {
            setVisible(false);
        }
    };

    /* 
    <TouchableOpacity onPress={() => {}}>
        <Icon name="trash-can" color="#fff" size={40} />
    </TouchableOpacity>
    */
    return(
        //<Icon name="clipboard-text-clock-outline" color={ colors.icone } size={40}/>       
        <View style={[styles.fundoTela, {backgroundColor: colors.background}]}>
            <Text style={[styles.titulo, {color: colors.text }]}>Alunos</Text>

            <ScrollView>
                <Loading visible={visible}/>
                {alunos.map((item) => (
                <View key={item.id} style={styles.bookItem}>
                    <Button mode="contained" labelStyle={{ fontSize: 20 }}
                            onPress={() => {navigation.navigate('AlunoForm', { isEdit: true, id: item.id, nome: item.nome, matricula: item.matricula, beacon_id: item.beacon_id });}}
                            style={[TemaPrincipal.listaTabela, { backgroundColor: colors.secundary }]}>
                        {item.nome}
                    </Button>
                </View>
            ))}
            </ScrollView>

            <Button mode="contained" labelStyle={{ fontSize: 20 }} onPress={() => {navigation.navigate('AlunoForm', { isEdit: false, id: '', nome: '', matricula: '', beacon_id: '' });}} style={[TemaPrincipal.botaoCadastro, TemaPrincipal.botaoPrincipal]}>
                Nova Aluno
            </Button>  
        </View>
    )
}

export default Aluno;