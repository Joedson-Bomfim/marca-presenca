import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { TextInput, Button, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import styles from "./styles";
import TemaPrincipal from "../../style/styles";

const Home = ( {navigation} ) => {
    const { colors } = useTheme();

    const [credenciais, setCredenciais] = useState({
        codigoDisciplina: ''
    })

    return(
        <View style={[styles.fundoTela, {backgroundColor: colors.background}]}>
            <TouchableOpacity onPress={() => {navigation.navigate('Perfil');}} style={styles.fotoPerfil}>
                <Icon name="account-circle" color="#fff" size={80}/>
            </TouchableOpacity>

            <View>
                <Button mode="contained" onPress={() => {navigation.navigate('Disciplina');}} style={[styles.marginBottomPrimario, TemaPrincipal.inputPadrao]}>
                    DISCIPLINAS
                </Button>

                <TextInput label="Código disciplina" mode="flat" value={credenciais.codigoDisciplina} 
                        onChange={(text) => setCredenciais({...credenciais, codigoDisciplina: text})} style={[styles.marginBottomSecundario, TemaPrincipal.inputPadrao]}
                ></TextInput>

                <Button mode="contained" onPress={() => {navigation.navigate('Disciplina');}} style={TemaPrincipal.inputPadrao}>
                    ADICIONAR
                </Button>
            </View>

        </View>
    )
}

export default Home;