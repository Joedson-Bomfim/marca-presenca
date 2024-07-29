import React from 'react';
import { View, TextInput, Text } from 'react-native';
import { useTheme } from 'react-native-paper';

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import TemaPrincipal from "../assets/styles";

const Input = ({ searchTerm, setSearchTerm, ...props }) => {
    const { colors } = useTheme();

    return (
        <View style={TemaPrincipal.searchSection}>
            <Icon style={TemaPrincipal.searchIcon} name="magnify" size={20} color="#FFF"/>
            <TextInput placeholder="Pesquisar aula..." value={searchTerm} onChangeText={text => setSearchTerm(text)}
            style={[TemaPrincipal.inputSearch, { color: colors.text }]} placeholderTextColor="#FFF"
            {...props}/>
        </View>
    );
};

export default Input;
