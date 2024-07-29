import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Button, useTheme } from "react-native-paper";
import InputSearch from "../../components/InputSearch";

import styles from "./styles";
import TemaPrincipal from "../../assets/styles";

const Presenca = ( {navigation} ) => {
    const { colors } = useTheme();

    const [presencas, setPresenca] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        //listaDisciplinas();
    }, []);

    /*
    const filtereddisciplinas = presencas.filter(aula =>
        //aula.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
    */

    return(
        //<Icon name="clipboard-text-clock-outline" color={ colors.icone } size={40}/>       
        <View style={[styles.fundoTela, {backgroundColor: colors.background}]}>
            <Text style={[styles.titulo, {color: colors.text }]}>Presenças</Text>

            <InputSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </View>
    )
}

export default Presenca;