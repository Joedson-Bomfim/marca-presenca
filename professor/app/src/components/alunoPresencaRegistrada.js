import React, { useState } from 'react';
import { View, Text, Modal, Alert } from 'react-native';
import { Button, TextInput, useTheme } from 'react-native-paper';
import { editPresenca } from '../Controller/PresencaController';
import { fetchTodosGrupoPresenca } from '../Controller/PresencaController';
import InputArrow from "../components/InputArrow";
import Input from "../components/Input";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import TemaPrincipal from "../assets/styles";
import styles from "./styles";

const AlunoPresenca = ({ id, nome, situacao, data, aulas_assistidas, observacao, estadoBeacon, atualizaSituacao,
                         icon, modalBorderColor = '#8C8C8C', modalBorderWidth = 2 }) => {
    const { colors } = useTheme();
    const [modalVisible, setModalVisible] = useState(false);
    const [aulas_assistidasForm, setAulasAssistidas] = useState(aulas_assistidas);
    const [ErrorAulasAssistidas, setErrorAulasAssistidas] = useState('');
    const [observacaoForm, setObservacaoForm] = useState(observacao);

    function selecionaAluno() {
        setModalVisible(true);
    }

    const atualizar = () => {
        if(!aulas_assistidasForm) {
            setErrorAulasAssistidas('Por favor informe a quantidade de aulas');
            return;
        }

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
        const aulas_assistidasFormFormatada = aulas_assistidasForm.replace(/[^0-9]/g, '');
        setAulasAssistidas(aulas_assistidasFormFormatada);
        console.log('Campos preenchidos. Chamando editPresença...');
        const result = await editPresenca(id, aulas_assistidasFormFormatada, observacaoForm, situacaoAluno);
        if (result.success) {
            atualizaSituacao();
            Alert.alert(
                "Sucesso", "Aluno(a) atualizado(a) com sucesso",
                [{ text: "OK", onPress: () => { setModalVisible(false); }}]
            );
            listaTodosGrupoPresenca();
        } else {
            Alert.alert('Atenção', 'Houve um problema ao tentar atualizar o seu registro de presença');
        }
        
        setModalVisible(false);
    }

    const listaTodosGrupoPresenca = async () => {
        try {
            const listPresenca = await fetchTodosGrupoPresenca();
            listPresenca.length === 0 ? setIsExist(false) : setListaPresenca(listPresenca);
        } catch (error) {
            console.log('Não foi possível carregar os presencas. Verifique se a tabela existe.');
        }
    };

    const [situacaoAluno, setSituacaoAluno] = useState(situacao || 'Presente');

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
                labelStyle={{ fontSize: 18 }}
                onPress={estadoBeacon ? () => { } : selecionaAluno}
                style={[styles.conteudoAlunoPresenca, { backgroundColor: estadoBeacon ? colors.tertiary : colors.secundary }]}>
                {nome}
            </Button>

            <Modal visible={modalVisible} transparent onRequestClose={() => setModalVisible(false)}>
                <View style={TemaPrincipal.modalOverlay}>
                    <View style={[TemaPrincipal.modalSelecinaAluno, { borderColor: modalBorderColor, borderWidth: modalBorderWidth }]}>
                        <Text style={[TemaPrincipal.tituloModal, { color: colors.text }]}>{nome}</Text>

                        <InputArrow titulo={'Situação do aluno'} fontSizeTitulo={14} fontSizeConteudo={16} conteudoForm={situacaoAluno}
                        onChangeText={setSituacaoAluno}  setaAnterior={situacaoAnterior} setSeguinte={proximaSituacao} color={colors.text} />

                        <TextInput label="Data" mode="flat" value={data} editable={false} style={TemaPrincipal.inputModal} />

                        <Input label="Total de Aulas Assistidas" value={aulas_assistidasForm} error={ErrorAulasAssistidas} setError={setErrorAulasAssistidas}
                        onChangeText={(text) => { setAulasAssistidas(text); if (ErrorAulasAssistidas) { setErrorAulasAssistidas(''); }}} 
                        containerStyle={TemaPrincipal.marginBottomPadrao} style={TemaPrincipal.inputPadrao}  keyboardType="numeric"/>

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
