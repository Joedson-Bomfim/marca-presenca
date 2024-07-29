import React from 'react';
import { View, Text } from 'react-native';
import { TextInput } from 'react-native-paper';

const Input = ({ onChangeText, error, setError, containerStyle, ...props }) => {
    return (
        <View style={containerStyle}>
            <TextInput
                mode="flat"
                onChangeText={(text) => {
                    onChangeText(text);
                    if (error) {
                        setError('');
                    }
                }}
                error={!!error}
                {...props}
            />
            {error ? <Text style={{ color: 'red', marginTop: 0 }}>{error}</Text> : null}
        </View>
    );
};

export default Input;
