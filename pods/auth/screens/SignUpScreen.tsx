import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useTheme } from '@src/theme/themeProvider';

import type { StackNavigationProp } from '@react-navigation/stack';

type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
};

type WelcomeScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'Login'
>;

interface WelcomeScreenProps {
  navigation: WelcomeScreenNavigationProp;
}

const SignUpScreen = ({ navigation }: WelcomeScreenProps) => {
  const { theme } = useTheme();
  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text style={[styles.text, { color: theme.colors.text }]}>
        Welcome to forgot Platform!
      </Text>
      <Button title="Login" onPress={() => navigation.navigate('Login')} />
      <Button title="Sign Up" onPress={() => navigation.navigate('SignUp')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 24, marginBottom: 24 },
});

export default SignUpScreen;
