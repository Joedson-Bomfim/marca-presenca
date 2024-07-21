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
        return db.transaction((tx) => {
            return tx.executeSql(
                'INSERT INTO Professores (nome, numero_registro, criado_em) VALUES (?, ?, ?)',
                [nome, numero_registro, criado_em],
                () => console.log('Professor cadastrado com sucesso'),
                (error) => console.error('Erro ao cadastrar Professor:', error)
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

const getUserStatus = () => {
    return new Promise((resolve, reject) => {
        openDatabase().then((db) => {
            db.transaction((tx) => {
                tx.executeSql(
                    'SELECT * FROM Professores WHERE id = 1',
                    [],
                    (tx, results) => {
                        const rows = results.rows.raw();
                        if (rows.length > 0) {
                            resolve(rows[0]); // Assumindo que sempre haverá apenas um registro com id = 1
                        } else {
                            resolve(null); // Nenhum registro encontrado
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
                        // Verifica se há resultados e retorna o primeiro (ou nenhum se não houver)
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

export { createProfessor, insertProfessor, getProfessor, getUserStatus, getProfessorById, truncateProfessor, deleteProfessorById };
