import { openDatabase } from '../database/database';

const createAluno = () => {
    return openDatabase().then((db) => {
        return db.transaction((tx) => {
            return tx.executeSql(`
                CREATE TABLE IF NOT EXISTS Alunos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT,
                matricula TEXT UNIQUE,
                beacon_id UNIQUE, 
                criado_em TEXT, 
                atualizado_em TEXT
                )`,
                [],
                () => console.log('Table Alunos criada com sucesso'),
                (error) => console.error('Error creating table:', error)
            );
        });
    });
};

const insertAluno = (nome, matricula, beacon_id, criado_em) => {
    return openDatabase().then((db) => {
        return db.transaction((tx) => {
            return tx.executeSql(
                'INSERT INTO Alunos (nome, matricula, beacon_id, criado_em) VALUES (?, ?, ?, ?)',
                [nome, matricula, beacon_id, criado_em],
                () => console.log('ALuno cadastrado com sucesso'),
                (error) => console.error('Erro ao cadastrar ALuno:', error)
            );
        });
    });
};

const getAluno = () => {
    return new Promise((resolve, reject) => {
        openDatabase().then((db) => {
            return db.transaction((tx) => {
                return tx.executeSql(
                    'SELECT * FROM Alunos',
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
                    'SELECT * FROM Alunos WHERE id = ?',
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

const truncateAluno = () => {
    return openDatabase().then((db) => {
        return db.transaction((tx) => {
            return tx.executeSql(
                'DELETE FROM Alunos',
                [],
                () => {
                    console.log('Tabela Alunos truncada com sucesso');
                    // Após truncar, resetar o autoincrement
                    tx.executeSql(
                        'UPDATE SQLITE_SEQUENCE SET seq = 0 WHERE name = "Alunos"',
                        [],
                        () => console.log('Sequência de autoincrement reiniciada com sucesso'),
                        (error) => console.error('Erro ao reiniciar sequência de autoincrement:', error)
                    );
                },
                () => console.log('Tabela Alunos truncada com sucesso'),
                (error) => console.error('Erro ao truncar tabela Alunos:', error)
            );
        });
    });
};

const deleteAlunoById = (id) => {
    return openDatabase().then((db) => {
        return db.transaction((tx) => {
            return tx.executeSql(
                'DELETE FROM Alunos WHERE id = ?',
                [id],
                () => console.log('ALuno excluído com sucesso'),
                (error) => console.error('Erro ao excluir ALuno:', error)
            );
        });
    });
};

export { createAluno, insertAluno, getAluno, getProfessorById, truncateAluno, deleteAlunoById };
