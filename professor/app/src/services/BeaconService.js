import { useEffect, useState } from 'react';
import { PermissionsAndroid, Alert, Platform } from 'react-native';
import Beacons from '@hkpuits/react-native-beacons-manager';

const useBeaconService = () => {
  const [uuidList, setUuidList] = useState(new Set()); // Usar um Set para armazenar UUIDs únicos
  const [estadoBeacon, setEstadoBeacon] = useState(false);
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

        //await startBeaconRanging();

      } catch (error) {
        console.log('Erro ao solicitar permissão de localização:', error);
      }

      return () => {
        stopBeaconRanging();
      };
    };

    requestPermissionsAndStartBeacons();

    // Certifique-se de parar a varredura e limpar o listener ao desmontar o componente
    return () => {
      stopBeaconRanging();
    };
  }, []); // O segundo argumento vazio garante que o useEffect seja executado apenas uma vez (equivalente ao componentDidMount)

  const startBeaconRanging = async () => {
    Beacons.init(); // para definir o NotificationChannel e habilitar a varredura em segundo plano
    Beacons.detectIBeacons();
    setEstadoBeacon(true);

    try {
      await Beacons.startRangingBeaconsInRegion('Sala1');
      console.log('Varredura de beacons iniciada com sucesso!');
    } catch (error) {
      console.log('Varredura de beacons não iniciada, erro:', error);
    }

    // Configura o ouvinte para a varredura de beacons
    const listener = Beacons.BeaconsEventEmitter.addListener('beaconsDidRange', (data) => {
      if (data.beacons.length > 0) {
        // Filtra e armazena apenas UUIDs novos
        setUuidList(prevSet => {
          const newUuids = data.beacons
            .map(beacon => beacon.uuid) // Extrai UUIDs dos beacons
            .filter(uuid => !prevSet.has(uuid)); // Filtra UUIDs novos

          if (newUuids.length > 0) {
            console.log('Novos UUIDs coletados:', newUuids);
            // Cria um novo Set que inclui os UUIDs antigos e novos
            return new Set([...prevSet, ...newUuids]);
          } else {
            console.log('Nenhum novo UUID coletado.');
            return prevSet; // Retorna o Set atual se não houver novos UUIDs
          }
        });
      } else {
        console.log('Nenhum dado de beacon coletado.');
      }
    });

    setBeaconsDidRangeListener(listener);
  };

  const stopBeaconRanging = async () => {
    if (beaconsDidRangeListener) {
      beaconsDidRangeListener.remove();
      console.log('Listener de beacons removido.');
    }
    try {
      await Beacons.stopRangingBeaconsInRegion('Sala1');
      setEstadoBeacon(false);
      console.log('Varredura de beacons parada com sucesso.');
    } catch (error) {
      console.log('Erro ao parar a varredura de beacons:', error);
    }
  };

  return { uuidList: Array.from(uuidList), estadoBeacon, startBeaconRanging, stopBeaconRanging };
};

export default useBeaconService;
