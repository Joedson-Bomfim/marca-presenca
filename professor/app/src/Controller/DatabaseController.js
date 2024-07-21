import { getTableNames, dropTable } from '../Model/databaseModel';
import { createProfessor } from '../Model/ProfessorModel';
import { createDisciplina } from '../Model/DisciplinaModel';
//import { createAlunoTable } from '../models/AlunoModel';

const initializeDatabase = async () => {
    try {
        await createProfessor();
        await createDisciplina();
        // Adicione aqui chamadas para criar outras tabelas conforme necessário
        console.log('Banco de dados inicializado');
    } catch (error) {
        console.error('Erro ao inicializar banco de dados:', error);
    }
};

const fetchTabela = async () => {
    try {
        const tabelas = await getTableNames();
        return tabelas;
    } catch (error) {
        console.error('Erro ao listar professor:', error);
        return [];
    }
};

const deleteTabela = async (nome) => {
    try {
        const books = await dropTable(nome);
        return books;
    } catch (error) {
        console.error('Erro ao listar professor:', error);
        return [];
    }
};

/*
const UserStatusController = async () => {
    // Adicione aqui a lógica para verificar o status do usuário
};
*/

export { initializeDatabase, fetchTabela, deleteTabela };
