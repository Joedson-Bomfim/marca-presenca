import { insertPresenca, updatePresencaAluno, updateGrupoPresenca, insertMultiplePresencas, getPresenca, getPresencaByAula, 
        getGrupoPresenca, getTodosGrupoPresenca, getProfessorById, truncatePresenca, deletePresencaById, deleteGrupoPresenca } from '../Model/PresencaModel';
import { dataHora, formataDataHoraPadraoAmericano } from '../services/formatacao';

const addPresenca = async (aluno_fk, aula_fk, data, quantidade_aulas_assistidas, quantidade_aulas_total, observacao, situacao) => {
    let now = dataHora();
    let formattedDate = formataDataHoraPadraoAmericano(now);
    let criado_em = formattedDate;

    try {
        await insertPresenca(aluno_fk, aula_fk, data, quantidade_aulas_assistidas, quantidade_aulas_total, observacao, situacao, criado_em);
        console.log('Presença adicionado');
    } catch (error) {
        console.error('Erro ao adicionar presença:', error);
    }
};

const editPresenca = async (id, quantidade_aulas_assistidas, observacao, situacao) => {
    let now = dataHora();
    let formattedDate = formataDataHoraPadraoAmericano(now);
    let atualizado_em = formattedDate;

    try {
        await updatePresencaAluno(id, quantidade_aulas_assistidas, observacao, situacao, atualizado_em);
        console.log('Presença atualizada');
        return { success: true };
    } catch (error) {
        console.error('Erro ao atualizar presença:', error);
        const errorMessage = error && error.message ? error.message : 'Erro desconhecido.';
        
        return { success: false, message: errorMessage };
    }
};

const editGrupoPresenca = async (aula_fk, data_antiga, data_form, quantidade_aulas) => {
    let now = dataHora();
    let formattedDate = formataDataHoraPadraoAmericano(now);
    let atualizado_em = formattedDate;

    try {
        await updateGrupoPresenca(aula_fk, data_antiga, data_form, quantidade_aulas, atualizado_em);
        console.log('Presenças atualizadas');
        return { success: true };
    } catch (error) {
        console.error('Erro ao atualizar presenças:', error);
        const errorMessage = error && error.message ? error.message : 'Erro desconhecido.';
        
        return { success: false, message: errorMessage };
    }
};

const addMultiplePresenca = async (aula_fk, data, presencas) => {
    let now = dataHora();
    let formattedDate = formataDataHoraPadraoAmericano(now);
    let criado_em = formattedDate;

    try {
        await insertMultiplePresencas(aula_fk, data, criado_em, presencas);
        console.log('Presença adicionado');
    } catch (error) {
        console.error('Erro ao adicionar presença:', error);
    }
};

const fetchPresenca = async () => {
    try {
        const presencas = await getPresenca();
        return presencas;
    } catch (error) {
        console.error('Erro ao listar presencas:', error.message || error);
        return [];
    }
};

const fetchPresencaByAula = async (aula_id, data_presenca) => {
    try {
        const presencas = await getPresencaByAula(aula_id, data_presenca);
        return presencas;
    } catch (error) {
        console.error('Erro ao listar presencas:', error.message || error);
        return [];
    }
};

const fetchGrupoPresenca = async (disciplina_id) => {
    try {
        const presencas = await getGrupoPresenca(disciplina_id);
        return presencas;
    } catch (error) {
        console.error('Erro ao listar presencas:', error.message || error);
        return [];
    }
};
const fetchTodosGrupoPresenca = async () => {
    try {
        const presencas = await getTodosGrupoPresenca();
        return presencas;
    } catch (error) {
        console.error('Erro ao listar presencas:', error.message || error);
        return [];
    }
};

const fetchProfessorById = async (id) => {
    try {
        const presenca = await getProfessorById(id);
        if (presenca) {
            return presenca;
        } else {
            throw new Error('Presença não encontrado');
        }
    } catch (error) {
        console.error('Erro ao pesquisar o presença pelo ID:', error);
        throw error;
    }
};

const cleanUpPresenca = async () => {
    try {
        await truncatePresenca();
        console.log('Tabela Professores truncada com sucesso');
    } catch (error) {
        console.error('Erro ao truncar tabela Professores:', error);
    }
};

const removePresencaById = async (id) => {
    console.log('Presença excluído com sucesso');
    try {
        await deletePresencaById(id);
        console.log('Presença apagado');
    } catch (error) {
        console.error('Erro ao adicionar presença:', error);
    }
};

const removeGrupoPresenca = async (aula_fk, data) => {
    console.log('Presença excluído com sucesso');
    try {
        await deleteGrupoPresenca(aula_fk, data);
        console.log('Presença apagado');
        return { success: true };
    } catch (error) {
        console.error('Erro ao apagar presença:', error);
        const errorMessage = error && error.message ? error.message : 'Erro desconhecido.';
        
        return { success: false, message: errorMessage };
    }
};

export { addPresenca, editPresenca, editGrupoPresenca, addMultiplePresenca, fetchPresenca, fetchPresencaByAula, 
         fetchGrupoPresenca, fetchTodosGrupoPresenca, fetchProfessorById, cleanUpPresenca, removePresencaById, removeGrupoPresenca };
