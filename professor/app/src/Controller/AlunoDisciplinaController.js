import { insertAlunoDisciplina, getAlunoDisciplin, getAlunoDisciplinaMarcaPresenca, getAlunoNaoEstaNestaDisciplina, getProfessorById, 
         truncateAlunoDisciplina, deleteAlunoDisciplinaById } from '../Model/AlunoDisciplinaModel';
import { dataHora, formataDataHoraPadraoAmericano } from '../services/formatacao';

const addAlunoDisciplina = async (aluno_fk, disciplina_fk) => {
    let now = dataHora();
    let formattedDate = formataDataHoraPadraoAmericano(now);
    let criado_em = formattedDate;

    try {
        await insertAlunoDisciplina(aluno_fk, disciplina_fk, criado_em);
        console.log('AlunoDisciplina adicionado');
        return { success: true };
    } catch (error) {
        console.error('Erro ao adicionar alunoDisciplina:', error);   
        const errorMessage = error && error.message ? error.message : 'Erro desconhecido.';
        
        return { success: false, message: errorMessage };
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

const fetchAlunoDisciplinaMarcaPresenca = async (disciplina_fk) => {
    try {
        const professores = await getAlunoDisciplinaMarcaPresenca(disciplina_fk);
        return professores;
    } catch (error) {
        console.error('Erro ao listar alunos:', error.message || error);
        return [];
    }
};

const fetchAlunoNaoEstaNestaDisciplina = async (disciplina_fk) => {
    try {
        const professores = await getAlunoNaoEstaNestaDisciplina(disciplina_fk);
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
        return { success: true };
    } catch (error) {
        console.error('Erro ao adicionar alunoDisciplina:', error);   
        const errorMessage = error && error.message ? error.message : 'Erro desconhecido.';
        
        return { success: false, message: errorMessage };
    }
};

export { addAlunoDisciplina, fetchAlunoDisciplina, fetchAlunoDisciplinaMarcaPresenca, fetchAlunoNaoEstaNestaDisciplina, fetchProfessorById,
         cleanUpAlunoDisciplina, removeAlunoDisciplinaById };
