import { Alert, Platform, PermissionsAndroid } from "react-native";
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import { closeDatabase } from '../database/database';
import {converteDataAmericanaParaBrasileira, obterDataHoraAtualParaNomeArquivo, formataNomeArquivo, fornataDataParaNomeArquivo } from './formatacao';

const escapeXML = (str) => {
    if (typeof str !== 'string') {
        return str; 
    }

    return str
    .replace(/&/g, '&amp;')    
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
};

const generateXMLContent = (alunos, professor) => {
    let xmlContent = '<?xml version="1.0" encoding="UTF-8"?>\n';

    xmlContent += '<registros>\n';

    xmlContent += `  <professor>\n`;
    xmlContent += `    <nome>${escapeXML(professor.nome)}</nome>\n`;
    xmlContent += `    <resgistro>${escapeXML(professor.numero_registro)}</resgistro>\n`;
    xmlContent += `  </professor>\n`;

    xmlContent += '<alunos>\n';

    alunos.forEach((aluno) => {
    xmlContent += `  <aluno>\n`;
    xmlContent += `    <nome>${escapeXML(aluno.nome)}</nome>\n`;
    xmlContent += `    <matricula>${escapeXML(aluno.matricula)}</matricula>\n`;
    xmlContent += `    <nome_disciplina>${escapeXML(aluno.nome_disciplina)}</nome_disciplina>\n`;
    xmlContent += `    <codigo_disciplina>${aluno.codigo_disciplina}</codigo_disciplina>\n`;
    xmlContent += `    <data>${escapeXML(aluno.data)}</data>\n`;
    xmlContent += `    <total_aulas>${aluno.quantidade_aulas_total}</total_aulas>\n`;
    xmlContent += `    <total_aulas_assistidas>${aluno.quantidade_aulas_assistidas}</total_aulas_assistidas>\n`;
    xmlContent += `    <situacao>${escapeXML(aluno.situacao)}</situacao>\n`;
    aluno.observacao ? xmlContent += `    <observacao>${escapeXML(aluno.observacao)}</observacao>\n` : '';
    xmlContent += `  </aluno>\n`;
    });

    xmlContent += '</alunos>\n';

    xmlContent += '</registros>\n';
    return xmlContent;
};

const exportarEmXML = async (alunosPresenca, professor, nome_disciplina, data_presenca, horario_inicio_aula, horario_fim_aula) => {
    let nome_disciplinaFormatada = formataNomeArquivo(nome_disciplina);
    let dataPresencaFormatada = fornataDataParaNomeArquivo(data_presenca);
    let horario_inicio_aulaFormata = horario_inicio_aula.replace(':', '_')
    let horario_fim_aulaFormata = horario_fim_aula.replace(':', '_')

    const downloadDir = RNFS.DownloadDirectoryPath;
    const customDir = `${downloadDir}/Lista Presenca CheckMate`;
    //Criei nomes únicos para os arquivos utilizando data e hora para não resultar em erros caso os arquivos sejam apagados
    const filePath = `${customDir}/${nome_disciplinaFormatada} Lista de chamada do dia ${dataPresencaFormatada} das ${horario_inicio_aulaFormata} as ${horario_fim_aulaFormata}--Data hora exportacao ${obterDataHoraAtualParaNomeArquivo()}.xml`;

    /* Caso eu precise formatar os dados
    const presencaFormatada = alunosPresenca.map(option => ({
        id: option.id,
        nome: option.nome,
        matricula: option.matricula,
        nome_disciplina: option.nome_disciplina,
        codigo_disciplina: option.codigo_disciplina,
        data: converteDataAmericanaParaBrasileira(option.data),
        quantidade_aulas_total: option.quantidade_aulas_total,
        quantidade_aulas_assistidas: option.quantidade_aulas_assistidas,
        situacao: option.situacao,
        observacao: option.observacao,
    }));
    */

    try {
        //Android 9 e inferior
        if (Platform.Version <= 28) {
            const granted = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              ]);
    
              permissionsGranted = Object.values(granted).every(
                (permission) => permission === PermissionsAndroid.RESULTS.GRANTED
              );
              
              if (!permissionsGranted) {
                  Alert.alert('Atenção','A permissão necessária não foi concedida');
                  return;
              }
        }
        
        // Cria a pasta personalizada na raiz do armazenamento externo, se ela não existir
        const exists = await RNFS.exists(customDir);
        if (!exists) {
            await RNFS.mkdir(customDir);
        }

        const xmlContent = generateXMLContent(alunosPresenca, professor);
        await RNFS.writeFile(filePath, xmlContent, 'utf8');
        Alert.alert(
            'Sucesso',
            'Arquivo XML salvo na pasta de Download/Lista Presenca CheckMate! Deseja abrir a pasta de destino?',
            [
                { text: 'Não', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'Sim', onPress: async () => {
                    try {
                        closeDatabase();
                        // Tenta abrir a pasta de destino
                        await FileViewer.open(customDir);
                        console.log('Pasta aberta com sucesso!');
                    } catch (error) {
                        console.log('Erro ao abrir a pasta:', error.message);
                        Alert.alert(
                            'Atenção',
                            'Não foi possível abrir a pasta pelo app CheckMate. Caso queira acessar a pasta por aqui, utilize um gerenciador de arquivos alternativo ou vá para a pasta Download/Lista Presenca CheckMate.',
                            [{ text: 'OK' }]
                        );
                    }
                }},
            ],
            { cancelable: false }
        );
    } catch (err) {
        console.log(err.message);
        Alert.alert('Erro', err.message);
    }
};

export default exportarEmXML;