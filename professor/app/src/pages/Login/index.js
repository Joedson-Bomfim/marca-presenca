import React, { useState, useContext } from "react";
import { View, Alert} from "react-native";
import { Text, TextInput, Button, useTheme } from "react-native-paper";
import { login } from "../../services/login";

import { AuthContext } from "../../contexts/Auth";

import styles from "./styles";
import TemaPrincipal from "../../style/styles";
import Loading from "../../components/loading";

const Login = ({ navigation }) => {
    const { colors } = useTheme();
    const [visible, setVisible] = useState(false);

    const [credenciais, setCredenciais] = useState({
        usuario: '',
        senha: ''
    });

    const { setIsAuthenticated, setTipo, setUsuario, setNome, setMatricula, setNumero_registro } = useContext(AuthContext);

    async function logar() {
        setVisible(true);

        if(credenciais.usuario != '' && credenciais.senha != '') {
            let caminho = 'usuario/login';
    
            const dados = {
                usuario: credenciais.usuario,
                senha: credenciais.senha
            };
    
            const result = await login(dados, caminho);
    
            if (!result.success) {
                console.log("Não foi possível logar: " + result.error);
            } else {         
                setIsAuthenticated(true);
                setTipo(result.tipo);
                setUsuario(result.usuario);
                setNome(result.nome);
                if(result.tipo == 'aluno') {
                    setMatricula(result.matricula);
                }else {
                    setNumero_registro(result.numero_registro);
                }

                console.log("Logado com sucesso!");
                Alert.alert("Sucesso!", "Login efetuado com sucesso!");
            }
            
            /*
            function login(usuario, senha) {
                if(usuario == 'joedson' && senha == '123') {
                    setIsAuthenticated(true);
                    setTipo('aluno');
                }else {
                    console.log('Usuário e senha erradas');
                }
            };
            */
        }else {
            Alert.alert("Atenção!", "Por favor, preencha todos os campos!");
        }
        
        setVisible(false);
    };

    return (
        <View style={[styles.fundoTela, { backgroundColor: colors.background }]}>
            <Loading visible={visible}/>
            <Text style={[styles.titulo, { color: colors.text }]}>LOGIN</Text>

            <View>
                <TextInput label="Usuário" mode="flat" value={credenciais.usuario} onChangeText={(text) => setCredenciais({...credenciais, usuario: text})}
                           style={[styles.marginBottom, TemaPrincipal.inputPadrao]}/>

                <TextInput label="Senha" mode="flat" secureTextEntry value={credenciais.senha} onChangeText={(text) => setCredenciais({...credenciais, senha: text})}
                           style={[styles.marginBottom, TemaPrincipal.inputPadrao]}/>

                <Button mode="contained" onPress={logar} style={[TemaPrincipal.inputPadrao]}>
                    Entrar
                </Button>

                <Button onPress={() => { navigation.navigate('Cadastro'); }} theme={{ colors: { primary: "#fff" } }}>
                    Cadastrar
                </Button>

                <Button onPress={() => { navigation.navigate('Teste'); }} theme={{ colors: { primary: "#fff" } }}>
                    Recuperar Senha
                </Button>
            </View>
        </View>
    );
};

export default Login;
