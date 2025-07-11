import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { clearUser } from '../redux/slices/userSlice';

const ProfileScreen = () => {
    const email = useAppSelector(state => state.user.email);
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(clearUser());
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile Screen</Text>
            {email && <Text style={styles.email}>Email: {email}</Text>}
            <Button title="Logout" onPress={handleLogout} />
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
        marginVertical: 16,
        fontSize: 16,
    },
});

export default ProfileScreen; 