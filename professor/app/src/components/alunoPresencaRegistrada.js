import React, { useState } from 'react';
import { View, Text, Modal, Alert } from 'react-native';
import { Button, TextInput, useTheme } from 'react-native-paper';
import { editPresenca } from '../Controller/PresencaController';
import InputArrow from "../components/InputArrow";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import TemaPrincipal from "../assets/styles";
import styles from "./styles";

const AlunoPresenca = ({ id, nome, data, aulas_assistidas, observacao, estadoBeacon, presenca = {}, 
                         setPresenca, icon, modalBorderColor = '#8C8C8C', modalBorderWidth = 2 }) => {
    const { colors } = useTheme();
    const [modalVisible, setModalVisible] = useState(false);
    const [localPresenca, setLocalPresenca] = useState(presenca);
    const [aulas_assistidasForm, setAulasAssistidas] = useState(aulas_assistidas);
    const [observacaoForm, setObservacaoForm] = useState(observacao);

    function selecionaAluno() {
        setLocalPresenca(presenca);
        setModalVisible(true);
    }

    const atualizar = () => {
        Alert.alert(
            "Confirmação",
            `Tem certeza que deseja alterar os dados do(a) aluno(a) ${nome}?`,
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

    const finalizarAlteracao = async () => {
        if (aulas_assistidasForm) {
            console.log('Campos preenchidos. Chamando editPresença...');
            let situacao = 'Ausente';
            const result = await editPresenca(id, aulas_assistidasForm, observacaoForm, situacao);
            if (result.success) {
                Alert.alert(
                    "Sucesso", "Aluno(a) atualizado(a) com sucesso",
                    [{ text: "OK", onPress: () => { setModalVisible(false); }}]
                );
            } else {
                Alert.alert('Atenção', result.message);
            }
        } else {
            Alert.alert('Atenção', 'Por favor preencha todos os campos');
        }
        setModalVisible(false);
    }

    const [situacaoAluno, setSituacaoAluno] = useState('Presente');

    const SituacaoAluno = [
        'Presente', 'Ausente', 'Justificado', 'Presença Parcial'
    ];

    const indiceAtual = SituacaoAluno.indexOf(situacaoAluno);

    const proximaSituacao = () => {
        const proximoIndice = (indiceAtual + 1) % SituacaoAluno.length;
        setSituacaoAluno(SituacaoAluno[proximoIndice]);
    };

    const situacaoAnterior = () => {
        const indiceAnterior = (indiceAtual - 1 + SituacaoAluno.length) % SituacaoAluno.length;
        setSituacaoAluno(SituacaoAluno[indiceAnterior]);
    };

    return (
        <View>
            <Button
                mode="contained"
                icon={() => <Icon name={icon} size={30} color="#ffffff" />}
                contentStyle={{ flexDirection: 'row-reverse' }}
                labelStyle={{ fontSize: 20 }}
                onPress={estadoBeacon ? () => { } : selecionaAluno}
                style={[styles.conteudoAlunoPresenca, { backgroundColor: estadoBeacon ? colors.tertiary : colors.secundary }]}>
                {nome}
            </Button>

            <Modal visible={modalVisible} transparent onRequestClose={() => setModalVisible(false)}>
                <View style={TemaPrincipal.modalOverlay}>
                    <View style={[TemaPrincipal.modalSelecinaAluno, { borderColor: modalBorderColor, borderWidth: modalBorderWidth }]}>
                        <Text style={[TemaPrincipal.tituloModal, { color: colors.text }]}>{nome}</Text>

                        <InputArrow titulo={'Situação do aluno'} fontSizeTitulo={14} fontSizeConteudo={16} conteudoForm={situacaoAluno}
                            setaAnterior={situacaoAnterior} setSeguinte={proximaSituacao} color={colors.text} />

                        <TextInput label="Data" mode="flat" value={data} editable={false} style={TemaPrincipal.inputModal} />

                        <TextInput label="Total Aulas Assistidas" mode="flat" value={aulas_assistidasForm} keyboardType="numeric"
                        onChangeText={setAulasAssistidas} style={TemaPrincipal.inputModal} />

                        <TextInput label="Observação" mode="flat" value={observacaoForm}
                            onChangeText={setObservacaoForm} style={TemaPrincipal.inputModal}
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
