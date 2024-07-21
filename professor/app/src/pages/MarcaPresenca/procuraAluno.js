import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Alert, TouchableOpacity, Platform } from "react-native";
import { useTheme, Button, TextInput } from "react-native-paper";
import useBeaconService from "../../services/BeaconService";

import TemaPrincipal from "../../assets/styles";
import styles from "./styles";

const SelecionaDisciplinaAula = ( {navigation} ) => {
    const { colors } = useTheme();
    const { data, beaconIdentificado, estadoBeacon, startBeaconRanging, stopBeaconRanging } = useBeaconService();

    function procurar() {
        startBeaconRanging();
    }

    function pararProcura() {
        stopBeaconRanging();
    }

    let situacaoBeacon = 'desligado'
    if(estadoBeacon) {
        situacaoBeacon = 'ligado'
    }else {
        situacaoBeacon = 'desligado'
    }

    return(
        <View style={[styles.fundoTela, {backgroundColor: colors.background}]}>
            <Text style={[TemaPrincipal.titulo, {color: colors.text }]}>Marcar Presença</Text>       

            <Text style={{ color: colors.text }}>{situacaoBeacon}</Text>
            <Text style={{ color: colors.text }}>Detecção de Beacons</Text>
            {beaconIdentificado ?
              <FlatList
                data={data}
                keyExtractor={(item) => item.uuid} // Use uma chave única para cada item
                renderItem={({ item }) => (
                  <View>
                    <Text style={{ color: colors.text }}>{`UUID: ${item.uuid}`}</Text>
                    <Text style={{ color: colors.text }}>{`Major: ${item.major}`}</Text>
                    <Text style={{ color: colors.text }}>{`Minor: ${item.minor}`}</Text>
                    <Text style={{ color: colors.text }}>{`Distância: ${parseFloat(item.distance.toFixed(4))} m`}</Text>
                  </View>
                )}
              /> :
              <Text style={{ color: colors.text }}>Nenhum beacon foi identificado, verifique se o bluetooth e a localização estão ativados</Text>
            } 

            {estadoBeacon ?
                <Button mode="contained" labelStyle={{ fontSize: 20 }} onPress={pararProcura} style={[styles.marginBottomPrimario, TemaPrincipal.botaoPrincipal]}>
                    Parar de Procurar
                </Button> :
                <Button mode="contained" labelStyle={{ fontSize: 20 }} onPress={procurar} style={[styles.marginBottomPrimario, TemaPrincipal.botaoPrincipal]}>
                    Procurar Aluno
                </Button>
            }
        </View>
    )
}

export default SelecionaDisciplinaAula;