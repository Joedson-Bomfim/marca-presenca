import { Alert } from "react-native";
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import { closeDatabase } from '../database/database';
import {converteDataAmericanaParaBrasileira, obterDataHoraAtualParaNomeArquivo, formataNomeArquivo, fornataDataParaNomeArquivo } from './formatacao';

const generateXMLContent = (alunos) => {
    let xmlContent = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xmlContent += '<alunos>\n';

    alunos.forEach((aluno) => {
    xmlContent += `  <aluno>\n`;
    xmlContent += `    <nome>${aluno.nome}</nome>\n`;
    xmlContent += `    <matricula>${aluno.matricula}</matricula>\n`;
    xmlContent += `    <nome_disciplina>${aluno.nome_disciplina}</nome_disciplina>\n`;
    xmlContent += `    <codigo_disciplina>${aluno.codigo_disciplina}</codigo_disciplina>\n`;
    xmlContent += `    <data>${aluno.data}</data>\n`;
    xmlContent += `    <total_aulas>${aluno.quantidade_aulas_total}</total_aulas>\n`;
    xmlContent += `    <total_aulas_assistidas>${aluno.quantidade_aulas_assistidas}</total_aulas_assistidas>\n`;
    xmlContent += `    <situacao>${aluno.situacao}</situacao>\n`;
    xmlContent += `    <observacao>${aluno.observacao}</observacao>\n`;
    xmlContent += `  </aluno>\n`;
    });

    xmlContent += '</alunos>\n';
    return xmlContent;
};

const exportarEmXML = async (alunosPresenca, nome_disciplina, data_presenca, horario_inicio_aula, horario_fim_aula) => {
    nome_disciplinaFormatada = formataNomeArquivo(nome_disciplina);
    dataPresencaFormatada = fornataDataParaNomeArquivo(data_presenca);
    horario_inicio_aulaFormata = horario_inicio_aula.replace(':', '_')
    horario_fim_aulaFormata = horario_fim_aula.replace(':', '_')

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
        // Cria a pasta personalizada na raiz do armazenamento externo, se ela não existir
        const exists = await RNFS.exists(customDir);
        if (!exists) {
            await RNFS.mkdir(customDir);
        }

        const xmlContent = generateXMLContent(alunosPresenca);
        await RNFS.writeFile(filePath, xmlContent, 'utf8');
        Alert.alert(
            'Sucesso',
            'Arquivo XML salvo no diretório de Downloads! Deseja abrir a pasta de destino?',
            [
                { text: 'Não', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'Sim', onPress: async () => {
                    try {
                        closeDatabase();
                        // Tenta abrir a pasta de destino
                        await FileViewer.open(customDir);
                        console.log('Pasta aberta com sucesso!');
                    } catch (error) {
                        Alert.alert('Erro', 'Não foi possível abrir a pasta: ' + error.message);
                    }
                }},
            ],
            { cancelable: false }
        );
    } catch (err) {
        Alert.alert('Erro', err.message);
    }
};

export default exportarEmXML;