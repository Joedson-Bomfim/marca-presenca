import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useTheme, Button } from "react-native-paper";
import useBeaconService from "../../services/BeaconService";
import { fetchAlunoDisciplinaMarcaPresenca } from "../../Controller/AlunoDisciplinaController";
import { useRoute } from '@react-navigation/native';

import Loading from "../../components/loading";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import TemaPrincipal from "../../assets/styles";
import styles from "./styles";

const SelecionaDisciplinaAula = ({ navigation }) => {
    const { colors } = useTheme();
    const route = useRoute();
    const { disciplinaId, aulaId, data } = route.params;

    const { uuidList, estadoBeacon, startBeaconRanging, stopBeaconRanging } = useBeaconService();
    const [disciplinas, setDisciplina] = useState([]);

    useEffect(() => {
        listaAlunos();
    }, []);

    const listaAlunos = async () => {
        //setVisible(true);
        try {
            const listaluno = await fetchAlunoDisciplinaMarcaPresenca(disciplinaId);
            setDisciplina(listaluno);
            console.log(listaluno);
        } catch (error) {
            console.log('Não foi possível carregar os alunos. Verifique se a tabela existe.');
        } finally {
            //setVisible(false);
        }
    };

    function procurar() {
        startBeaconRanging();
    }

    function pararProcura() {
        stopBeaconRanging();
    }

    let situacaoBeacon = estadoBeacon ? 'ligado' : 'desligado';

    // Função para formatar os dados como JSON
    const formatData = (data) => {
        return JSON.stringify(data, null, 2); // Formata com indentação de 2 espaços
    };

    
    /*
    <Text style={{ color: colors.text, fontFamily: 'monospace' }}>
    {formatData(uuidList)}
    </Text>
    
    <TouchableOpacity onPress={pararProcura}>
    <Icon name="trash-can" color="#fff" size={40} />
    </TouchableOpacity>
    
    () => <Icon name="close-thick" size={30} color="#ffffff" />
    let teste = ['1', '5', '7'];
    */

    return (
        <View style={[styles.fundoTela, { backgroundColor: colors.background }]}>
            <Text style={[TemaPrincipal.titulo, { color: colors.text }]}>Marcar Presença</Text>

            <Text style={{ color: colors.text }}>{situacaoBeacon}</Text>
            <ScrollView style={{ marginTop: 20 }}>
            {disciplinas.map((item) => (
                <View key={item.id} style={styles.bookItem}>
                    <Button mode="contained" icon={uuidList.includes(item.beacon_id) ? 
                        () => <Icon name="check-bold" size={30} color="#ffffff" /> : 
                        () => <Icon name="close-thick" size={30} color="#ffffff" />} contentStyle={{flexDirection: 'row-reverse'}} labelStyle={{ fontSize: 20 }} onPress={pararProcura} style={[styles.conteudo, {backgroundColor: colors.secundary}]}>
                        {item.nome}
                    </Button>
                </View>
            ))}
            </ScrollView>

            {estadoBeacon ?
                <Button mode="contained" labelStyle={{ fontSize: 20 }} onPress={pararProcura} style={[styles.marginBottomPrimario, TemaPrincipal.botaoPrincipal]}>
                    Parar de Procurar
                </Button> :
                <Button mode="contained" labelStyle={{ fontSize: 20 }} onPress={procurar} style={[styles.marginBottomPrimario, TemaPrincipal.botaoPrincipal]}>
                    Procurar Aluno
                </Button>
            }
        </View>
    );
}

export default SelecionaDisciplinaAula;
