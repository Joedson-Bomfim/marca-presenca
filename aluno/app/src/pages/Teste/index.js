// pages/Home.js
import React from "react";
import { Text, View } from "react-native";
import { Button, useTheme } from "react-native-paper";
import styles from "./styles";
import { useBluetoothAndBeacon } from '../../services/beaconServiceTeste';

const Teste = ({ navigation }) => {
  const { colors } = useTheme();
  const {
    isBroadcasting,
    uuidValue,
    isButtonDisabled,
    handleGenerateUUID,
    handleStartBroadcasting,
    handleStopBroadcasting,
  } = useBluetoothAndBeacon();

  return (
    <View style={[styles.fundoTela, { backgroundColor: colors.background }]}>
      <Text style={[styles.tituloCadastro, { color: colors.text }]}>Detecção de Beacons</Text>
      {isBroadcasting ? (
        <Button
          mode="contained"
          labelStyle={{ fontSize: 15 }}
          onPress={handleStopBroadcasting}
          style={[styles.marginBottomPrimario, styles.botaoPrincipal, styles.marginBottom]}
        >
          Parar simulação beacon
        </Button>
      ) : (
        <Button
          mode="contained"
          labelStyle={{ fontSize: 15 }}
          onPress={handleStartBroadcasting}
          style={[styles.marginBottomPrimario, styles.botaoPrincipal, styles.marginBottom]}
          disabled={isButtonDisabled}
        >
          Iniciar Simulação de Beacon
        </Button>
      )}
      <Text style={[styles.subTitulo, { color: colors.text }]}>UUID atual:</Text>
      <Text style={[styles.marginBottom, { color: colors.text }]}>{uuidValue}</Text>
      <Button
        mode="contained"
        labelStyle={{ fontSize: 20 }}
        onPress={handleGenerateUUID}
        style={[styles.marginBottomPrimario, styles.botaoPrincipal]}
      >
        Gerar UUID
      </Button>
    </View>
  );
};

export default Teste;
