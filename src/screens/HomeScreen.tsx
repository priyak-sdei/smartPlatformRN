import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppSelector } from '../redux/hooks';

const HomeScreen = () => {
    const email = useAppSelector(state => state.user.email);
    return (
        <View style={styles.container} testID="home-root">
            <Text style={styles.title}>Home Screen</Text>
            {email && <Text style={styles.email}>Logged in as: {email}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    email: {
        marginTop: 16,
        fontSize: 16,
    },
});

export default HomeScreen; 