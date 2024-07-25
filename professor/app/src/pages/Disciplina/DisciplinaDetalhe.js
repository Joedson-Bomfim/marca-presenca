import React, { useState, useEffect } from "react";
import { Text, View, ScrollView  } from "react-native";
import { TextInput, Button, useTheme } from "react-native-paper";
import { useRoute } from '@react-navigation/native';
import { fetchAulaDisciplina } from '../../Controller/AulaController';

import Loading from "../../components/loading";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./styles";
import TemaPrincipal from "../../assets/styles";

const DisciplinaDetalhe = ( {navigation} ) => {
    const { colors } = useTheme();
    const route = useRoute();

    const { id, professor_fk, nome, codigo, curso, complemento } = route.params;
    const [aulas, setListaAula] = useState([]);
    const [visible, setVisible] = useState(false);
    const [isExist, setIsExist] = useState(true);

    useEffect(() => {
        listaDisciplinas();
    }, []);

    const listaDisciplinas = async () => {
        setVisible(true);
        setIsExist(true)
        try {
            //const listAula = await fetchAulaDisciplina(id);
            listAula = [];
            listAula.length === 0 ? setIsExist(false) : setListaAula(listAula);
            console.log(listAula);
        } catch (error) {
            console.log('Não foi possível carregar os aulas. Verifique se a tabela existe.');
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
                    Detalhes
                </Button>

                <Button mode="contained" labelStyle={{ fontSize: 20 }} 
                onPress={() => {navigation.navigate('Aulas', { disciplina_id: id, nome_disciplina: nome });}}>
                    Aulas
                </Button>
            </View> 

            {isExist ?
            <ScrollView>
                    <Loading visible={visible}/>
                    <Loading visible={visible}/>
                    {aulas.map((item) => (
                    <View key={item.id} style={styles.bookItem}>
                        <View>

                        <Button mode="contained" labelStyle={{ fontSize: 20 }}
                        onPress={() => {navigation.navigate('AulaDetalhe', 
                        { id: item.id, disciplina_fk: item.disciplina_fk, disciplina_nome: nome, dia_semana: item.dia_semana, local: item.local, 
                        quantidade_aulas: item.quantidade_aulas, horario_inicio_aula: item.horario_inicio_aula, horario_fim_aula: item.horario_fim_aula});}}
                        style={[TemaPrincipal.listaTabela, { backgroundColor: colors.secundary }]}>
                            {item.dia_semana}
                        </Button>
                        </View>
                    </View>
                ))}
            </ScrollView> :
            <Text style={styles.aviso}>Ainda não há aulas cadastradas nesta disciplina</Text>}

            <Button mode="contained" style={TemaPrincipal.inputPadrao}
            onPress={() => {navigation.navigate('DisciplinaForm', { isEdit: true, id: id, professor_fk: professor_fk, nome: nome, codigo: codigo, curso: curso, complemento: complemento });}}>
                ATUALIZAR
            </Button>
        </View>
    )
}

export default DisciplinaDetalhe;