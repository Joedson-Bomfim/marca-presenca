import { getTables, dropTable } from '../Model/databaseModel';
import { createProfessor } from '../Model/ProfessorModel';
import { createDisciplina } from '../Model/DisciplinaModel';
import { createAluno } from '../Model/AlunoModel';
import { createAlunoDisciplina } from '../Model/AlunoDisciplinaModel';
import { createAula } from '../Model/AulaModel';

const initializeDatabase = async () => {
    try {
        await createProfessor();
        await createDisciplina();
        await createAluno();
        await createAlunoDisciplina();
        await createAula();
        console.log('Banco de dados inicializado');
    } catch (error) {
        console.error('Erro ao inicializar banco de dados:', error);
    }
};

const fetchTabela = async () => {
    try {
        const tabelas = await getTables();
        return tabelas;
    } catch (error) {
        console.error('Erro ao listar tabelas:', error);
        return [];
    }
};

const deleteTabela = async (nome) => {
    try {
        const books = await dropTable(nome);
        return books;
    } catch (error) {
        console.error('Erro ao apagar tabela:', error);
        return [];
    }
};

/*
const UserStatusController = async () => {
    // Adicione aqui a lógica para verificar o status do usuário
};
*/

export { initializeDatabase, fetchTabela, deleteTabela };
