import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, TextInput, StyleSheet  } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { useRoute } from '@react-navigation/native';
import { fetchAulaDisciplina } from '../../Controller/AulaController';

import Loading from "../../components/LoadingDefaulft";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./styles";
import TemaPrincipal from "../../assets/styles";

const DisciplinaDetalhe = ({ navigation }) => {
    const { colors } = useTheme();
    const route = useRoute();

    const { disciplina_id, nome_disciplina } = route.params;
    const [aulas, setListaAula] = useState([]);
    const [visible, setVisible] = useState(false);
    const [isExist, setIsExist] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        listaDisciplinas();
    }, []);

    const listaDisciplinas = async () => {
        setVisible(true);
        setIsExist(true);
        try {
            const listAula = await fetchAulaDisciplina(disciplina_id);
            listAula.length === 0 ? setIsExist(false) : setListaAula(listAula);
            console.log(listAula);
        } catch (error) {
            console.log('Não foi possível carregar os aulas. Verifique se a tabela existe.');
        } finally {
            setVisible(false);
        }
    };

    const filteredAulas = aulas.filter(aula =>
        aula.dia_semana.toLowerCase().includes(searchTerm.toLowerCase()) ||
        aula.local.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <View style={[styles.fundoTela, { backgroundColor: colors.background }]}>
            <Text style={[styles.tituloDois, { color: colors.text }]}>{nome_disciplina}</Text>
            <Text style={[styles.subTitulo, { color: colors.text }]}>Lista de Aulas</Text>

            <View style={TemaPrincipal.searchSection}>
                <Icon style={TemaPrincipal.searchIcon} name="magnify" size={20} color="#FFF"/>
                <TextInput placeholder="Pesquisar aula..." value={searchTerm} onChangeText={text => setSearchTerm(text)}
                style={[TemaPrincipal.inputSearch, { color: colors.text }]} placeholderTextColor="#FFF"/>
            </View>

            {isExist ? (
                <ScrollView>
                    <Loading visible={visible} />
                    {filteredAulas.map((item) => (
                        <View key={item.id} style={styles.bookItem}>
                            <View>
                                <Button mode="contained" labelStyle={{ fontSize: 20 }} 
                                onPress={() => { navigation.navigate('AulaForm', 
                                { isEdit: true, id: item.id, disciplina_fk: item.disciplina_fk, nome_disciplina: nome_disciplina, 
                                dia_semana: item.dia_semana, local: item.local, quantidade_aulas: item.quantidade_aulas, 
                                horario_inicio_aula: item.horario_inicio_aula, horario_fim_aula: item.horario_fim_aula, }); }}
                                style={[TemaPrincipal.listaTabela, { backgroundColor: colors.secundary }]}>
                                    {item.dia_semana}
                                </Button>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            ) : (
                <Text style={styles.aviso}>Ainda não há aulas cadastradas nesta disciplina</Text>
            )}

            <Button mode="contained" labelStyle={{ fontSize: 20 }}
            onPress={() => { navigation.navigate('AulaForm', { isEdit: false, disciplina_fk: disciplina_id, nome_disciplina: nome_disciplina }); }}>
                Nova Aula
            </Button>
        </View>
    );
};

export default DisciplinaDetalhe;