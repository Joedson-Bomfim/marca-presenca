import { useContext, useEffect, useState } from "react";
import { PermissionsAndroid, Platform, Alert } from 'react-native';
import BluetoothStateManager from 'react-native-bluetooth-state-manager';
import BeaconBroadcast from '@rodrigo7/react-native-ibeacon-simulator';
import { Context } from '../contexts/Context';

const identifier = 'MyBeacon';
const major = 1;
const minor = 1;

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
  const { uuid } = useContext(Context);

  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      const permissionsGranted = await checkAndRequestPermissions();
      if (permissionsGranted) {
        startBeaconBroadcasting(uuid, setIsBroadcasting);
      }
    };

    const subscription = BluetoothStateManager.onStateChange((bluetoothState) => {
      switch (bluetoothState) {
        case 'PoweredOn':
          console.log('Bluetooth ligado');
          setButtonDisabled(false);
          initialize();
          break;
        case 'PoweredOff':
          console.log('Bluetooth desligado');
          setButtonDisabled(true);
          stopBeaconBroadcasting(setIsBroadcasting);
          Alert.alert('Bluetooth desligado', 'Caso queira emitir sinal é preciso ligar o bluetooth');
          break;
        case 'Resetting':
          console.log('Bluetooth em processo de reinicialização');
          setButtonDisabled(true);
          stopBeaconBroadcasting(setIsBroadcasting);
          break;
        default:
          console.log('Estado do Bluetooth:', bluetoothState);
          stopBeaconBroadcasting(setIsBroadcasting);
          break;
      }
    }, true);

    return () => {
      subscription.remove();
    };
  }, [uuid]);

  return {
    isBroadcasting,
    isButtonDisabled,
    handleStartBroadcasting: () => startBeaconBroadcasting(uuid, setIsBroadcasting),
    handleStopBroadcasting: () => stopBeaconBroadcasting(setIsBroadcasting),
  };
};
