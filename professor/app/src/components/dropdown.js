import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Modal } from 'react-native';
import { IconButton, Button, useTheme } from 'react-native-paper';

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import TemaPrincipal from "../assets/styles";
import styles from "./styles";

const DropdownSelect = ({
  options,
  onSelect,
  placeholder,
  buttonColor = 'white',
  modalBackgroundColor = 'white',
  searchBorderColor = '#5F5858',
  textColor = '#5F5858',
  modalBorderColor = '#8C8C8C',
  modalBorderWidth = 2,
  disabled = false,
  selected, // Nova prop para valor selecionado
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState('');
  const { colors } = useTheme();
  const inputRef = useRef(null);

  const handleSelect = (item) => {
    onSelect(item.id);
    setModalVisible(false);
  };

  const filteredOptions = options.filter(option =>
    option.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View>
      <Button
        mode="outlined"
        onPress={() => !disabled && setModalVisible(true)}
        style={{ marginBottom: 30, backgroundColor: buttonColor, borderRadius: 10 }}
        contentStyle={{ justifyContent: 'flex-start', paddingTop: 10, paddingBottom: 10 }}
        disabled={disabled}
      >
        {selected ? selected.name : placeholder}
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
              style={[styles.input, { borderBottomColor: searchBorderColor, color: colors.text, fontSize: 20 }]}/>
              <Icon name={'magnify'} size={24} color="#ffffff" onPress={() => inputRef.current.focus()} style={styles.icon}/>
            </View>
            {filteredOptions.length === 0 ? (
              <Text style={{ padding: 10, color: colors.text, textAlign: 'center' }}>Não há dados a serem listados</Text>
            ) : (
              <FlatList
                data={filteredOptions}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleSelect(item)}>
                    <Text style={{ padding: 10, color: colors.text, fontSize: 20 }}>{item.name}</Text>
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
