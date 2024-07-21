import { openDatabase,  closeDatabase} from '../database/database';

const createDisciplina = () => {
    return openDatabase().then((db) => {
        return db.transaction((tx) => {
            return tx.executeSql(`
                CREATE TABLE IF NOT EXISTS Disciplinas (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                professor_fk INTEGER,
                nome TEXT,
                codigo TEXT,
                curso TEXT,
                complemento TEXT,
                criado_em TEXT,
                atualizado_em TEXT,
                FOREIGN KEY (professor_fk) REFERENCES Disciplinas(id)
                )`,
                [],
                () => console.log('Tabela Disciplinas criada com sucesso'),
                (error) => console.error('Erro ao criar tabela Disciplinas:', error)
            );
        });
    });
};

const insertDisciplina = (professor_fk, nome, codigo, curso, complemento, criado_em) => {
    return openDatabase().then((db) => {
        return db.transaction((tx) => {
            return tx.executeSql(
                'INSERT INTO Disciplinas (professor_fk, nome, codigo, curso, complemento, criado_em) VALUES (?, ?, ?, ?, ?, ?)',
                [professor_fk, nome, codigo, curso, complemento, criado_em],
                () => console.log('Disciplina cadastrada com sucesso'),
                (error) => console.error('Erro ao cadastrar Disciplina:', error)
            );
        });
    });
};

const getDisciplina = () => {
    return new Promise((resolve, reject) => {
        openDatabase().then((db) => {
            return db.transaction((tx) => {
                return tx.executeSql(
                    'SELECT * FROM Disciplinas',
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
                    'SELECT * FROM Disciplinas WHERE id = ?',
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

const truncateDisciplina = () => {
    return openDatabase().then((db) => {
        return db.transaction((tx) => {
            return tx.executeSql(
                'DELETE FROM Disciplinas',
                [],
                () => {
                    console.log('Tabela Disciplinas truncada com sucesso');
                    // Após truncar, resetar o autoincrement
                    tx.executeSql(
                        'UPDATE SQLITE_SEQUENCE SET seq = 0 WHERE name = "Disciplinas"',
                        [],
                        () => console.log('Sequência de autoincrement reiniciada com sucesso'),
                        (error) => console.error('Erro ao reiniciar sequência de autoincrement:', error)
                    );
                },
                () => console.log('Tabela Disciplinas truncada com sucesso'),
                (error) => console.error('Erro ao truncar tabela Disciplinas:', error)
            );
        });
    });
};

const deleteDisciplinaById = (id) => {
    return openDatabase().then((db) => {
        return db.transaction((tx) => {
            return tx.executeSql(
                'DELETE FROM Disciplinas WHERE id = ?',
                [id],
                () => console.log('Disciplina excluída com sucesso'),
                (error) => console.error('Erro ao excluir Disciplina:', error)
            );
        });
    });
};

export { createDisciplina, insertDisciplina, getDisciplina, getProfessorById, truncateDisciplina, deleteDisciplinaById };
