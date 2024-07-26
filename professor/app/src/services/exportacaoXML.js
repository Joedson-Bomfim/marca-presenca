import { Alert } from "react-native";
import RNFS from 'react-native-fs';
import {converteDataAmericanaParaBrasileira, obterDataHoraAtualParaNomeArquivo } from './formatacao';

const downloadDir = RNFS.DownloadDirectoryPath;
const filePath = `${downloadDir}/Lista de chamada ${obterDataHoraAtualParaNomeArquivo()}.xml`;

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
    xmlContent += `    <total_aulas>${aluno.quantidade_aulas}</total_aulas>\n`;
    xmlContent += `    <total_aulas_assistidas>${aluno.quantidade_aulas_assistidas}</total_aulas_assistidas>\n`;
    xmlContent += `    <situacao>${aluno.situacao}</situacao>\n`;
    xmlContent += `    <observacao>${aluno.observacao}</observacao>\n`;
    xmlContent += `  </aluno>\n`;
    });

    xmlContent += '</alunos>\n';
    return xmlContent;
};

const exportarEmXML = async (alunosPresenca) => {
    const presencaFormatada = alunosPresenca.map(option => ({
        id: option.id,
        nome: option.nome,
        matricula: option.matricula,
        nome_disciplina: option.nome_disciplina,
        codigo_disciplina: option.codigo_disciplina,
        data: converteDataAmericanaParaBrasileira(option.data),
        quantidade_aulas: option.quantidade_aulas,
        quantidade_aulas_assistidas: option.quantidade_aulas_assistidas,
        situacao: option.situacao,
        observacao: option.observacao,
    }));

    try {
        const xmlContent = generateXMLContent(presencaFormatada);
    await RNFS.writeFile(filePath, xmlContent, 'utf8');
        Alert.alert('Sucesso', 'Arquivo XML salvo no diretório de Downloads!');
    } catch (err) {
        Alert.alert('Erro', err.message);
    }
};

export default exportarEmXML;