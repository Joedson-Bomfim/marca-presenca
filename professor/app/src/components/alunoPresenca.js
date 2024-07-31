import React, { useState, useEffect } from 'react';
import { View, Text, Modal, Alert } from 'react-native';
import { Button, TextInput, useTheme } from 'react-native-paper';
import InputArrow from "../components/InputArrow";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import TemaPrincipal from "../assets/styles";
import styles from "./styles";

const AlunoPresenca = ({ nome, data, estadoBeacon, presenca = {}, setPresenca, icon, modalBorderColor = '#8C8C8C', modalBorderWidth = 2 }) => {
    const { colors } = useTheme();
    const [modalVisible, setModalVisible] = useState(false);
    const [localPresenca, setLocalPresenca] = useState(presenca);
    const [situacaoAluno, setSituacaoAluno] = useState(presenca.situacao || 'Presente');

    const SituacaoAluno = [
        'Presente', 'Ausente', 'Justificado', 'Presença Parcial'
    ];

    const indiceAtual = SituacaoAluno.indexOf(situacaoAluno);

    useEffect(() => {
        setSituacaoAluno(presenca.situacao || 'Presente');
        setLocalPresenca(presenca);
    }, [presenca]);

    useEffect(() => {
        alterarDados('situacao', situacaoAluno);
    }, [situacaoAluno]);

    function selecionaAluno() {
        setModalVisible(true);
    }

    const alterarDados = (field, value) => {
        console.log(value);
        if(field == 'quantidade_aulas_assistidas' && value == '') {
            value = 0;
        }
        console.log(value);
        setLocalPresenca(prev => ({ ...prev, [field]: value }));
    };

    const atualizar = () => {
        Alert.alert(
            "Confirmação",
            "Tem certeza que deseja alterar os dados do(a) aluno(a) " + nome + "?",
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
            <Button mode="contained" icon={() => <Icon name={icon} size={30} color="#ffffff" />} contentStyle={{ flexDirection: 'row-reverse' }} labelStyle={{ fontSize: 18 }}
            onPress={estadoBeacon ? () => { } : selecionaAluno} style={[styles.conteudoAlunoPresenca, { backgroundColor: estadoBeacon ? colors.outline : colors.secundary }]}>
                {nome}
            </Button>

            <Modal visible={modalVisible} transparent onRequestClose={() => setModalVisible(false)}>
                <View style={TemaPrincipal.modalOverlay}>
                    <View style={[TemaPrincipal.modalSelecinaAluno, { borderColor: modalBorderColor, borderWidth: modalBorderWidth }]}>
                        <Text style={[styles.tituloModal, { color: colors.text }]}>{nome}</Text>

                        <InputArrow titulo={'Situação do aluno'} fontSizeTitulo={14} fontSizeConteudo={16} conteudoForm={situacaoAluno}
                            setaAnterior={situacaoAnterior} setSeguinte={proximaSituacao} color={colors.text} onChangeText={text => alterarDados('situacao', text)}/>

                        <TextInput label="Data" mode="flat" value={data} editable={false} style={TemaPrincipal.inputModal} />

                        <TextInput label="Total Aulas Assistidas" mode="flat" value={localPresenca.quantidade_aulas_assistidas || ''}  keyboardType="numeric"
                        onChangeText={text => alterarDados('quantidade_aulas_assistidas', text.replace(/[^0-9]/g, ''))} style={TemaPrincipal.inputModal} />


                        <TextInput label="Observação" mode="flat" value={localPresenca.observacao || ''}
                        onChangeText={text => alterarDados('observacao', text)} style={TemaPrincipal.inputModal} />

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
