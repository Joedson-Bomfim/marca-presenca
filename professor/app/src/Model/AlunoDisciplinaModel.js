import { openDatabase } from '../database/database';

const createAlunoDisciplina = () => {
    return openDatabase().then((db) => {
        return db.transaction((tx) => {
            return tx.executeSql(`
                CREATE TABLE IF NOT EXISTS AlunosDisciplinas (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                aluno_fk INTEGER,
                disciplina_fk INTEGER,
                criado_em TEXT, 
                atualizado_em TEXT,
                FOREIGN KEY (aluno_fk) REFERENCES Alunos(id),
                FOREIGN KEY (disciplina_fk) REFERENCES Disciplinas(id)
                )`,
                [],
                () => console.log('Table AlunosDisciplinas criada com sucesso'),
                (error) => console.error('Error creating table:', error)
            );
        });
    });
};

const insertAlunoDisciplina = (aluno_fk, disciplina_fk, criado_em) => {
    return openDatabase().then((db) => {
        return db.transaction((tx) => {
            return tx.executeSql(
                'INSERT INTO AlunosDisciplinas (aluno_fk, disciplina_fk, criado_em) VALUES (?, ?, ?)',
                [aluno_fk, disciplina_fk, criado_em],
                () => console.log('AlunoDisciplina cadastrado com sucesso'),
                (error) => console.error('Erro ao cadastrar AlunoDisciplina:', error)
            );
        });
    });
};

const getAlunoDisciplin = () => {
    return new Promise((resolve, reject) => {
        openDatabase().then((db) => {
            return db.transaction((tx) => {
                return tx.executeSql(
                    'SELECT * FROM AlunosDisciplinas',
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

const getAlunoDisciplinaMarcaPresenca = (id) => {
    return new Promise((resolve, reject) => {
        openDatabase().then((db) => {
            return db.transaction((tx) => {
                return tx.executeSql(`
                    SELECT AlunosDisciplinas.id, A.nome, A.beacon_id FROM AlunosDisciplinas
                    JOIN Alunos as A ON A.id = aluno_fk
                    JOIN Disciplinas as D ON D.id = disciplina_fk
                    WHERE D.id = ?
                    ORDER BY A.nome ASC`,
                    [id],
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
                    'SELECT * FROM AlunosDisciplinas WHERE id = ?',
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

const truncateAlunoDisciplina = () => {
    return openDatabase().then((db) => {
        return db.transaction((tx) => {
            return tx.executeSql(
                'DELETE FROM AlunosDisciplinas',
                [],
                () => {
                    console.log('Tabela AlunosDisciplinas truncada com sucesso');
                    // Após truncar, resetar o autoincrement
                    tx.executeSql(
                        'UPDATE SQLITE_SEQUENCE SET seq = 0 WHERE name = "AlunosDisciplinas"',
                        [],
                        () => console.log('Sequência de autoincrement reiniciada com sucesso'),
                        (error) => console.error('Erro ao reiniciar sequência de autoincrement:', error)
                    );
                },
                () => console.log('Tabela AlunosDisciplinas truncada com sucesso'),
                (error) => console.error('Erro ao truncar tabela AlunosDisciplinas:', error)
            );
        });
    });
};

const deleteAlunoDisciplinaById = (id) => {
    return openDatabase().then((db) => {
        return db.transaction((tx) => {
            return tx.executeSql(
                'DELETE FROM AlunosDisciplinas WHERE id = ?',
                [id],
                () => console.log('AlunoDisciplina excluído com sucesso'),
                (error) => console.error('Erro ao excluir AlunoDisciplina:', error)
            );
        });
    });
};

export { createAlunoDisciplina, insertAlunoDisciplina, getAlunoDisciplin, getAlunoDisciplinaMarcaPresenca, getProfessorById, truncateAlunoDisciplina, deleteAlunoDisciplinaById };
