import openDatabase from '../database/database';
import { createTable, insertProfessor, getProfessor, getUserStatus, getProfessorById , truncateProfessor, deleteProfessorById } from '../Model/ProfessorModel';

const initializeDatabase = async () => {
    try {
        await createTable();
        console.log('Database initialized');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
};

const enableForeignKeys = () => {
    return openDatabase().then((db) => {
        return db.transaction((tx) => {
            return tx.executeSql('PRAGMA foreign_keys = ON;')
                .then(() => Promise.resolve())
                .catch((error) => {
                    console.error('Error setting foreign keys:', error);
                    return Promise.reject(error);
                });
        });
    });
};

const addProfessor = async (nome, numero_registro, criado_em) => {
    try {
        await insertProfessor(nome, numero_registro, criado_em);
        console.log('Professor adicionado');
    } catch (error) {
        console.error('Erro ao adicionar professor:', error);
    }
};

const fetchProfessor = async () => {
    try {
        const books = await getProfessor();
        return books;
    } catch (error) {
        console.error('Erro ao listar professor:', error);
        return [];
    }
};

const UserStatusController = async () => {
    try {
        const professorStatus = await getUserStatus();
        return professorStatus;
    } catch (error) {
        console.error('Erro ao encontrar um professor:', error);
        return [];
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
        console.error('Erro ao adicionar professor:', error);
    }
};

export { initializeDatabase, enableForeignKeys, addProfessor, fetchProfessor, UserStatusController, fetchProfessorById, cleanUpProfessor, removeProfessorById };
