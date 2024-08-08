
import { Alert } from "react-native";
import BluetoothStateManager from 'react-native-bluetooth-state-manager';
import DeviceInfo from 'react-native-device-info';

const checkLocationStatus = async () => {       
    try {
        const isLocationEnabled = await DeviceInfo.isLocationEnabled();
        return isLocationEnabled;
    } catch (error) {
        console.error('Error checking location state:', error);
        Alert.alert('Atenção', 'Infelizmente houve um erro ao tentar verificar a situação da localização');
    }
};

const checkBluetoothState = async () => {
    try {
        const bluetoothState = await BluetoothStateManager.getState();
        if (bluetoothState === 'PoweredOn') {
            console.log('Bluetooth ligado');
            return true;
        }else {
            return false;
        }
    } catch (error) {
        console.error('Error checking Bluetooth state:', error);
        Alert.alert('Atenção', 'Infelizmente houve um erro ao tentar verificar a situação do Bluetooth');
    }
};

export const CheckBluetoothAndLocation = async () => {
    const isBluetoothEnabled = await checkBluetoothState();
    const isLocationEnabled = await checkLocationStatus();

    if (!isBluetoothEnabled || !isLocationEnabled) {
        if(!isBluetoothEnabled && !isLocationEnabled) {
            Alert.alert('Bluetooth e Localização estão desligados', 'Por favor, ative o bluetooth e a localização para fazer a identificação de beacons');
        }else if(!isBluetoothEnabled) {
            Alert.alert('O Bluetooth está desligado', 'Por favor, ative o bluetooth para fazer a identificação de beacons');
        }else {
            Alert.alert('A localização está desligada', 'Por favor, ative a localização para fazer a identificação de beacons');
        }
        
        return false;
    }

    return true;
}