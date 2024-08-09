// pages/Home.js
import React, { useContext } from "react";
import { Text, View, TouchableOpacity, Platform } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { useBluetoothAndBeacon } from '../../services/beaconService';
import { Context } from '../../contexts/Context';
import Loading from "../../components/LoadingDots";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from './styles';

const Home = ({ navigation }) => {
  const { colors } = useTheme();
  const { isBroadcasting, isButtonDisabled, handleStartBroadcasting, handleStopBroadcasting } = useBluetoothAndBeacon();
  const { nome, uuid } = useContext(Context);

  // Função para formatar o UUID
  const formatUUID = (uuid, visibleLength = 8, fillerLength = 10, fillerChar = '*') => {
    if (uuid.length <= (visibleLength * 2 + fillerLength)) return uuid; // Handle short UUIDs

    const firstPart = uuid.slice(0, visibleLength); // Primeiro grupo de caracteres
    const lastPart = uuid.slice(-visibleLength); // Últimos caracteres
    const maskedPart = fillerChar.repeat(fillerLength); // Filler para o meio

    return `${firstPart}${maskedPart}${lastPart}`;
  };

  // Para Android 8 a cima
  const loading = Platform.Version >= 26 ? <Loading/> : '';

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.titulo, { color: colors.text }]}>Olá {nome}!</Text>
        <TouchableOpacity onPress={() => { navigation.navigate('AlunoEdita') }}>
          <Icon name="square-edit-outline" color="#fff" size={40} />
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <Text style={[styles.subTitulo, { color: colors.text }]}>Meu ID:</Text>
        <Text style={[{ color: colors.text, fontSize: 14 }]}>{formatUUID(uuid)}</Text>
      </View>

      <View style={styles.parteInferior}>
        {isBroadcasting ? (
          <View>
            {loading}
            <Button mode="contained" labelStyle={{ fontSize: 20 }} onPress={handleStopBroadcasting}
              style={[styles.botao, { backgroundColor: '#6346F5' }]}>
              Parar de transmitir
            </Button>
          </View>
        ) : (
          <Button mode="contained" labelStyle={{ fontSize: 20 }} onPress={handleStartBroadcasting} disabled={isButtonDisabled}
            style={[styles.botao]}>
            Transmitir ID de aluno
          </Button>
        )}
      </View>
    </View>
  );
};

export default Home;
