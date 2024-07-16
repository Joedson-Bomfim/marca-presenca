import React, { Component } from "react";
import { Text, View, Alert, Platform, PermissionsAndroid, Button } from 'react-native';
import BeaconBroadcast from '@lovemh9395/react-native-ibeacon-simulator';
import styles from "./styles";

const uuid = 'fda50693-a4e2-4fb1-afcf-c6eb07647825';
const identifier = 'MyBeacon';
const major = 1;
const minor = 1;

class BeaconBackgroundScanScreen extends Component {
  state = {
    isBroadcasting: false,
  };

  async componentDidMount() {
    await this.checkAndRequestPermissions();
  }

  checkAndRequestPermissions = async () => {
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
      this.startBeaconBroadcasting();
    } catch (error) {
      console.error('Erro ao solicitar permissões:', error);
    }
  };

  startBeaconBroadcasting = () => {
    BeaconBroadcast.checkTransmissionSupported()
      .then(() => {
        BeaconBroadcast.startAdvertisingBeaconWithString(uuid, identifier, major, minor);
        this.setState({ isBroadcasting: true });
        console.log('Beacon broadcasting started successfully.');
      })
      .catch((error) => {
        console.error('Beacon broadcasting failed:', error);
      });
  };

  stopBeaconBroadcasting = () => {
    BeaconBroadcast.stopAdvertisingBeacon();
    this.setState({ isBroadcasting: false });
    console.log('Beacon broadcasting stopped.');
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Detecção de Beacons</Text>
        {this.state.isBroadcasting ? (
          <Button title="Parar Simulação de Beacon" onPress={this.stopBeaconBroadcasting} />
        ) : (
          <Button title="Iniciar Simulação de Beacon" onPress={this.startBeaconBroadcasting} />
        )}
      </View>
    );
  }
}

export default BeaconBackgroundScanScreen;
