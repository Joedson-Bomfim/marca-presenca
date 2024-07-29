import React, { useRef, useEffect } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

export default function SignalLoading() {
    const opacityValue1 = useRef(new Animated.Value(0)).current;
    const opacityValue2 = useRef(new Animated.Value(0)).current;
    const opacityValue3 = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const animate = () => {
            Animated.sequence([
                Animated.timing(opacityValue1, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(opacityValue2, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(opacityValue3, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(opacityValue1, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(opacityValue2, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(opacityValue3, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ]).start(() => animate());
        };

        animate();
    }, [opacityValue1, opacityValue2, opacityValue3]);

    return (
        <View style={styles.container}>
            <View style={styles.dotContainer}>
                <Animated.View style={[styles.dot, { opacity: opacityValue1 }]} />
                <Animated.View style={[styles.dot, { opacity: opacityValue2 }]} />
                <Animated.View style={[styles.dot, { opacity: opacityValue3 }]} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    dotContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    dot: {
        width: 10,
        height: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        margin: 5,
    },
});