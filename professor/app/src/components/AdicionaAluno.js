import React, { useState, useRef } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Modal, Alert } from 'react-native';
import { IconButton, Button, useTheme } from 'react-native-paper';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import TemaPrincipal from "../assets/styles";
import styles from "./styles";

const DropdownSelect = ({ nome_disciplina, options, onSelect, placeholder, modalBorderColor = '#8C8C8C', 
                          modalBorderWidth = 2,  disabled = false,
}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [search, setSearch] = useState('');
    const { colors } = useTheme();
    const inputRef = useRef(null);

    const handleSelect = async (item) => {
        Alert.alert(
            "Confirmação",
            "Tem certeza que deseja adicionar " + item.name + " a disciplina " + nome_disciplina + "?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Apagar",
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

    return (
        <View>
            <Button mode="contained" labelStyle={{ fontSize: 20 }} onPress={() => !disabled && setModalVisible(true)}
                contentStyle={{ paddingTop: 10, paddingBottom: 10 }} icon={() => <Icon name={'account-plus'} size={30} color="#ffffff" />}>
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
                        {filteredOptions.length === 0 ? (
                            <Text style={{ padding: 10, color: colors.text, textAlign: 'center' }}>Não há dados a serem listados</Text>
                        ) : (
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
