// services/BeaconService.js

import { useEffect, useState } from 'react';
import { PermissionsAndroid, Alert, Platform } from 'react-native';
import Beacons from '@hkpuits/react-native-beacons-manager';

const useBeaconService = () => {
  const [data, setData] = useState([]);
  const [beaconIdentificado, setBeaconIdentificado] = useState(false);
  const [beaconsDidRangeListener, setBeaconsDidRangeListener] = useState(null);

  useEffect(() => {
    const requestPermissionsAndStartBeacons = async () => {
      try {
        let permissionsGranted = false;

        if (Platform.Version >= 31) {
          // Para Android 12 (API nível 31) e superior
          const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          ]);

          permissionsGranted = Object.values(granted).every(
            (permission) => permission === PermissionsAndroid.RESULTS.GRANTED
          );
        } else if (Platform.Version >= 23) {
          // Para Android 6 (API nível 23) até Android 11 (API nível 30)
          const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
          ]);

          permissionsGranted = Object.values(granted).every(
            (permission) => permission === PermissionsAndroid.RESULTS.GRANTED
          );
        } else {
          // Para versões anteriores ao Android 6
          Alert.alert('O aplicativo não suporta versões do Android anteriores à 6.0 (Marshmallow).');
          return;
        }

        if (!permissionsGranted) {
          Alert.alert('Permissões necessárias não foram concedidas');
          return;
        }

        // Inicializa a detecção de iBeacons
        Beacons.init(); // para definir o NotificationChannel e habilitar a varredura em segundo plano
        Beacons.detectIBeacons();

        try {
          await Beacons.startRangingBeaconsInRegion('Sala1');
          console.log('Varredura de beacons iniciada com sucesso!');
        } catch (error) {
          console.log('Varredura de beacons não iniciada, erro:', error);
        }

        // Configura o ouvinte para a varredura de beacons
        const listener = Beacons.BeaconsEventEmitter.addListener('beaconsDidRange', (data) => {
          if (data.beacons.length > 0) {
            // Dados do beacon foram coletados, você pode acessá-los aqui
            console.log('Dados do beacon coletados:', data.beacons);
            setData(data.beacons);
            setBeaconIdentificado(true);
          } else {
            console.log('Nenhum dado de beacon coletado.');
            setBeaconIdentificado(false);
          }
        });

        setBeaconsDidRangeListener(listener);

      } catch (error) {
        console.log('Erro ao solicitar permissão de localização:', error);
      }

      return () => {
        // Limpeza ao desmontar o componente
        if (beaconsDidRangeListener) {
          beaconsDidRangeListener.remove();
          console.log('Listener de beacons removido.');
        }
        Beacons.stopRangingBeaconsInRegion('Sala1').then(() => {
          console.log('Varredura de beacons parada com sucesso.');
        }).catch((error) => {
          console.log('Erro ao parar a varredura de beacons:', error);
        });
      };
    };

    requestPermissionsAndStartBeacons();

    // Certifique-se de parar a varredura e limpar o listener ao desmontar o componente
    return () => {
      if (beaconsDidRangeListener) {
        beaconsDidRangeListener.remove();
        console.log('Listener de beacons removido.');
      }
      Beacons.stopRangingBeaconsInRegion('Sala1').then(() => {
        console.log('Varredura de beacons parada com sucesso.');
      }).catch((error) => {
        console.log('Erro ao parar a varredura de beacons:', error);
      });
    };
  }, []); // O segundo argumento vazio garante que o useEffect seja executado apenas uma vez (equivalente ao componentDidMount)

  return { data, beaconIdentificado };
};

export default useBeaconService;
