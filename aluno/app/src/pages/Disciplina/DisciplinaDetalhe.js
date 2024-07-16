import React, { useState } from "react";
import { Text, View } from "react-native";
import { TextInput, Button, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import styles from "./styles";
import TemaPrincipal from "../../style/styles";

const Disciplina = ( {navigation} ) => {
    const { colors } = useTheme();

    return(
        //<Icon name="check-bold" color={ colors.icone } size={40}/>
        //<Icon name="close-thick" color={ colors.icone } size={40}/> 
        //<Icon name="trash-can-outline" color={ colors.icone } size={40}/>
        //<Icon name="account-group" color={ colors.icone } size={40}/>  
        //<Icon name="square-edit-outline" color={ colors.icone } size={40}/>      
        <View style={[styles.fundoTela, {backgroundColor: colors.background}]}>
            <Text style={[styles.titulo, {color: colors.text }]}>Detalhes Disciplina</Text>
                
        </View>
    )
}

export default Disciplina;