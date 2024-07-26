import { insertProfessor, updateProfessor, getProfessor, getPrimeiroProfessor, getUserStatus, getProfessorById , truncateProfessor, deleteProfessorById } from '../Model/ProfessorModel';
import { dataHora, formataDataHoraPadraoAmericano } from '../services/formatacao';

const addProfessor = async (nome, numero_registro) => {
    let now = dataHora();
    let formattedDate = formataDataHoraPadraoAmericano(now);
    let criado_em = formattedDate;

    try {
        const professorId = await insertProfessor(nome, numero_registro, criado_em);
        console.log('Professor adicionado, ID: ' + professorId);
        return { success: true, message: professorId };
    } catch (error) {
        console.error('Erro ao adicionar professor:', error);
        const errorMessage = error && error.message ? error.message : 'Erro desconhecido.';
        return { success: false, message: errorMessage };
    }
};

const editProfessor = async (id, nome, numero_registro) => {
    let now = dataHora();
    let formattedDate = formataDataHoraPadraoAmericano(now);
    let atualizado_em = formattedDate;

    try {
        await updateProfessor(id, nome, numero_registro, atualizado_em);
        return { success: true };
    } catch (error) {
        const errorMessage = error && error.message ? error.message : 'Erro desconhecido.';
        
        return { success: false, message: errorMessage };
    }
};

const fetchProfessor = async () => {
    try {
        const professores = await getProfessor();
        return professores;
    } catch (error) {
        console.error('Erro ao listar professor:', error.message || error);
        return [];
    }
};

const fetchPrimeiroProfessor = async () => {
    try {
        const professor = await getPrimeiroProfessor();
        if (professor) {
            console.log('Dados do primeiro professor:', professor);
            return professor; // Retorna o objeto do primeiro professor encontrado
        } else {
            console.log('Nenhum professor encontrado.');
            return null; // Retorna null se nenhum professor for encontrado
        }
    } catch (error) {
        console.error('Erro ao listar professor:', error.message || error);
        return null; // Retorna null se houver um erro
    }
};

const fetchProfessorById = async (id) => {
    try {
        const professor = await getProfessorById(id);
        if (professor) {
            return professor;
        } else {
            throw new Error('Professor não encontrado');
        }
    } catch (error) {
        console.error('Erro ao pesquisar o professor pelo ID:', error);
        throw error;
    }
};

const cleanUpProfessor = async () => {
    try {
        await truncateProfessor();
        console.log('Tabela Professores truncada com sucesso');
    } catch (error) {
        console.error('Erro ao truncar tabela Professores:', error);
    }
};

const removeProfessorById = async (id) => {
    console.log('Professor excluído com sucesso');
    try {
        await deleteProfessorById(id);
        console.log('Professor apagado');
    } catch (error) {
        console.error('Erro ao Remover professor:', error);
    }
};

export { addProfessor, editProfessor, fetchProfessor, fetchPrimeiroProfessor, fetchProfessorById, cleanUpProfessor, removeProfessorById };
