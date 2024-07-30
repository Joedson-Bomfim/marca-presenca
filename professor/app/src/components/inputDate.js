import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, Button, useTheme } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const DateTimeInput = ({ titulo, initialDate, icon, onDateSelected }) => {
  const { colors } = useTheme();

  const [date, setDate] = React.useState(initialDate || '');
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Os meses são indexados a partir de 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };


  const handleConfirmDate = (date) => {
    const formattedDate = formatDate(date);
    setDate(formattedDate); // Formate a data conforme necessário
    onDateSelected(formattedDate);
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <Button mode="contained" onPress={showDatePicker} icon={() => <Icon name={icon} size={30} color="#ffffff" />} 
      style={[styles.Button,{backgroundColor: colors.secundary}]}>
        {titulo}
      </Button>
      <TextInput label="Data" mode="flat" value={date} editable={false} style={styles.input}/>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  Button: {
    padding: 5,
  },
  input: {
    width: 150,
    alignSelf: 'center'
  },
});

export default DateTimeInput;
