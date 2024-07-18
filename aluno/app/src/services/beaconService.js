import { useEffect, useState } from "react";
import { PermissionsAndroid, Platform, Alert } from 'react-native';
import BluetoothStateManager from 'react-native-bluetooth-state-manager';
import BeaconBroadcast from '@lovemh9395/react-native-ibeacon-simulator';
import uuid from 'react-native-uuid';

const identifier = 'MyBeacon';
const major = 1;
const minor = 1;

export const generateUUID = () => {
  return uuid.v4();
};

export const checkAndRequestPermissions = async () => {
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
    return true;
  } catch (error) {
    console.error('Erro ao solicitar permissões:', error);
    return false;
  }
};

export const startBeaconBroadcasting = (uuidValue, setIsBroadcasting) => {
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

export const stopBeaconBroadcasting = (setIsBroadcasting) => {
  BeaconBroadcast.stopAdvertisingBeacon();
  setIsBroadcasting(false);
  console.log('Beacon broadcasting stopped.');
};

export const useBluetoothAndBeacon = () => {
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [uuidValue, setUuidValue] = useState('');
  const [bluetooth, setBluetooth] = useState(false);
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    // Listener para capturar mudanças no estado do Bluetooth
    const subscription = BluetoothStateManager.onStateChange((bluetoothState) => {
      switch (bluetoothState) {
        case 'PoweredOn':
          console.log('Bluetooth ligado');
          setBluetooth(true);
          break;
        case 'PoweredOff':
          console.log('Bluetooth desligado');
          setBluetooth(false);
          break;
        case 'Resetting':
          console.log('Bluetooth em processo de reinicialização');
          setBluetooth(false);
          break;
        default:
          console.log('Estado do Bluetooth:', bluetoothState);
          setBluetooth(false);
          break;
      }
    }, true /* emitCurrentState */);

    // Retorne uma função de limpeza para remover o listener ao desmontar o componente
    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    const initialize = async () => {
      const newUuid = generateUUID();
      setUuidValue(newUuid);
      const permissionsGranted = await checkAndRequestPermissions();
      if (permissionsGranted) {
        startBeaconBroadcasting(newUuid, setIsBroadcasting);
      }
    };

    if (bluetooth) {
      setButtonDisabled(false);
      initialize();
    } else {
      setButtonDisabled(true);
      stopBeaconBroadcasting(setIsBroadcasting);
      Alert.alert('Bluetooth desligado', 'Caso queira emitir sinal é preciso ligar o bluetooth');
    }
  }, [bluetooth]);

  return {
    isBroadcasting,
    uuidValue,
    isButtonDisabled,
    handleGenerateUUID: () => {
      const newUuid = generateUUID();
      setUuidValue(newUuid);
    },
    handleStartBroadcasting: () => startBeaconBroadcasting(uuidValue, setIsBroadcasting),
    handleStopBroadcasting: () => stopBeaconBroadcasting(setIsBroadcasting),
  };
};
