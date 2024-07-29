import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from "./styles";

const Input = ({ titulo, conteudoForm, setaAnterior, setSeguinte, color }) => {
    return (
        <View>
            <Text style={{alignSelf: 'center', color: {color}, fontSize: 20, fontWeight: 'bold'}}>{titulo}</Text>
            <View style={styles.containerInputSetas}>
                <TouchableOpacity
                    style={[styles.botaoSeta]}
                    onPress={setaAnterior}
                >
                    <Text style={styles.buttonTextSeta}>{"<"}</Text>
                </TouchableOpacity>
                    <Text style={styles.ConteudoBotaoSeta}>{conteudoForm}</Text>
                <TouchableOpacity
                    style={[styles.botaoSeta]}
                    onPress={setSeguinte}
                >
                    <Text style={styles.buttonTextSeta}>{">"}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Input;
