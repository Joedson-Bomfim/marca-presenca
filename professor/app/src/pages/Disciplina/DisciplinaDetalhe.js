import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, TouchableOpacity  } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { useRoute } from '@react-navigation/native';
import { fetchGrupoPresenca } from '../../Controller/PresencaController';
import { converteDataAmericanaParaBrasileira } from '../../services/formatacao';
import InputSearch from "../../components/InputSearch";

import Loading from "../../components/LoadingDefaulft";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./styles";
import TemaPrincipal from "../../assets/styles";

const DisciplinaDetalhe = ( {navigation} ) => {
    const { colors } = useTheme();
    const route = useRoute();

    const { id, professor_fk, nome, codigo, curso, complemento } = route.params;
    const [presencas, setListaPresenca] = useState([]);
    const [visible, setVisible] = useState(false);
    const [isExist, setIsExist] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        listaDisciplinas();
    }, []);

    const listaDisciplinas = async () => {
        setVisible(true);
        setIsExist(true)
        try {
            const listPresenca = await fetchGrupoPresenca(id);
            listPresenca.length === 0 ? setIsExist(false) : setListaPresenca(listPresenca);
        } catch (error) {
            console.log('Não foi possível carregar os presencas. Verifique se a tabela existe.');
        } finally {
            setVisible(false);
        }
    };

    const filteredPresencas = presencas.filter(aula => {
        const formattedDate = converteDataAmericanaParaBrasileira(aula.data);
    
        return formattedDate.includes(searchTerm) || 
               aula.horario_inicio_aula.includes(searchTerm);
    });

    return(
        <View style={[styles.fundoTela, {backgroundColor: colors.background}]}>
            <Text style={[TemaPrincipal.titulo, {color: colors.text }]}>{nome}</Text>

            <InputSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>

            {isExist ?
            <ScrollView style={[TemaPrincipal.lista, {backgroundColor: colors.tertiary}]}>
                    <Loading visible={visible}/>
                    {filteredPresencas.map((item) => (
                    <View key={item.id} style={styles.bookItem}>
                        <TouchableOpacity 
                        onPress={() => { navigation.navigate('PresencaAula', { 
                            aula_id: item.aula_id, 
                            data_presenca: item.data, 
                            dia_semana: item.dia_semana, 
                            horario_inicio_aula: item.horario_inicio_aula, 
                            horario_fim_aula: item.horario_fim_aula, 
                            total_alunos_presentes: item.total_alunos_presentes, 
                            total_alunos: item.total_alunos,
                            quantidade_aulas: item.quantidade_aulas, 
                            nome_disciplina: nome 
                        }); }}
                            style={[styles.buttonTouchable, { backgroundColor: colors.secundary }]}>
                            <View style={styles.buttonTouchableSegundo}>
                                <Text style={[styles.fonteTextoTouchable, {color: colors.text}]}>{converteDataAmericanaParaBrasileira(item.data)+' '+item.horario_inicio_aula+'-'+item.horario_fim_aula}</Text>
                                <Text style={[styles.fonteTextoTouchable, {color: colors.text}]}>{item.total_alunos_presentes+'/'+item.total_alunos} <Icon name="account-group" color={colors.icone} size={25} /></Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView> :
            <Text style={[styles.aviso, { color: colors.text }]}>Ainda não há registros de presença</Text>}

            <View style={[TemaPrincipal.botoesEditRegistro, TemaPrincipal.marginBottomPadrao]}>
                <Button mode="contained" labelStyle={{ fontSize: 20 }} 
                onPress={() => {navigation.navigate('DisciplinaAluno', { disciplina_id: id, nome_disciplina: nome });}}>
                    Alunos
                </Button>

                <Button mode="contained" labelStyle={{ fontSize: 20 }} 
                onPress={() => {navigation.navigate('Aulas', { disciplina_id: id, nome_disciplina: nome });}}>
                    Aulas
                </Button>
            </View> 

            <Button mode="contained" labelStyle={{ fontSize: 20 }} 
            style={[TemaPrincipal.botaoCadastro]}
            onPress={() => {navigation.navigate('DisciplinaForm', { 
                isEdit: true, id: id, professor_fk: professor_fk, 
                nome: nome, codigo: codigo, curso: curso, complemento: complemento });}}>
            Editar Disciplina
            </Button>  
        </View>
    )
}

export default DisciplinaDetalhe;