import { openDatabase } from '../database/database';

const createAula = () => {
    return openDatabase().then((db) => {
        return db.transaction((tx) => {
            return tx.executeSql(`
                CREATE TABLE IF NOT EXISTS Aulas (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    disciplina_fk INTEGER,
                    dia_semana TEXT,
                    local TEXT,
                    quantidade_aulas INTEGER,
                    horario_inicio_aula TEXT,
                    horario_fim_aula TEXT,
                    criado_em TEXT,
                    atualizado_em TEXT,
                    FOREIGN KEY (disciplina_fk) REFERENCES Aulas(id)
                )`,
                [],
                () => console.log('Table Aulas criada com sucesso'),
                (error) => console.error('Error creating table:', error)
            );
        });
    });
};

const insertAula = (disciplina_fk, dia_semana, local, quantidade_aulas, horario_inicio_aula, horario_fim_aula, criado_em) => {
    return openDatabase().then((db) => {
        return db.transaction((tx) => {
            return tx.executeSql(
                'INSERT INTO Aulas (disciplina_fk, dia_semana, local, quantidade_aulas, horario_inicio_aula, horario_fim_aula, criado_em) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [disciplina_fk, dia_semana, local, quantidade_aulas, horario_inicio_aula, horario_fim_aula, criado_em],
                () => console.log('Aula cadastrado com sucesso'),
                (error) => console.error('Erro ao cadastrar Aula:', error)
            );
        });
    });
};

const getAula = () => {
    return new Promise((resolve, reject) => {
        openDatabase().then((db) => {
            return db.transaction((tx) => {
                return tx.executeSql(
                    'SELECT * FROM Aulas',
                    [],
                    (tx, results) => {
                        const rows = results.rows.raw(); // raw() returns an array
                        resolve(rows);
                    },
                    (error) => reject(error)
                );
            });
        });
    });
};

const getProfessorById = (id) => {
    return new Promise((resolve, reject) => {
        openDatabase().then((db) => {
            return db.transaction((tx) => {
                return tx.executeSql(
                    'SELECT * FROM Aulas WHERE id = ?',
                    [id],
                    (tx, results) => {
                        const rows = results.rows.raw();
                        // Verifica se há resultados e retorna o primeiro (ou nenhum se não houver)
                        resolve(rows.length > 0 ? rows[0] : null);
                    },
                    (error) => reject(error)
                );
            });
        });
    });
};

const truncateAula = () => {
    return openDatabase().then((db) => {
        return db.transaction((tx) => {
            return tx.executeSql(
                'DELETE FROM Aulas',
                [],
                () => {
                    console.log('Tabela Aulas truncada com sucesso');
                    // Após truncar, resetar o autoincrement
                    tx.executeSql(
                        'UPDATE SQLITE_SEQUENCE SET seq = 0 WHERE name = "Aulas"',
                        [],
                        () => console.log('Sequência de autoincrement reiniciada com sucesso'),
                        (error) => console.error('Erro ao reiniciar sequência de autoincrement:', error)
                    );
                },
                () => console.log('Tabela Aulas truncada com sucesso'),
                (error) => console.error('Erro ao truncar tabela Aulas:', error)
            );
        });
    });
};

const deleteAulaById = (id) => {
    return openDatabase().then((db) => {
        return db.transaction((tx) => {
            return tx.executeSql(
                'DELETE FROM Aulas WHERE id = ?',
                [id],
                () => console.log('Aula excluído com sucesso'),
                (error) => console.error('Erro ao excluir Aula:', error)
            );
        });
    });
};

export { createAula, insertAula, getAula, getProfessorById, truncateAula, deleteAulaById };
