import { openDatabase } from '../database/database';

const createAluno = () => {
    return openDatabase().then((db) => {
        return db.transaction((tx) => {
            return tx.executeSql(`
                CREATE TABLE IF NOT EXISTS Alunos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                professor_fk INTEGER,
                nome TEXT,
                matricula TEXT UNIQUE,
                beacon_id UNIQUE, 
                criado_em TEXT, 
                atualizado_em TEXT,
                FOREIGN KEY (professor_fk) REFERENCES Professores(id)
                )`,
                [],
                () => console.log('Table Alunos criada com sucesso'),
                (error) => console.error('Error creating table:', error)
            );
        });
    });
};

const insertAluno = (professor_fk, nome, matricula, beacon_id, criado_em) => {
    matricula = matricula ? matricula : null;
    beacon_id = beacon_id ? beacon_id : null;
    return openDatabase().then((db) => {
        return db.transaction((tx) => {
            return tx.executeSql(
                'INSERT INTO Alunos (professor_fk, nome, matricula, beacon_id, criado_em) VALUES (?, ?, ?, ?, ?)',
                [professor_fk, nome, matricula, beacon_id, criado_em],
                () => console.log('Aluno cadastrado com sucesso'),
                (error) => console.error('Erro ao cadastrar Aluno:', error)
            );
        });
    });
};

const updateAluno = (id, nome, matricula, beacon_id, atualizado_em) => {
    matricula = matricula ? matricula : null;
    beacon_id = beacon_id ? beacon_id : null;
    return openDatabase().then((db) => {
        return db.transaction((tx) => {
            return tx.executeSql(
                'UPDATE Alunos SET nome = ?, matricula = ?, beacon_id = ?, atualizado_em = ? WHERE id = ?',
                [nome, matricula, beacon_id, atualizado_em, id],
                () => console.log('Aluno atualizado com sucesso'),
                (error) => console.error('Erro ao atualizar Aluno:', error)
            );
        });
    });
};

const getAluno = () => {
    return new Promise((resolve, reject) => {
        openDatabase().then((db) => {
            return db.transaction((tx) => {
                return tx.executeSql(
                    'SELECT * FROM Alunos ORDER BY nome ASC',
                    [],
                    (tx, results) => {
                        const rows = results.rows.raw(); 
                        resolve(rows);
                    },
                    (error) => reject(error)
                );
            });
        });
    });
};

const getAlunoProfessor = (professor_fk) => {
    return new Promise((resolve, reject) => {
        openDatabase().then((db) => {
            return db.transaction((tx) => {
                return tx.executeSql(
                    'SELECT * FROM Alunos WHERE professor_fk = ? ORDER BY nome ASC',
                    [professor_fk],
                    (tx, results) => {
                        const rows = results.rows.raw(); 
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
                () => console.log('Aluno excluído com sucesso'),
                (error) => console.error('Erro ao excluir Aluno:', error)
            );
        });
    });
};

export { createAluno, insertAluno, updateAluno, getAluno, getAlunoProfessor, getProfessorById, truncateAluno, deleteAlunoById };
