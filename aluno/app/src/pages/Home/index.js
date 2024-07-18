import React, { useState, useEffect } from "react";
import { Text, View, Alert } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { generateUUID, checkAndRequestPermissions, startBeaconBroadcasting, stopBeaconBroadcasting } from '../../services/beaconService';
import styles from "./styles";

const Home = ({ navigation }) => {
  const { colors } = useTheme();
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [uuidValue, setUuidValue] = useState('');

  useEffect(() => {
    const initialize = async () => {
      const newUuid = generateUUID();
      setUuidValue(newUuid);
      const permissionsGranted = await checkAndRequestPermissions();
      if (permissionsGranted) {
        startBeaconBroadcasting(newUuid, setIsBroadcasting);
      }
    };
    initialize();
  }, []);

  const handleGenerateUUID = () => {
    const newUuid = generateUUID();
    setUuidValue(newUuid);
  };

  const handleStartBroadcasting = () => {
    startBeaconBroadcasting(uuidValue, setIsBroadcasting);
  };

  const handleStopBroadcasting = () => {
    stopBeaconBroadcasting(setIsBroadcasting);
  };

  return (
    <View style={[styles.fundoTela, { backgroundColor: colors.background }]}>
      <Text style={[styles.titulo, { color: colors.text }]}>Bom dia Joedson!</Text>
      <Text style={[styles.tituloCadastro, { color: colors.text }]}>Detecção de Beacons</Text>
      {isBroadcasting ? (
        <Button mode="contained" labelStyle={{ fontSize: 15 }} onPress={handleStopBroadcasting} 
        style={[styles.marginBottomPrimario, styles.botaoPrincipal, styles.marginBottom]}
        >
          Parar simulação beacon
        </Button>
      ) : (
        <Button mode="contained" labelStyle={{ fontSize: 15 }} onPress={handleStartBroadcasting} 
        style={[styles.marginBottomPrimario, styles.botaoPrincipal, styles.marginBottom]}>
          Iniciar Simulação de Beacon
        </Button>
      )}
      <Text style={[styles.subTitulo, { color: colors.text }]}>UUID atual:</Text>
      <Text style={[styles.marginBottom, { color: colors.text }]}>{uuidValue}</Text>
      <Button mode="contained" labelStyle={{ fontSize: 20 }} onPress={handleGenerateUUID} 
      style={[styles.marginBottomPrimario, styles.botaoPrincipal]}>
        Gerar UUID
      </Button>
    </View>
  );
};

export default Home;
