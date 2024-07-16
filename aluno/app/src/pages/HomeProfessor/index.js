import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Button, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import styles from "./styles";
import TemaPrincipal from "../../style/styles";

const Home = ( {navigation} ) => {
    const { colors } = useTheme();

    return(
        <View style={[styles.fundoTela, {backgroundColor: colors.background}]}>
            <View>
                <Button mode="contained" labelStyle={{ fontSize: 20 }} onPress={() => {navigation.navigate('DisciplinaStack');}} style={[styles.marginBottomPrimario, TemaPrincipal.botaoPrincipal]}>
                    Disciplinas
                </Button>

                <Button mode="contained" labelStyle={{ fontSize: 20 }} onPress={() => {navigation.navigate('BeaconStack');}} style={TemaPrincipal.botaoPrincipal}>
                    Beacons
                </Button>
            </View>

        </View>
    )
}

export default Home;