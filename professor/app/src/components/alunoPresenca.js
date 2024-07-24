import React, { useState } from 'react';
import { View, Text, Modal, Alert } from 'react-native';
import { Button, TextInput, useTheme } from 'react-native-paper';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import TemaPrincipal from "../assets/styles";
import styles from "./styles";

const AlunoPresenca = ({ nome, data, estadoBeacon, presenca = {}, setPresenca, icon, modalBorderColor = '#8C8C8C', modalBorderWidth = 2 }) => {
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [localPresenca, setLocalPresenca] = useState(presenca);

  function selecionaAluno() {
      setLocalPresenca(presenca); 
      setModalVisible(true);
  }

  const alterarDados = (field, value) => {
      setLocalPresenca(prev => ({ ...prev, [field]: value }));
  };

  const atualizar = () => {
    Alert.alert(
        "Confirmação",
        "Tem certeza que deseja alterar os dados do(a) aluno(a) "+nome+"?",
        [
            {
                text: "Cancelar",
                style: "cancel"
            },
            {
                text: "Atualizar",
                onPress: () => finalizarAlteracao()
            }
        ]
    );
  };

  function finalizarAlteracao() {
    setPresenca(localPresenca); 
    setModalVisible(false);
  }

  return (
      <View>
          <Button
              mode="contained"
              icon={() => <Icon name={icon} size={30} color="#ffffff" />}
              contentStyle={{ flexDirection: 'row-reverse' }}
              labelStyle={{ fontSize: 20 }}
              onPress={estadoBeacon ? () => {} :selecionaAluno}
              style={[styles.conteudoAlunoPresenca, { backgroundColor: estadoBeacon ? colors.tertiary : colors.secundary }]}>
              {nome}
          </Button>

          <Modal visible={modalVisible} transparent onRequestClose={() => setModalVisible(false)}>
              <View style={TemaPrincipal.modalOverlay}>
                  <View style={[TemaPrincipal.modalSelecinaAluno, { borderColor: modalBorderColor, borderWidth: modalBorderWidth }]}>
                      <Text style={[TemaPrincipal.tituloModal, { color: colors.text }]}>{nome}</Text>

                      <TextInput label="Data" mode="flat" value={data} editable={false} style={TemaPrincipal.inputModal}/>

                      <TextInput label="Total Aulas Assistidas" mode="flat" value={localPresenca.quantidade_aulas_assistidas || ''}
                          onChangeText={text => alterarDados('quantidade_aulas_assistidas', text)} style={TemaPrincipal.inputModal}
                      />

                      <TextInput label="Observação" mode="flat" value={localPresenca.observacao || ''} 
                            onChangeText={text => alterarDados('observacao', text)} style={TemaPrincipal.inputModal}
                      />

                      <View style={styles.containerModal}>
                          <Button mode="contained" labelStyle={{ fontSize: 20 }} onPress={() => setModalVisible(false)}>
                              Voltar
                          </Button>

                          <Button mode="contained" labelStyle={{ fontSize: 20 }} onPress={atualizar}>
                              Atualizar
                          </Button>
                      </View>
                  </View>
              </View>
          </Modal>
      </View>
  );
};

export default AlunoPresenca;
