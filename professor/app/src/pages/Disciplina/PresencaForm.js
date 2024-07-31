import React, { useState } from "react";
import { ScrollView, View, Text, Alert } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { useRoute } from '@react-navigation/native';
import { editGrupoPresenca, removeGrupoPresenca } from '../../Controller/PresencaController';
import { converteDataAmericanaParaBrasileira, converteDataBrasileiraParaAmericana } from '../../services/formatacao';
import Input from "../../components/Input";
import InputDate from "../../components/inputDate";

import styles from "./styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import TemaPrincipal from "../../assets/styles";

const DisciplinaForm = ( {navigation} ) => {
    const { colors } = useTheme();
    const route = useRoute();

    const { aula_fk, data_antiga, quantidade_aulas } = route.params;

    const [data, setData] = useState(converteDataAmericanaParaBrasileira(data_antiga));
    const [quantidade_aulasForm, setQuantidadeAulas] = useState(quantidade_aulas.toString());
    const [ErrorQuantidadeAulasForm, setErrorQuantidadeAulasForm] = useState('');
    
    const confirmarAtualizacao = async () => {
        if(!quantidade_aulasForm) {
            setErrorQuantidadeAulasForm('Por favor informe a quantidade de aulas');
            return;
        }

        const dataFormatada = converteDataBrasileiraParaAmericana(data);
        const quantidade_aulas_formatada = quantidade_aulasForm.replace(/[^0-9]/g, '');
        setQuantidadeAulas(quantidade_aulas_formatada);
        const result = await editGrupoPresenca(aula_fk, data_antiga, dataFormatada, quantidade_aulas_formatada);
        if (result.success) {
            Alert.alert(
                "Sucesso", "Grupo Presenca atualizado com sucesso",
                [{ text: "OK", onPress: () => {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'DisciplinaStack' }], 
                    });
                }}]
            );
        } else {
            Alert.alert('Atenção', result.message);
        }
    }; 
    
    function atualizarListaPresenca() {
        Alert.alert(
            "Atualizar lista de presença",
            "Tem certeza que deseja atualizar esta lista de presença? As aulas dos alunos que não estavam presentes (justificado, presença parcial...) serão zeradas, não se esqueça de revisar a presença deles.",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Atualizar",
                    onPress: () => confirmarAtualizacao()
                }
            ]
        );
    }

    function apagarListaAula() {
        Alert.alert(
            "Apagar Lista de Presença",
            "Tem certeza que deseja apagar esta lista de presença? Isso irá apagar a presença de todos os alunos que foram registrados nesta lista!",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Apagar",
                    onPress: () => confirmarExclusao()
                }
            ]
        );
    }
    
    const confirmarExclusao = async () => {
        const result = await removeGrupoPresenca(aula_fk, data_antiga);
        if (result.success) {
            Alert.alert(
                "Sucesso", "Lista de presença apagada com sucesso",
                [{ text: "OK", onPress: () => {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'DisciplinaStack' }], 
                    });
                }}]
            );
        } else {
            if(result.message.includes('FOREIGN KEY')) {
                Alert.alert('Não foi possível apagar','Esta aula possui pelo menos um registro de presença');
                return    
            }

            Alert.alert('Houve um erro','Não foi possível apagar esta aula, tente novamente mais tarde');
        }
    }; 

    return(
        <ScrollView style={[styles.fundoTela, {backgroundColor: colors.background}]}>
            <Text style={[TemaPrincipal.titulo, {color: colors.text }]}>Editar Grupo Presença</Text>

            <Text style={{fontSize: 15, color: colors.text, fontWeight: "bold", textAlign: 'center'}}>
                * Importante: Ao atualizar esta lista de presença, todos os alunos com a situação diferente de presente terão sua quantidade de aula
                zerada. Revise os anos nessa situação, estão representados por este ícone 
                <Icon  name="information" color={colors.icone} size={20}/>. Obrigado pela atenção.
            </Text>

            <InputDate titulo={'Selecione para alterar a data'} icon={'calendar-month'} initialDate={data} onDateSelected={(dataSelecionada) => setData(dataSelecionada)}/>
            
            <Input 
                label="Quantidade Aulas" 
                value={quantidade_aulasForm} 
                error={ErrorQuantidadeAulasForm} 
                setError={setErrorQuantidadeAulasForm} keyboardType="numeric"
                onChangeText={(text) => { setQuantidadeAulas(text); if (ErrorQuantidadeAulasForm) { setErrorQuantidadeAulasForm(''); }}} 
                containerStyle={TemaPrincipal.marginBottomPadrao} 
                style={TemaPrincipal.inputPadrao}/>

            <View style={TemaPrincipal.botoesEditRegistro}>
                <Button mode="contained" onPress={apagarListaAula} style={[styles.button, TemaPrincipal.marginBottomPadrao, { backgroundColor: '#CF4D4F' }]}>
                    APAGAR
                </Button>

                <Button mode="contained" onPress={atualizarListaPresenca} style={[TemaPrincipal.marginBottomPadrao]}>
                    ATUALIZAR
                </Button>
            </View> 
            
        </ScrollView>
    )
}

export default DisciplinaForm;