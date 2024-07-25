import React from 'react';
import { View, Button, Alert } from 'react-native';
import RNFS from 'react-native-fs';

const App = () => {
  // Dados dos alunos
  const students = [
    { id: 1, name: 'João Silva', age: 20 },
    { id: 2, name: 'Maria Oliveira', age: 22 },
    { id: 3, name: 'Pedro Santos', age: 21 },
    { id: 4, name: 'Joedson Lopes Bomfim', age: 27 },
    { id: 5, name: 'Ismael Luduvico', age: 25 },
  ];

  // Caminho do diretório de Downloads
  const downloadDir = RNFS.DownloadDirectoryPath;
  const filePath = `${downloadDir}/alunos.xml`;

  // Gerar o conteúdo XML
  const generateXMLContent = (students) => {
    let xmlContent = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xmlContent += '<students>\n';

    students.forEach((student) => {
      xmlContent += `  <student>\n`;
      xmlContent += `    <id>${student.id}</id>\n`;
      xmlContent += `    <name>${student.name}</name>\n`;
      xmlContent += `    <age>${student.age}</age>\n`;
      xmlContent += `  </student>\n`;
    });

    xmlContent += '</students>\n';
    return xmlContent;
  };

  // Criar e salvar o arquivo XML no diretório de Downloads
  const createAndSaveXMLFile = async () => {
    try {
      const xmlContent = generateXMLContent(students);
      await RNFS.writeFile(filePath, xmlContent, 'utf8');
      Alert.alert('Sucesso', 'Arquivo XML salvo no diretório de Downloads!');
    } catch (err) {
      Alert.alert('Erro', err.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Create XML File" onPress={createAndSaveXMLFile} />
    </View>
  );
};

export default App;
