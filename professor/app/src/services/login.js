import config from '../config/config';
//import { TextInput, Button, useTheme, Dialog } from "react-native-paper";

const login = async (dados, caminho) => {
    try {
        let reqs = await fetch(`${config.urlRootNode}`+caminho, {
            method: 'POST',
            headers:{
                'Accept' : 'application/json',
                'Content-Type' : 'application/json',
            },          
            body: JSON.stringify(dados)
        })

        const data = await reqs.json();

        if (data.error) {
            throw new Error(data.message);
        }

        console.log('login efetuado com sucesso');

        let informacoesAdicionais = {};
        if(data.tipo == 'aluno') {
            informacoesAdicionais = {
                matricula: data.matricula
            };
        }else {
            informacoesAdicionais = {
                numero_registro: data.numero_registro
            };
        }

        return { success: true, tipo: data.tipo, usuario: data.usuario, nome: data.nome, ...informacoesAdicionais };
    } catch (error) {
        console.error(error);
        return { success: false, error: error.message };
    }
};

export { login };