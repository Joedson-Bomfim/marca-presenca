import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { useIsFocused } from '@react-navigation/native';
import { fetchTodosGrupoPresenca } from '../../Controller/PresencaController';
import { converteDataAmericanaParaBrasileira } from '../../services/formatacao';
import InputSearch from "../../components/InputSearch";

import Loading from "../../components/LoadingDefaulft";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./styles";
import TemaPrincipal from "../../assets/styles";

const Presenca = ( {navigation} ) => {
    const { colors } = useTheme();

    const [presencas, setListaPresenca] = useState([]);
    const [visible, setVisible] = useState(false);
    const [isExist, setIsExist] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const isFocused = useIsFocused(); //Sempre irá consultar as presenças quando a tela for aberta (Isso garante que sempre esteja atualizado)
    
    useEffect(() => {
        listaTodosGrupoPresenca();

    }, [isFocused]);

    const listaTodosGrupoPresenca = async () => {
        setVisible(true);
        setIsExist(true)
        try {
            const listPresenca = await fetchTodosGrupoPresenca();
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
        //<Icon name="clipboard-text-clock-outline" color={ colors.icone } size={40}/>       
        <View style={[styles.fundoTela, {backgroundColor: colors.background}]}>
            <Text style={[styles.titulo, {color: colors.text }]}>Presenças</Text>

            <InputSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>

            {isExist ?
            <ScrollView>
                    <Loading visible={visible}/>
                    {filteredPresencas.map((item) => (
                    <View key={item.id}>
                        <TouchableOpacity 
                        onPress={() => {
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'DisciplinaStack' }], 
                            }); //Limpar a pilha caso alguma disciplina esteja aberta
                        
                            setTimeout(() => {
                                navigation.navigate('DisciplinaStack', {
                                    screen: 'PresencaAula',
                                    params: {
                                        aula_id: item.aula_id,
                                        data_presenca: item.data, 
                                        dia_semana: item.dia_semana, 
                                        horario_inicio_aula: item.horario_inicio_aula,
                                        horario_fim_aula: item.horario_fim_aula,
                                        total_alunos_presentes: item.total_alunos_presentes,
                                        total_alunos: item.total_alunos,
                                        quantidade_aulas: item.quantidade_aulas,
                                        nome_disciplina: item.disciplina
                                    }
                                });
                            }, 1); // Tempo de atraso (em milissegundos) para garantir a navegação seja empilhada
                        }}
                            style={[styles.buttonTouchable, { backgroundColor: colors.secundary }]}>
                            <View style={styles.buttonTouchableSegundo}>
                                <Text style={[styles.fonteTextoTouchable, {color: colors.text}]}>{converteDataAmericanaParaBrasileira(item.data)+' '+item.horario_inicio_aula} {(item.disciplina.length > 20 ? item.disciplina.slice(0, 15) + '...' : item.disciplina)}</Text>
                                <Text style={[styles.fonteTextoTouchable, {color: colors.text}]}>{item.total_alunos_presentes+'/'+item.total_alunos} <Icon name="account-group" color={colors.icone} size={25} /></Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView> :
            <Text style={styles.aviso}>Ainda não há registros de presença</Text>}
        </View>
    )
}

export default Presenca;