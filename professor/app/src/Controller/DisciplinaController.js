import { insertDisciplina, updateDisciplina, getDisciplina, getDisciplinaProfessor, getProfessorById , truncateDisciplina, deleteDisciplinaById } from '../Model/DisciplinaModel';
import { dataHora, formataDataHoraPadraoAmericano } from '../services/formatacao';

const addDisciplina = async (professor_fk, nome, codigo, curso, complemento) => {
    let now = dataHora();
    let formattedDate = formataDataHoraPadraoAmericano(now);
    let criado_em = formattedDate;

    try {
        await insertDisciplina(professor_fk, nome, codigo, curso, complemento, criado_em);
        return { success: true };
    } catch (error) {
        const errorMessage = error && error.message ? error.message : 'Erro desconhecido.';
        
        return { success: false, message: errorMessage };
    }
};

const editDisciplina = async (id, professor_fk, nome, codigo, curso, complemento) => {
    let now = dataHora();
    let formattedDate = formataDataHoraPadraoAmericano(now);
    let atualizado_em = formattedDate;

    try {
        await updateDisciplina(id, professor_fk, nome, codigo, curso, complemento, atualizado_em);
        return { success: true };
    } catch (error) {
        const errorMessage = error && error.message ? error.message : 'Erro desconhecido.';
        
        return { success: false, message: errorMessage };
    }
};

const fetchDisciplina = async () => {
    try {
        const disciplinas = await getDisciplina();
        return disciplinas;
    } catch (error) {
        console.error('Erro ao listar disciplina:', error.message || error);
        return [];
    }
};

const fetchDisciplinaProfessor = async (id) => {
    try {
        const disciplinasProfessor = await getDisciplinaProfessor(id);
        return disciplinasProfessor;
    } catch (error) {
        console.error('Erro ao listar disciplina:', error.message || error);
        return [];
    }
};

const fetchProfessorById = async (id) => {
    try {
        const disciplina = await getProfessorById(id);
        if (disciplina) {
            return disciplina;
        } else {
            throw new Error('Disciplina não encontrado');
        }
    } catch (error) {
        console.error('Erro ao pesquisar o disciplina pelo ID:', error);
        throw error;
    }
};

const cleanUpDisciplina = async () => {
    try {
        await truncateDisciplina();
        console.log('Tabela Professores truncada com sucesso');
    } catch (error) {
        console.error('Erro ao truncar tabela Professores:', error);
    }
};

const removeDisciplinaById = async (id) => {
    console.log('Disciplina excluído com sucesso');
    try {
        await deleteDisciplinaById(id);
        console.log('Disciplina apagado');
    } catch (error) {
        console.error('Erro ao adicionar disciplina:', error);
    }
};

export { addDisciplina, editDisciplina, fetchDisciplina, fetchDisciplinaProfessor, fetchProfessorById, cleanUpDisciplina, removeDisciplinaById };
