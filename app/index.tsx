import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

export default function Index() {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.5)).current;
    const router = useRouter();

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 10,
                friction: 2,
                useNativeDriver: true,
            }),
        ]).start();

        const timer = setTimeout(() => {
            router.replace("/auth");
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={style.container}>
            <Animated.View
                style={[
                    style.iconContainer,
                    {
                        opacity: fadeAnim,
                        transform: [{ scale: scaleAnim }],
                    },
                ]}
            >
                <Ionicons name="medical" size={100} color="white" />
                <Text style={style.appName}>Medicon</Text>
            </Animated.View>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4CAF50',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        alignItems: 'center',
    },
    appName: {
        color: 'white',
        fontSize: 32,
        fontWeight: 'bold',
        margin: 20,
        letterSpacing: 1,
    },
});