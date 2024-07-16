import { Alert } from "react-native";
import config from '../config/config';

const cadastro = async (dados, caminho) => {
    try {
        let reqs = await fetch(`${config.urlRootNode}` + caminho, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dados)
        });

        const data = await reqs.json();

        if (data.error) {
            throw new Error(data.message);
        }

        console.log('cadastro efetuado com sucesso');

        return { success: true, message: data.message, tipo: data.tipo };
    } catch (error) {
        console.error(error);
        return { success: false, error: error.message };
    }
};

export { cadastro };