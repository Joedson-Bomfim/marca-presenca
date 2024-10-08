import { openDatabase } from '../database/database';

const createProfessor = () => {
    return openDatabase().then((db) => {
        return db.transaction((tx) => {
            return tx.executeSql(`
                CREATE TABLE IF NOT EXISTS Professores (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT,
                numero_registro TEXT, 
                criado_em TEXT, 
                atualizado_em TEXT
                )`,
                [],
                () => console.log('Table criada com sucesso'),
                (error) => console.error('Error creating table:', error)
            );
        });
    });
};

const insertProfessor = (nome, numero_registro, criado_em) => {
    return openDatabase().then((db) => {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    'INSERT INTO professores (nome, numero_registro, criado_em) VALUES (?, ?, ?)',
                    [nome, numero_registro, criado_em],
                    (_, results) => {
                        console.log('Professor cadastrado com sucesso, id: ' + results.insertId);
                        resolve(results.insertId); 
                    },
                    (_, error) => {
                        console.error('Erro ao cadastrar Professor:', error);
                        reject(error);
                    }
                );
            });
        });
    });
};

const updateProfessor = (id, nome, numero_registro, atualizado_em) => {
    return openDatabase().then((db) => {
        return db.transaction((tx) => {
            return tx.executeSql(
                'UPDATE professores SET nome = ?, numero_registro = ?, atualizado_em = ? WHERE id = ?',
                [nome, numero_registro, atualizado_em, id],
                () => console.log('Professor atualizado com sucesso'),
                (error) => console.error('Erro ao atualizar Professor:', error)
            );
        });
    });
};

const getProfessor = () => {
    return new Promise((resolve, reject) => {
        openDatabase().then((db) => {
            return db.transaction((tx) => {
                return tx.executeSql(
                    'SELECT * FROM Professores',
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

const getPrimeiroProfessor = () => {
    return new Promise((resolve, reject) => {
        openDatabase().then((db) => {
            return db.transaction((tx) => {
                return tx.executeSql(
                    'SELECT * FROM Professores LIMIT 1',
                    [],
                    (tx, results) => {
                        const rows = results.rows.raw(); 
                        if (rows.length > 0) {
                            resolve(rows[0]); 
                        } else {
                            resolve(null); 
                        }
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
                    'SELECT * FROM Professores WHERE id = ?',
                    [id],
                    (tx, results) => {
                        const rows = results.rows.raw();
                        resolve(rows.length > 0 ? rows[0] : null);
                    },
                    (error) => reject(error)
                );
            });
        });
    });
};

const truncateProfessor = () => {
    return openDatabase().then((db) => {
        return db.transaction((tx) => {
            return tx.executeSql(
                'DELETE FROM Professores',
                [],
                () => {
                    console.log('Tabela Professores truncada com sucesso');
                    // Após truncar, resetar o autoincrement
                    tx.executeSql(
                        'UPDATE SQLITE_SEQUENCE SET seq = 0 WHERE name = "Professores"',
                        [],
                        () => console.log('Sequência de autoincrement reiniciada com sucesso'),
                        (error) => console.error('Erro ao reiniciar sequência de autoincrement:', error)
                    );
                },
                () => console.log('Tabela Professores truncada com sucesso'),
                (error) => console.error('Erro ao truncar tabela Professores:', error)
            );
        });
    });
};

const deleteProfessorById = (id) => {
    return openDatabase().then((db) => {
        return db.transaction((tx) => {
            return tx.executeSql(
                'DELETE FROM Professores WHERE id = ?',
                [id],
                () => console.log('Professor excluído com sucesso'),
                (error) => console.error('Erro ao excluir Professor:', error)
            );
        });
    });
};

export { createProfessor, insertProfessor, updateProfessor, getProfessor, getPrimeiroProfessor, getProfessorById, truncateProfessor, deleteProfessorById };
