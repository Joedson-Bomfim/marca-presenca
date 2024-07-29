import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const DateTimeInput = () => {
  const [date, setDate] = React.useState('');
  const [time, setTime] = React.useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = React.useState(false);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);
  const handleConfirmDate = (date) => {
    setDate(date.toDateString()); // Formate a data conforme necessário
    hideDatePicker();
  };

  const showTimePicker = () => setTimePickerVisibility(true);
  const hideTimePicker = () => setTimePickerVisibility(false);
  const handleConfirmTime = (time) => {
    setTime(`${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`); // Formate a hora conforme necessário
    hideTimePicker();
  };

  return (
    <View style={styles.container}>
      <Button mode="outlined" onPress={showDatePicker}>
        Selecione uma data
      </Button>
      <TextInput
        label="Data"
        mode="flat"
        value={date}
        editable={false}
        style={styles.input}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={hideDatePicker}
      />

      <Button mode="outlined" onPress={showTimePicker}>
        Selecione uma hora
      </Button>
      <TextInput
        label="Hora"
        mode="flat"
        value={time}
        editable={false}
        style={styles.input}
      />
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleConfirmTime}
        onCancel={hideTimePicker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    marginBottom: 20,
  },
});

export default DateTimeInput;
