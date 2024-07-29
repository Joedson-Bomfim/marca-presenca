import React from 'react';
import { View, Text } from 'react-native';
import { TextInput } from 'react-native-paper';

const Input = ({ label, value, onChangeText, secureTextEntry = false, error, setError, containerStyle, autoCapitalize, maxLength, style, ...props }) => {
    return (
        <View style={containerStyle}>
            <TextInput
                label={label}
                mode="flat"
                value={value}
                secureTextEntry={secureTextEntry}
                onChangeText={(text) => {
                    onChangeText(text);
                    if (error) {
                        setError('');
                    }
                }}
                style={style}
                autoCapitalize={autoCapitalize}
                maxLength={maxLength}
                error={!!error}
                {...props}
            />
            {error ? <Text style={{ color: 'red', marginTop: 0 }}>{error}</Text> : null}
        </View>
    );
};

export default Input;
