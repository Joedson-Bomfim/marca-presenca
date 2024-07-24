import { insertAluno, updateAluno, getAluno, getProfessorById, truncateAluno, deleteAlunoById } from '../Model/AlunoModel';
import { dataHora, formataDataHoraPadraoAmericano } from '../services/formatacao';

const addAluno = async (nome, matricula, beacon_id) => {
    let now = dataHora();
    let formattedDate = formataDataHoraPadraoAmericano(now);
    let criado_em = formattedDate;

    try {
        await insertAluno(nome, matricula, beacon_id, criado_em);
        console.log('Aluno adicionado');
    } catch (error) {
        console.error('Erro ao adicionar aluno:', error);
    }
};

const editAluno = async (id, nome, matricula, beacon_id) => {
    let now = dataHora();
    let formattedDate = formataDataHoraPadraoAmericano(now);
    let atualizado_em = formattedDate;

    try {
        await updateAluno(id, nome, matricula, beacon_id, atualizado_em);
        console.log('Aluno atualizado');
    } catch (error) {
        console.error('Erro ao atualizar aluno:', error);
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
    } catch (error) {
        console.error('Erro ao adicionar aluno:', error);
    }
};

export { addAluno, editAluno, fetchAluno, fetchProfessorById, cleanUpAluno, removeAlunoById };
