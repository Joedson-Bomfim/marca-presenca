import { openDatabase } from '../database/database';

const createPresenca = () => {
    return openDatabase().then((db) => {
        return db.transaction((tx) => {
            return tx.executeSql(`
                CREATE TABLE IF NOT EXISTS Presencas (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    aluno_fk INTEGER,
                    aula_fk INTEGER,
                    data TEXT,
                    quantidade_aulas_assistidas TEXT,
                    observacao TEXT,
                    situacao TEXT,
                    criado_em TEXT,
                    atualizado_em TEXT,
                    FOREIGN KEY (aluno_fk) REFERENCES Alunos(id),
                    FOREIGN KEY (aula_fk) REFERENCES Aulas(id)
                )`,
                [],
                () => console.log('Table Presencas criada com sucesso'),
                (error) => console.error('Error creating table:', error)
            );
        });
    });
};

const insertPresenca = (aluno_fk, aula_fk, data, quantidade_aulas_assistidas, observacao, situacao, criado_em) => {
    return openDatabase().then((db) => {
        return db.transaction((tx) => {
            return tx.executeSql(
                'INSERT INTO Presencas (aluno_fk, aula_fk, data, quantidade_aulas_assistidas, observacao, situacao, criado_em) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [aluno_fk, aula_fk, data, quantidade_aulas_assistidas, observacao, situacao, criado_em],
                () => console.log('Aula cadastrado com sucesso'),
                (error) => console.error('Erro ao cadastrar Aula:', error)
            );
        });
    });
};

const insertPresencaLote = (tx, aluno_fk, aula_fk, data, quantidade_aulas_assistidas, observacao, situacao, criado_em) => {
    console.log('Inserindo presença:', aluno_fk, aula_fk, data, quantidade_aulas_assistidas, observacao, situacao, criado_em);
    tx.executeSql(
        'INSERT INTO Presencas (aluno_fk, aula_fk, data, quantidade_aulas_assistidas, observacao, situacao, criado_em) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [aluno_fk, aula_fk, data, quantidade_aulas_assistidas, observacao, situacao, criado_em],
        () => console.log('Presença cadastrada com sucesso'),
        (error) => console.error('Erro ao cadastrar Presença:', error)
    );
};

const insertMultiplePresencas = async (aula_fk, data, criado_em, presencas) => {
    try {
        const db = await openDatabase();

        db.transaction(tx => {
            presencas.forEach(presenca => {
                if (typeof presenca.aluno_fk === 'number' && typeof aula_fk === 'number') {
                    insertPresencaLote(
                        tx,
                        presenca.aluno_fk,
                        aula_fk,
                        data,
                        presenca.quantidade_aulas_assistidas,
                        presenca.observacao,
                        presenca.situacao,
                        criado_em
                    );
                } else {
                    console.error('Valores de chave estrangeira inválidos:', presenca.aluno_fk, aula_fk);
                }
            });
        }, 
        error => {
            console.error('Erro ao cadastrar múltiplas Presenças:', error);
        }, 
        () => {
            console.log('Todas as presenças foram cadastradas com sucesso');
        });
    } catch (error) {
        console.error('Erro ao abrir o banco de dados:', error);
    }
};

const getPresenca = () => {
    return new Promise((resolve, reject) => {
        openDatabase().then((db) => {
            return db.transaction((tx) => {
                return tx.executeSql(
                    'SELECT * FROM Presencas',
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
                    'SELECT * FROM Presencas WHERE id = ?',
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

const truncatePresenca = () => {
    return openDatabase().then((db) => {
        return db.transaction((tx) => {
            return tx.executeSql(
                'DELETE FROM Presencas',
                [],
                () => {
                    console.log('Tabela Presencas truncada com sucesso');
                    // Após truncar, resetar o autoincrement
                    tx.executeSql(
                        'UPDATE SQLITE_SEQUENCE SET seq = 0 WHERE name = "Presencas"',
                        [],
                        () => console.log('Sequência de autoincrement reiniciada com sucesso'),
                        (error) => console.error('Erro ao reiniciar sequência de autoincrement:', error)
                    );
                },
                () => console.log('Tabela Presencas truncada com sucesso'),
                (error) => console.error('Erro ao truncar tabela Presencas:', error)
            );
        });
    });
};

const deletePresencaById = (id) => {
    return openDatabase().then((db) => {
        return db.transaction((tx) => {
            return tx.executeSql(
                'DELETE FROM Presencas WHERE id = ?',
                [id],
                () => console.log('Presenca excluída com sucesso'),
                (error) => console.error('Erro ao excluir Presenca:', error)
            );
        });
    });
};

export { createPresenca, insertPresenca, insertMultiplePresencas, getPresenca, getProfessorById, truncatePresenca, deletePresencaById };
