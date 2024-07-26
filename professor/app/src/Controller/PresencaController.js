import { insertPresenca, updateAluno, insertMultiplePresencas, getPresenca, getPresencaByAula, getGrupoPresenca, getProfessorById, truncatePresenca, deletePresencaById } from '../Model/PresencaModel';
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

const editPresenca = async (id, quantidade_aulas_assistidas, observacao, situacao) => {
    let now = dataHora();
    let formattedDate = formataDataHoraPadraoAmericano(now);
    let atualizado_em = formattedDate;

    try {
        await updateAluno(id, quantidade_aulas_assistidas, observacao, situacao, atualizado_em);
        console.log('Presença adicionado');
        return { success: true };
    } catch (error) {
        console.error('Erro ao adicionar presença:', error);
        const errorMessage = error && error.message ? error.message : 'Erro desconhecido.';
        
        return { success: false, message: errorMessage };
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

const fetchPresencaByAula = async (aula_id, data_presenca) => {
    try {
        const presencas = await getPresencaByAula(aula_id, data_presenca);
        return presencas;
    } catch (error) {
        console.error('Erro ao listar presencas:', error.message || error);
        return [];
    }
};

const fetchGrupoPresenca = async (disciplina_id) => {
    try {
        const presencas = await getGrupoPresenca(disciplina_id);
        console.log(presencas)
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

export { addPresenca, editPresenca, addMultiplePresenca, fetchPresenca, fetchPresencaByAula, fetchGrupoPresenca, fetchProfessorById, cleanUpPresenca, removePresencaById };
