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

const updateAluno = (id, quantidade_aulas_assistidas, observacao, situacao, atualizado_em) => {
    return openDatabase().then((db) => {
        return db.transaction((tx) => {
            return tx.executeSql(
                'UPDATE Presencas SET quantidade_aulas_assistidas = ?, observacao = ?, situacao = ?, atualizado_em = ? WHERE id = ?',
                [quantidade_aulas_assistidas, observacao, situacao, atualizado_em, id],
                () => console.log('Aluno atualizado com sucesso'),
                (error) => console.error('Erro ao atualizar Aluno:', error)
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

const getPresencaByAula = (aula_id, data_presenca) => {
    return new Promise((resolve, reject) => {
        openDatabase().then((db) => {
            return db.transaction((tx) => {
                return tx.executeSql(`
                    SELECT P.id as id, A.nome, A.matricula, P.data, Aula.quantidade_aulas, D.nome as nome_disciplina, D.codigo as codigo_disciplina,
                    P.quantidade_aulas_assistidas, Aula.local, P.observacao, P.Situacao
                    FROM Presencas AS P
                    JOIN Alunos AS A ON A.id = P.aluno_fk
                    JOIN Aulas AS Aula ON Aula.id = P.aula_fk
                    JOIN Disciplinas AS D ON D.id = Aula.disciplina_fk
                    WHERE Aula.id = ? AND P.data = ?
                    ORDER BY A.nome ASC`,
                    [aula_id, data_presenca],
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

const getGrupoPresenca = (disciplinaId) => {
    return new Promise((resolve, reject) => {
        openDatabase().then((db) => {
            return db.transaction((tx) => {
                return tx.executeSql( `
                    SELECT p.id AS id, a.id as aula_id, d.nome AS disciplina, p.data, a.horario_inicio_aula, a.horario_fim_aula, 
                        COUNT(CASE WHEN p.situacao != 'Ausente' THEN 1 END) AS total_alunos_presentes,
                        COUNT(p.aluno_fk) AS total_alunos
                    FROM Presencas p
                    JOIN Aulas a ON p.aula_fk = a.id
                    JOIN Disciplinas d ON a.disciplina_fk = d.id
                    WHERE d.id = ?
                    GROUP BY d.nome, p.data, a.horario_inicio_aula
                    ORDER BY p.data DESC;`,
                    [disciplinaId],
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

export { createPresenca, insertPresenca, updateAluno, insertMultiplePresencas, getPresenca, getPresencaByAula, getGrupoPresenca, truncatePresenca, deletePresencaById };
