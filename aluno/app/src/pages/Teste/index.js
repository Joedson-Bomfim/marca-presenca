import React, { Component } from "react";
import { Text, View, Alert, Platform, PermissionsAndroid } from 'react-native';
import BeaconBroadcast from '@lovemh9395/react-native-ibeacon-simulator';
import styles from "./styles";

// Valores válidos para UUID, identifier, major, minor
const uuid = 'fda50693-a4e2-4fb1-afcf-c6eb07647825';
const identifier = 'MyBeacon';
const major = 1;
const minor = 1;

class BeaconBackgroundScanScreen extends Component {
  async componentDidMount() {
    await this.checkAndRequestPermissions();
  }

  checkAndRequestPermissions = async () => {
    try {
      if (Platform.Version >= 31) {
        // Para Android 12 (API nível 31) e superior
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
        // Para Android 6 (API nível 23) até Android 11 (API nível 30)
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
        // Para versões anteriores ao Android 6
        Alert.alert('O aplicativo não suporta versões do Android anteriores à 6.0 (Marshmallow).');
        return false;
      }

      this.startBeaconBroadcasting();
    } catch (error) {
      console.error('Erro ao solicitar permissões:', error);
    }
  };

  startBeaconBroadcasting = () => {
    BeaconBroadcast.checkTransmissionSupported()
      .then(() => {
        BeaconBroadcast.stopAdvertisingBeacon();
        BeaconBroadcast.startAdvertisingBeaconWithString(uuid, identifier, major, minor);
        console.log('Beacon broadcasting started successfully.');
        Alert.alert('Beacon broadcasting started successfully.');
      })
      .catch((error) => {
        switch (error) {
          case BeaconBroadcast.NOT_SUPPORTED_MIN_SDK:
            Alert.alert('Not supported: Minimum SDK version not met.');
            console.error('Not supported: Minimum SDK version not met.');
            break;
          case BeaconBroadcast.NOT_SUPPORTED_BLE:
        Alert.alert('Not supported: Bluetooth LE not supported.');
            console.error('Not supported: Bluetooth LE not supported.');
            break;
          case BeaconBroadcast.DEPRECATED_NOT_SUPPORTED_MULTIPLE_ADVERTISEMENTS:
        Alert.alert('Deprecated: Multiple advertisement not supported.');
            console.error('Deprecated: Multiple advertisement not supported.');
            break;
          case BeaconBroadcast.NOT_SUPPORTED_CANNOT_GET_ADVERTISER:
        Alert.alert('Not supported: Cannot get advertiser.');
            console.error('Not supported: Cannot get advertiser.');
            break;
          case BeaconBroadcast.NOT_SUPPORTED_CANNOT_GET_ADVERTISER_MULTIPLE_ADVERTISEMENTS:
        Alert.alert('Not supported: Cannot get advertiser for multiple advertisements.');
            console.error('Not supported: Cannot get advertiser for multiple advertisements.');
            break;
          default:
            console.error('Unknown error:', error);
        Alert.alert('Unknown error:'+ error);
            break;
        }
        console.log('Beacon broadcasting failed.');
      });
  };

  render() {
    return (
      <View style={[styles.fundoTela]}>
        <Text style={{ color: 'black' }}>Detecção de Beacons</Text>
      </View>
    );
  }
}

export default BeaconBackgroundScanScreen;
