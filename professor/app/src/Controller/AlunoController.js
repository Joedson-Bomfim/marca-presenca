import { insertAluno, updateAluno, getAluno, getAlunoProfessor, getProfessorById, truncateAluno, deleteAlunoById } from '../Model/AlunoModel';
import { dataHora, formataDataHoraPadraoAmericano } from '../services/formatacao';

const addAluno = async (professor_fk, nome, matricula, beacon_id) => {
    let now = dataHora();
    let formattedDate = formataDataHoraPadraoAmericano(now);
    let criado_em = formattedDate;

    try {
        await insertAluno(professor_fk, nome, matricula, beacon_id, criado_em);
        return { success: true };

    } catch (error) {
        const errorMessage = error && error.message ? error.message : 'Erro desconhecido.';
        if (errorMessage.includes('UNIQUE constraint failed')) {
            if (errorMessage.includes('matricula')) {
                return { success: false, message: 'Esta matrícula já pertence a outro aluno' };
            } else if (errorMessage.includes('beacon_id')) {
                return { success: false, message: 'Este Beacon ID já foi cadastrado' };
            } else {
                return { success: false, message: 'Houve um erro ao tentar adicionar o aluno' };
            }
        }
        return { success: false, message: errorMessage };
    }
};

const editAluno = async (id, nome, matricula, beacon_id) => {
    let now = dataHora();
    let formattedDate = formataDataHoraPadraoAmericano(now);
    let atualizado_em = formattedDate;

    try {
        await updateAluno(id, nome, matricula, beacon_id, atualizado_em);
        return { success: true };
    } catch (error) {
        const errorMessage = error && error.message ? error.message : 'Erro desconhecido.';
        if (errorMessage.includes('UNIQUE constraint failed')) {
            if (errorMessage.includes('matricula')) {
                return { success: false, message: 'Esta matrícula já pertence a outro aluno' };
            } else if (errorMessage.includes('beacon_id')) {
                return { success: false, message: 'Este Beacon ID já foi cadastrado' };
            } else {
                return { success: false, message: 'Houve um erro ao tentar atualizar o aluno' };
            }
        }
        return { success: false, message: errorMessage };
    }
};

const fetchAluno = async () => {
    try {
        const professores = await getAluno();
        return professores;
    } catch (error) {
        console.error('Erro ao listar alunos:', error.message || error);
        return [];
    }
};

const fetchAlunoProfessor = async (professor_fk) => {
    try {
        const professores = await getAlunoProfessor(professor_fk);
        return professores;
    } catch (error) {
        console.error('Erro ao listar alunos:', error.message || error);
        return [];
    }
};

const fetchProfessorById = async (id) => {
    try {
        const aluno = await getProfessorById(id);
        if (aluno) {
            return aluno;
        } else {
            throw new Error('Aluno não encontrado');
        }
    } catch (error) {
        console.error('Erro ao pesquisar o aluno pelo ID:', error);
        throw error;
    }
};

const cleanUpAluno = async () => {
    try {
        await truncateAluno();
        console.log('Tabela Professores truncada com sucesso');
    } catch (error) {
        console.error('Erro ao truncar tabela Professores:', error);
    }
};

const removeAlunoById = async (id) => {
    console.log('Aluno excluído com sucesso');
    try {
        await deleteAlunoById(id);
        console.log('Aluno apagado');
        return { success: true };
    } catch (error) {
        console.error('Erro ao adicionar aluno:', error);
        const errorMessage = error && error.message ? error.message : 'Erro desconhecido.';
        
        return { success: false, message: errorMessage };
    }
};

export { addAluno, editAluno, fetchAluno, fetchAlunoProfessor, fetchProfessorById, cleanUpAluno, removeAlunoById };
