import React, { useState } from 'react';
import { View, Text, Modal, Alert } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import Input from './Input';

import TemaPrincipal from "../assets/styles";
import styles from "./styles";

const RedefinirID = ({ redefinirID, senhaContext, estadoModal, modalBorderColor = '#8C8C8C', modalBorderWidth = 2 }) => {
    const { colors } = useTheme();
    const [modalVisible, setModalVisible] = useState(false);
    const [senhaForm, setSenhaForm] = useState('');
    const [errorSenha, setErrorSenha] = useState('');

    const selecionaAluno = () => {
        setModalVisible(true);
    };

    const redefinir = () => {
        if(!senhaForm) {
            setErrorSenha('Por favor, preencha a senha!');
            return;
        }

        if (senhaForm === senhaContext) {
            Alert.alert(
                "Confirmação",
                `Tem certeza que deseja redefinir o seu ID?`,
                [
                    {
                        text: "Cancelar",
                        style: "cancel"
                    },
                    {
                        text: "Atualizar",
                        onPress: () => {
                            redefinirID();
                            setModalVisible(false);
                        }
                    }
                ]
            );
        } else {
            setErrorSenha('Senha incorreta!');
        }
    };

    return (
        <View>
            <Button
                mode="contained" labelStyle={{ fontSize: 15 }} onPress={estadoModal ? () => { } : selecionaAluno}
                style={[styles.botaoRedefinirId, { backgroundColor: colors.secundary }]}>
                Redefinir ID
            </Button>

            <Modal visible={modalVisible} transparent onRequestClose={() => setModalVisible(false)}>
                <View style={TemaPrincipal.modalOverlay}>
                    <View style={[TemaPrincipal.modalSelecinaAluno, { borderColor: modalBorderColor, borderWidth: modalBorderWidth }]}>
                        <Text style={[TemaPrincipal.tituloModal, { color: colors.text }]}>Redefinir ID</Text>

                        <Text style={[styles.marginBottom, { color: colors.text }]}>
                            A redefinição do ID fará com que o seu professor tenha que cadastrar novamente o seu novo ID! Tenha em mente
                            que essa funcionalidade deve ser utilizada em último caso.
                        </Text>

                        <Input label="Digite sua senha" value={senhaForm} secureTextEntry error={errorSenha} setError={setErrorSenha}
                        containerStyle={TemaPrincipal.inputModal} autoCapitalize="none"
                        onChangeText={(text) => { setSenhaForm(text); if (errorSenha) { setErrorSenha(''); }}}/>

                        <View style={styles.containerModal}>
                            <Button mode="contained" labelStyle={{ fontSize: 20 }} onPress={() => setModalVisible(false)}>
                                Voltar
                            </Button>

                            <Button mode="contained" labelStyle={{ fontSize: 20 }} onPress={redefinir} style={{ backgroundColor: '#EE7152' }}>
                                Redefinir
                            </Button>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default RedefinirID;
