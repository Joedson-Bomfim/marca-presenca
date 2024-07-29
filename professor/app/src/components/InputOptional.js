import React from 'react';
import { View, Text } from 'react-native';
import { TextInput } from 'react-native-paper';

const InputOptional = ({ containerStyle, ...props }) => {
    return (
        <View style={containerStyle}>
            <TextInput {...props} />
        </View>
    );
};

export default InputOptional;
