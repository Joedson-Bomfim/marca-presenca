import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from "./styles";

const Input = ({ titulo, conteudoForm, fontSizeTitulo, fontSizeConteudo, setaAnterior, setSeguinte, color }) => {
    return (
        <View>
            <Text style={{alignSelf: 'center', color: color, fontSize: fontSizeTitulo, fontWeight: 'bold'}}>{titulo}</Text>
            <View style={styles.containerInputSetas}>
                <TouchableOpacity style={[styles.botaoSeta]} onPress={setaAnterior} >
                    <Text style={styles.buttonTextSeta}>{"<"}</Text>
                </TouchableOpacity>
                    <Text style={[styles.ConteudoBotaoSeta, {fontSize: fontSizeConteudo}]}>{conteudoForm}</Text>
                <TouchableOpacity style={[styles.botaoSeta]} onPress={setSeguinte} >
                    <Text style={styles.buttonTextSeta}>{">"}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Input;
