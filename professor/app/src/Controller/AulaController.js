import { insertAula, getAula, getAulaDisciplina, getProfessorById, truncateAula, deleteAulaById } from '../Model/AulaModel';
import { dataHora, formataDataHoraPadraoAmericano } from '../services/formatacao';


const addAula = async (disciplina_fk, dia_semana, local, numero_aulas, horario_inicio_aula, horario_fim_aula) => {
    let now = dataHora();
    let formattedDate = formataDataHoraPadraoAmericano(now);
    let criado_em = formattedDate;

    try {
        await insertAula(disciplina_fk, dia_semana, local, numero_aulas, horario_inicio_aula, horario_fim_aula, criado_em);
        console.log('Disciplina adicionada');
    } catch (error) {
        console.error('Erro ao adicionar aula:', error);
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

const removeDisciplinaById = async (id) => {
    console.log('Disciplina excluído com sucesso');
    try {
        await deleteAulaById(id);
        console.log('Disciplina apagado');
    } catch (error) {
        console.error('Erro ao adicionar aula:', error);
    }
};

export { addAula, fetchAula, fetchAulaDisciplina, fetchProfessorById, cleanUpAula, removeDisciplinaById };
