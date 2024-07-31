import React, { useState, useRef } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Modal, Alert } from 'react-native';
import { IconButton, Button, useTheme } from 'react-native-paper';

import { formatUUID } from '../services/formatacao';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import TemaPrincipal from "../assets/styles";
import styles from "./styles";

const DropdownSelect = ({ nome_disciplina, options, onSelect, tipo, fontSize, icon, placeholder, modalBorderColor = '#8C8C8C', 
                          backgroundColor, modalBorderWidth = 2,  disabled = false, ...props}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [search, setSearch] = useState('');
    const { colors } = useTheme();
    const inputRef = useRef(null);

    const handleSelect = async (item) => {
        let id = tipo == 'beacon' ?  formatUUID(item.id) : '';
        let frase = tipo != 'beacon' ? 
        "Tem certeza que deseja adicionar " + item.name + " a disciplina " + nome_disciplina + "?" : 
        "Tem certeza que deseja vincular o ID "+id+" ao aluno?";
        Alert.alert(
            "Confirmação",
            frase,
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Adicionar",
                    onPress: async () => {
                        await onSelect(item.id);
                        setModalVisible(false);
                    }
                }
            ]
        );
    };

    const filteredOptions = options.filter(option =>
        option.name.toLowerCase().includes(search.toLowerCase())
    );

    let resposta = tipo == 'beacon' ? 
    <Text style={{ padding: 10, color: colors.text, textAlign: 'center' }}>Procurando por beacons...por favor, aguarde</Text> :
    <Text style={{ padding: 10, color: colors.text, textAlign: 'center' }}>Não há dados a serem listados</Text>;

    return (
        <View>
            <Button 
                mode="contained" 
                labelStyle={{ fontSize: fontSize }} 
                onPress={() => !disabled && setModalVisible(true)}
                icon={() => <Icon name={icon} size={30} color="#ffffff" />}
                style={[{ backgroundColor: backgroundColor ? colors.secondary : colors.primary }]}
                {...props}>
                {placeholder} 
            </Button>

            <Modal
                visible={modalVisible}
                transparent
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={TemaPrincipal.modalOverlay}>
                    <View style={[TemaPrincipal.modalContent, { borderColor: modalBorderColor, borderWidth: modalBorderWidth }]}>
                        <View style={styles.container}>
                            <TextInput placeholder="Pesquisar..." value={search} onChangeText={setSearch} ref={inputRef} placeholderTextColor={colors.text}
                            style={[styles.input, { borderBottomColor: colors.text, color: colors.text }]}/>
                            <Icon name={'magnify'} size={24} color="#ffffff" onPress={() => inputRef.current.focus()} style={styles.icon}/>
                        </View>
                        {filteredOptions.length === 0 ? 
                        resposta : (
                            <FlatList
                                data={filteredOptions}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => handleSelect(item)}>
                                        <Text style={{ padding: 10, color: colors.text }}>{item.name}</Text>
                                    </TouchableOpacity>
                                )}
                                keyExtractor={(item) => item.id.toString()}
                            />
                        )}
                        <Button mode="contained" onPress={() => setModalVisible(false)} style={{ marginTop: 10, width: 150, alignSelf: 'center', }}>
                            Fechar
                        </Button>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default DropdownSelect;
