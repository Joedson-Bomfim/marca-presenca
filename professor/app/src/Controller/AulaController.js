import { insertAula, updateAula, getAula, getAulaDisciplina, getListaAulaDisciplina, getProfessorById, truncateAula, deleteAulaById } from '../Model/AulaModel';
import { dataHora, formataDataHoraPadraoAmericano } from '../services/formatacao';


const addAula = async (disciplina_fk, dia_semana, local, numero_aulas, horario_inicio_aula, horario_fim_aula) => {
    let now = dataHora();
    let formattedDate = formataDataHoraPadraoAmericano(now);
    let criado_em = formattedDate;

    try {
        await insertAula(disciplina_fk, dia_semana, local, numero_aulas, horario_inicio_aula, horario_fim_aula, criado_em);
        console.log('Disciplina adicionada');
        return { success: true };
    } catch (error) {
        console.error('Erro ao adicionar aula:', error);
        const errorMessage = error && error.message ? error.message : 'Erro desconhecido.';
        
        return { success: false, message: errorMessage };
    }
};

const editAula = async (id, dia_semana, local, numero_aulas, horario_inicio_aula, horario_fim_aula) => {
    let now = dataHora();
    let formattedDate = formataDataHoraPadraoAmericano(now);
    let atualizado_em = formattedDate;

    try {
        await updateAula(id, dia_semana, local, numero_aulas, horario_inicio_aula, horario_fim_aula, atualizado_em);
        return { success: true };
    } catch (error) {
        const errorMessage = error && error.message ? error.message : 'Erro desconhecido.';
        
        return { success: false, message: errorMessage };
    }
};

const fetchAula = async () => {
    try {
        const disciplinas = await getAula();
        return disciplinas;
    } catch (error) {
        console.error('Erro ao listar aulas:', error.message || error);
        return [];
    }
};

const fetchAulaDisciplina = async (id) => {
    try {
        const disciplinas = await getAulaDisciplina(id);
        return disciplinas;
    } catch (error) {
        console.error('Erro ao listar aulas:', error.message || error);
        return [];
    }
};

const fetchProfessorById = async (id) => {
    try {
        const aula = await getProfessorById(id);
        if (aula) {
            return aula;
        } else {
            throw new Error('Disciplina não encontrado');
        }
    } catch (error) {
        console.error('Erro ao pesquisar o aula pelo ID:', error);
        throw error;
    }
};

const cleanUpAula = async () => {
    try {
        await truncateAula();
        console.log('Tabela Professores truncada com sucesso');
    } catch (error) {
        console.error('Erro ao truncar tabela Professores:', error);
    }
};

const removeAulaById = async (id) => {
    console.log('Disciplina excluído com sucesso');
    try {
        await deleteAulaById(id);
        console.log('Disciplina apagado');
        return { success: true };
    } catch (error) {
        console.error('Erro ao remover aula:', error);
        const errorMessage = error && error.message ? error.message : 'Erro desconhecido.';
        
        return { success: false, message: errorMessage };
    }
};

export { addAula, editAula, fetchAula, fetchAulaDisciplina, fetchProfessorById, cleanUpAula, removeAulaById };
