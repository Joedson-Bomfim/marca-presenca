import SQLite from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = "marca-presenca.db";
const database_version = "1.0";
const database_displayname = "Marca presenca";
const database_size = 200000;

const openDatabase = () => {
    return SQLite.openDatabase({ name: database_name, location: 'default' });
};

export default openDatabase;