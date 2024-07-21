import { insertAlunoDisciplina, getAlunoDisciplin, getProfessorById, truncateAlunoDisciplina, deleteAlunoDisciplinaById } from '../Model/AlunoDisciplinaModel';
import { dataHora, formataDataHoraPadraoAmericano } from '../services/formatacao';

const addAlunoDisciplina = async (aluno_fk, disciplina_fk) => {
    let now = dataHora();
    let formattedDate = formataDataHoraPadraoAmericano(now);
    let criado_em = formattedDate;

    try {
        await insertAlunoDisciplina(aluno_fk, disciplina_fk, criado_em);
        console.log('AlunoDisciplina adicionado');
    } catch (error) {
        console.error('Erro ao adicionar alunoDisciplina:', error);
    }
};

const fetchAlunoDisciplina = async () => {
    try {
        const professores = await getAlunoDisciplin();
        return professores;
    } catch (error) {
        console.error('Erro ao listar alunos:', error.message || error);
        return [];
    }
};

const fetchProfessorById = async (id) => {
    try {
        const alunoDisciplina = await getProfessorById(id);
        if (alunoDisciplina) {
            return alunoDisciplina;
        } else {
            throw new Error('AlunoDisciplina não encontrado');
        }
    } catch (error) {
        console.error('Erro ao pesquisar o alunoDisciplina pelo ID:', error);
        throw error;
    }
};

const cleanUpAlunoDisciplina = async () => {
    try {
        await truncateAlunoDisciplina();
        console.log('Tabela Professores truncada com sucesso');
    } catch (error) {
        console.error('Erro ao truncar tabela Professores:', error);
    }
};

const removeAlunoDisciplinaById = async (id) => {
    console.log('AlunoDisciplina excluído com sucesso');
    try {
        await deleteAlunoDisciplinaById(id);
        console.log('AlunoDisciplina apagado');
    } catch (error) {
        console.error('Erro ao apagar alunoDisciplina:', error);
    }
};

export { addAlunoDisciplina, fetchAlunoDisciplina, fetchProfessorById, cleanUpAlunoDisciplina, removeAlunoDisciplinaById };
