import { openDatabase } from '../database/database';

const getTables = () => { 
    return new Promise((resolve, reject) => {
        openDatabase().then((db) => {
            return db.transaction((tx) => {
                return tx.executeSql(
                    "SELECT name FROM sqlite_master WHERE type='table' AND name NOT IN ('android_metadata', 'sqlite_sequence');",
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

const dropTable = (tableName) => {
    return new Promise((resolve, reject) => {
      openDatabase().then((db) => {
        db.transaction((tx) => {
          tx.executeSql(
            `DROP TABLE IF EXISTS ${tableName};`,
            [],
            (tx, results) => {
              resolve(`Table ${tableName} dropped successfully.`);
            },
            (error) => reject(`Error while dropping table: ${error.message}`)
          );
        });
      }).catch((error) => reject(`Database error: ${error.message}`));
    });
};

export { getTables, dropTable };
