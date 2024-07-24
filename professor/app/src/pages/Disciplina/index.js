import React, { useEffect, useState } from "react";
import { Text, ScrollView, View, TouchableOpacity } from "react-native";
import { TextInput, Button, useTheme } from "react-native-paper";
import { fetchDisciplina } from '../../Controller/DisciplinaController';

import Loading from "../../components/loading";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./styles";
import TemaPrincipal from "../../assets/styles";

const Disciplina = ( {navigation} ) => {
    const { colors } = useTheme();
    
    const [disciplinas, setDisciplina] = useState([]);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        listaDisciplinas();
    }, []);

    const listaDisciplinas = async () => {
        setVisible(true);
        try {
            const listaluno = await fetchDisciplina();
            setDisciplina(listaluno);
            console.log(listaluno);
        } catch (error) {
            console.log('Não foi possível carregar os disciplinas. Verifique se a tabela existe.');
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
            <Text style={[TemaPrincipal.titulo, {color: colors.text }]}>Disciplinas</Text>

            <ScrollView>
                <Loading visible={visible}/>
                {disciplinas.map((item) => (
                <View key={item.id} style={styles.bookItem}>
                    <View>

                    <Button mode="contained" labelStyle={{ fontSize: 20 }}
                            onPress={() => {navigation.navigate('DisciplinaForm', { isEdit: true, id: item.id, professor_fk: item.professor_fk, nome: item.nome, codigo: item.codigo, curso: item.curso, complemento: item.complemento });}}
                            style={[TemaPrincipal.listaTabela, { backgroundColor: colors.secundary }]}>
                        {item.nome}
                    </Button>
                    </View>
                </View>
            ))}
            </ScrollView>

            <Button mode="contained" labelStyle={{ fontSize: 20 }} onPress={() => {navigation.navigate('DisciplinaForm', { isEdit: false, id: '', nome: '', matricula: '', beacon_id: '' });}} style={[TemaPrincipal.botaoCadastro, TemaPrincipal.botaoPrincipal]}>
                Nova Disciplina
            </Button>  
        </View>
    )
}

export default Disciplina;