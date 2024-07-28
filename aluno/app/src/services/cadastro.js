import * as Keychain from 'react-native-keychain';
import uuid from 'react-native-uuid';

async function storeData(nome, senha) {
    const newUuid = uuid.v4();

    try {
        await Keychain.setGenericPassword(`${nome}:${newUuid}`, senha);
        return { success: true };
    } catch (error) {
        console.error('Erro ao salvar dados', error);

        const errorMessage = error && error.message ? error.message : 'Erro desconhecido.';
        
        return { success: false, message: errorMessage };
    }
}

async function updateData(nome, uuidExistente, senha) {
  try {
      await Keychain.setGenericPassword(`${nome}:${uuidExistente}`, senha);
      return { success: true };
  } catch (error) {
      console.error('Erro ao editar dados', error);

      const errorMessage = error && error.message ? error.message : 'Erro desconhecido.';
      
      return { success: false, message: errorMessage };
  }
}

async function updateDataUUID(nome, senha) {
  const newUuid = uuid.v4();

  console.log('novo uuid na raíz: '+newUuid);

  try {
      await Keychain.setGenericPassword(`${nome}:${newUuid}`, senha);
      return { success: true };
  } catch (error) {
      console.error('Erro ao salvar dados', error);

      const errorMessage = error && error.message ? error.message : 'Erro desconhecido.';
      
      return { success: false, message: errorMessage };
  }
}

async function retrieveData() {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      const [nome, uuid] = credentials.username.split(':');
      console.log('Nome:'+nome+' UUID: '+uuid+" Senha: "+credentials.password);
      return { success: true, nome: nome, uuid: uuid, senha: credentials.password };
    }
  } catch (error) {
    console.error('Erro ao recuperar dados', error);
    
    return { success: false };
  }
  return null;
}

export const registroAluno = () => {
    return {
        fetchAluno: () => retrieveData(),
        createAluno: (nome, senha) => storeData(nome, senha),
        updateAluno: (nome, uuidExistente, senha) => updateData(nome, uuidExistente, senha),
        updateUUID: (nome, senha) => updateDataUUID(nome, senha),
      };
}