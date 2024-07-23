import { insertDisciplina, getDisciplina, getDisciplinaProfessor, getProfessorById , truncateDisciplina, deleteDisciplinaById } from '../Model/DisciplinaModel';


const addDisciplina = async (professor_fk, nome, codigo, curso, complemento, criado_em) => {
    try {
        await insertDisciplina(professor_fk, nome, codigo, curso, complemento, criado_em);
        console.log('Disciplina adicionada');
    } catch (error) {
        console.error('Erro ao adicionar disciplina:', error);
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

export { addDisciplina, fetchDisciplina, fetchDisciplinaProfessor, fetchProfessorById, cleanUpDisciplina, removeDisciplinaById };
