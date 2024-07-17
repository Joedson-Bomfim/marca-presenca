import React, { useState, useEffect } from "react";
import { Text, View, Alert, Platform, PermissionsAndroid, Button } from 'react-native';
import BeaconBroadcast from '@lovemh9395/react-native-ibeacon-simulator';
import uuid from 'react-native-uuid';
import styles from "./styles";

const BeaconBackgroundScanScreen = () => {
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [uuidValue, setUuidValue] = useState(uuid.v4());
  //const uuidValue = 'fda50693-a4e2-4fb1-afcf-c6eb07647825';
  const identifier = 'MyBeacon';
  const major = 1;
  const minor = 1;

  useEffect(() => {
    checkAndRequestPermissions();
  }, []);

  const checkAndRequestPermissions = async () => {
    try {
      if (Platform.Version >= 31) {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE,
        ]);
        const allPermissionsGranted = Object.values(granted).every(
          (permission) => permission === PermissionsAndroid.RESULTS.GRANTED
        );
        if (!allPermissionsGranted) {
          Alert.alert('Permissões necessárias não foram concedidas');
          return false;
        }
      } else if (Platform.Version >= 23) {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        ]);
        const allPermissionsGranted = Object.values(granted).every(
          (permission) => permission === PermissionsAndroid.RESULTS.GRANTED
        );
        if (!allPermissionsGranted) {
          Alert.alert('Permissões necessárias não foram concedidas');
          return false;
        }
      } else {
        Alert.alert('O aplicativo não suporta versões do Android anteriores à 6.0 (Marshmallow).');
        return false;
      }
      startBeaconBroadcasting();
    } catch (error) {
      console.error('Erro ao solicitar permissões:', error);
    }
  };

  const startBeaconBroadcasting = () => {
    BeaconBroadcast.checkTransmissionSupported()
      .then(() => {
        BeaconBroadcast.startAdvertisingBeaconWithString(uuidValue, identifier, major, minor);
        setIsBroadcasting(true);
        console.log('Beacon broadcasting started successfully.');
      })
      .catch((error) => {
        console.error('Beacon broadcasting failed:', error);
      });
  };

  const stopBeaconBroadcasting = () => {
    BeaconBroadcast.stopAdvertisingBeacon();
    setIsBroadcasting(false);
    console.log('Beacon broadcasting stopped.');
  };

  const generateUUID = () => {
    const newUuid = uuid.v4(); // Gera um UUID v4
    setUuidValue(newUuid);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Detecção de Beacons</Text>
      {isBroadcasting ? (
        <Button title="Parar Simulação de Beacon" onPress={stopBeaconBroadcasting} />
      ) : (
        <Button title="Iniciar Simulação de Beacon" onPress={startBeaconBroadcasting} />
      )}
      <Text>UUID atual: {uuidValue}</Text>
      <Button title="Gerar UUID" onPress={generateUUID} />
    </View>
  );
};

export default BeaconBackgroundScanScreen;
