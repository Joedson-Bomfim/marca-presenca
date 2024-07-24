import { insertPresenca, insertMultiplePresencas, getPresenca, getProfessorById, truncatePresenca, deletePresencaById } from '../Model/PresencaModel';
import { dataHora, formataDataHoraPadraoAmericano } from '../services/formatacao';

const addPresenca = async (aluno_fk, aula_fk, data, quantidade_aulas_assistidas, observacao, situacao) => {
    let now = dataHora();
    let formattedDate = formataDataHoraPadraoAmericano(now);
    let criado_em = formattedDate;

    try {
        await insertPresenca(aluno_fk, aula_fk, data, quantidade_aulas_assistidas, observacao, situacao, criado_em);
        console.log('Presença adicionado');
    } catch (error) {
        console.error('Erro ao adicionar presença:', error);
    }
};

const addMultiplePresenca = async (aula_fk, data, presencas) => {
    let now = dataHora();
    let formattedDate = formataDataHoraPadraoAmericano(now);
    let criado_em = formattedDate;

    try {
        await insertMultiplePresencas(aula_fk, data, criado_em, presencas);
        console.log('Presença adicionado');
    } catch (error) {
        console.error('Erro ao adicionar presença:', error);
    }
};

const fetchPresenca = async () => {
    try {
        const presencas = await getPresenca();
        return presencas;
    } catch (error) {
        console.error('Erro ao listar presencas:', error.message || error);
        return [];
    }
};

const fetchProfessorById = async (id) => {
    try {
        const presenca = await getProfessorById(id);
        if (presenca) {
            return presenca;
        } else {
            throw new Error('Presença não encontrado');
        }
    } catch (error) {
        console.error('Erro ao pesquisar o presença pelo ID:', error);
        throw error;
    }
};

const cleanUpPresenca = async () => {
    try {
        await truncatePresenca();
        console.log('Tabela Professores truncada com sucesso');
    } catch (error) {
        console.error('Erro ao truncar tabela Professores:', error);
    }
};

const removePresencaById = async (id) => {
    console.log('Presença excluído com sucesso');
    try {
        await deletePresencaById(id);
        console.log('Presença apagado');
    } catch (error) {
        console.error('Erro ao adicionar presença:', error);
    }
};

export { addPresenca, addMultiplePresenca, fetchPresenca, fetchProfessorById, cleanUpPresenca, removePresencaById };
