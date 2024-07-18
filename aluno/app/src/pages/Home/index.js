import React, { useState, useEffect } from "react";
import { Text, View, Platform, PermissionsAndroid } from "react-native";
import { TextInput, Button, useTheme } from "react-native-paper";
import BeaconBroadcast from '@lovemh9395/react-native-ibeacon-simulator';
import uuid from 'react-native-uuid';

import TemaPrincipal from "../../assets/styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./styles";

const Home = ( {navigation} ) => {
    const { colors } = useTheme();

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

    return(
        //<Icon name="clipboard-text-clock-outline" color={ colors.icone } size={40}/>       
        <View style={[styles.fundoTela, {backgroundColor: colors.background}]}>
            <Text style={[styles.titulo, {color: colors.text }]}>Bom dia Joedson!</Text>

            <Text style={[styles.tituloCadastro, {color: colors.text }]}>Detecção de Beacons</Text>
            {isBroadcasting ? (
                <Button mode="contained" labelStyle={{ fontSize: 15 }} onPress={stopBeaconBroadcasting} style={[styles.marginBottomPrimario, TemaPrincipal.botaoPrincipal, styles.marginBottom]}>
                Parar simulação beacon
                </Button>
            ) : (
                <Button mode="contained" labelStyle={{ fontSize: 15 }} onPress={startBeaconBroadcasting} style={[styles.marginBottomPrimario, TemaPrincipal.botaoPrincipal, styles.marginBottom]}>
                Iniciar Simulação de Beacon
                </Button>
            )}
            <Text style={[styles.subTitulo, {color: colors.text }]}>UUID atual:</Text>
            <Text style={[styles.marginBottom, {color: colors.text }]}>{uuidValue}</Text>
            <Button mode="contained" labelStyle={{ fontSize: 20 }} onPress={generateUUID} style={[styles.marginBottomPrimario, TemaPrincipal.botaoPrincipal]}>
                Gerar UUID
            </Button>
        </View>
    )
}

export default Home;