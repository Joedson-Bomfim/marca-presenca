import React from 'react';
import { View, Text, ScrollView } from "react-native";
import { useTheme, Button } from "react-native-paper";
import useBeaconService from "../../services/BeaconService";

import TemaPrincipal from "../../assets/styles";
import styles from "./styles";

const SelecionaDisciplinaAula = ({ navigation }) => {
    const { colors } = useTheme();
    const { uuidList, estadoBeacon, startBeaconRanging, stopBeaconRanging } = useBeaconService();

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

    return (
        <View style={[styles.fundoTela, { backgroundColor: colors.background }]}>
            <Text style={[TemaPrincipal.titulo, { color: colors.text }]}>Marcar Presença</Text>

            <Text style={{ color: colors.text }}>{situacaoBeacon}</Text>
            <Text style={{ color: colors.text }}>Detecção de Beacons</Text>

            <ScrollView style={{ marginTop: 20 }}>
                <Text style={{ color: colors.text, fontFamily: 'monospace' }}>
                    {formatData(uuidList)}
                </Text>
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
