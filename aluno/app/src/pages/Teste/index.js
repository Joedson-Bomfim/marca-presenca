import React, { Component } from "react";
import { Text, View, FlatList, DeviceEventEmitter, PermissionsAndroid, Alert, Platform } from 'react-native';
import Beacons from '@hkpuits/react-native-beacons-manager';
import styles from "./styles";

class BeaconBackgroundScanScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };

    this.beaconsDidRangeListener = null; // Inicialize a referência ao ouvinte
    this.beaconIdentificado = false;
  }

  async componentDidMount() {
    try {
      console.log(Platform.Version)
      if (Platform.Version >= 31) {
        // Para Android 12 (API nível 31) e superior
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
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
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
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
    
      // Inicializa a detecção de iBeacons
      Beacons.init(); // to set the NotificationChannel, and enable background scanning
      Beacons.detectIBeacons();

      try {
        await Beacons.startRangingBeaconsInRegion('Sala1');
        console.log('Varredura de beacons iniciada com sucesso!');
      } catch (error) {
        console.log('Varredura de beacons não iniciada, erro:', error);
      }

      // Configura o ouvinte para a varredura de beacons
      this.beaconsDidRangeListener = DeviceEventEmitter.addListener('beaconsDidRange', (data) => {
        if (data.beacons.length > 0) {
          // Dados do beacon foram coletados, você pode acessá-los aqui
          console.log('Dados do beacon coletados:', data.beacons);
          this.setState({ data: data.beacons });
          
          this.beaconIdentificado = true;
        } else {
          console.log('Nenhum dado de beacon coletado.');
        }
      });
    } catch (error) {
      console.log('Erro ao solicitar permissão de localização:', error);
    }
  }

  componentWillUnmount() {
    // Remova o ouvinte usando a referência guardada
    if (this.beaconsDidRangeListener) {
      this.beaconsDidRangeListener.remove();
    }
    Beacons.stopRangingBeaconsInRegion('REGION1').catch((error) => {
      console.log('Erro ao parar a varredura de beacons:', error);
    });
  }

  render() {
    return (
      <View style={[styles.fundoTela]}>
        <Text style={{ color: 'black' }}>Detecção de Beacons</Text>
        {this.beaconIdentificado ? 
            <FlatList
            data={this.state.data}
            keyExtractor={(item) => item.uuid} // Use uma chave única para cada item
            renderItem={({ item }) => (
              <Text style={{ color: 'black' }}>{JSON.stringify(item)}</Text>
            )}
          /> : 
          <Text style={{ color: 'black' }}>Nenhum beacon foi identificado, verifique se o bluetooth e a localização estão ativados</Text>
        }
      </View>
    );
  }
}

export default BeaconBackgroundScanScreen;
