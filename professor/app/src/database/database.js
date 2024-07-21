import SQLite from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = "marca-presenca.db";

// Instância global do banco de dados
let dbInstance = null;

const openDatabase = () => {
    if (dbInstance) {
        return Promise.resolve(dbInstance);
    }
    
    return SQLite.openDatabase({ name: database_name, location: 'default' })
        .then((db) => {
            dbInstance = db; // Armazena a instância globalmente
            return db.executeSql('PRAGMA foreign_keys = ON;')
                .then(() => db)
                .catch((error) => {
                    console.error('Erro ao configurar chaves estrangeiras:', error);
                    return Promise.reject(error);
                });
        })
        .catch((error) => {
            console.error('Erro ao abrir o banco de dados:', error);
            return Promise.reject(error);
        });
};

const closeDatabase = () => {
    if (dbInstance) {
        dbInstance.close(
            () => {
                console.log('Database fechado com sucesso');
                dbInstance = null; 
            },
            (error) => {
                console.error('Erro ao fechar o banco de dados:', error);
            }
        );
    } else {
        console.log('Nenhuma instância do banco de dados aberta.');
    }
};

export { openDatabase,  closeDatabase};