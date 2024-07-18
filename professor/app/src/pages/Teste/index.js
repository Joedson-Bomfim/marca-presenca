import React from "react";
import { Text, View, FlatList } from 'react-native';
import { TextInput, Button, useTheme } from "react-native-paper";
import useBeaconService from "../../services/BeaconService";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import TemaPrincipal from "../../assets/styles";
import styles from "./styles";

const Teste = ( {navigation} ) => {
    const { colors } = useTheme();
    const { data, beaconIdentificado } = useBeaconService();

    return(
        //<Icon name="clipboard-text-clock-outline" color={ colors.icone } size={40}/>       
        <View style={[styles.fundoTela, {backgroundColor: colors.background}]}>
            <Text style={[styles.titulo, {color: colors.text }]}>Disciplinas</Text>

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
        </View>
    )
}

export default Teste;
