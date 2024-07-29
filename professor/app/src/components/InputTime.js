import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, useTheme} from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const InputTime = ({ titulo, icon, initialTime, onTimeSelected }) => {
  const { colors } = useTheme();

  const [time, setTime] = React.useState(initialTime || '');
  const [isTimePickerVisible, setTimePickerVisibility] = React.useState(false);

  const showTimePicker = () => setTimePickerVisibility(true);
  const hideTimePicker = () => setTimePickerVisibility(false);
  const handleConfirmTime = (time) => {
    const formattedTime = `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`;
    setTime(formattedTime);
    onTimeSelected(formattedTime); // Passa a hora selecionada para o formulário
    hideTimePicker();
  };

  return (
    <View style={styles.container}>
      <Button mode="contained" onPress={showTimePicker} icon={() => <Icon name={icon} size={30} color="#ffffff" />} style={{backgroundColor: colors.secundary}}>
        {titulo}
      </Button>
      {time ? ( <TextInput label="Hora" mode="flat" value={time} editable={false} style={styles.input}/> ) : null}
      <DateTimePickerModal isVisible={isTimePickerVisible} mode="time" onConfirm={handleConfirmTime} onCancel={hideTimePicker} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  input: {
    width: 80,
    marginBottom: 20,
    alignSelf: 'center',
  },
});

export default InputTime;
