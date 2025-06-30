import type { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text, Button, TextInput } from '@shared/index';
import { colors, spacing, verticalScale } from '@src/theme';

type AuthStackParamList = {
  LoginScreen: undefined;
  SignUp: undefined;
};

type WelcomeScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'LoginScreen'
>;

interface WelcomeScreenProps {
  navigation: WelcomeScreenNavigationProp;
}

const LoginScreen = ({ navigation: _navigation }: WelcomeScreenProps) => {
  return (
    <Layout>
      <Layout.Body>
        <Text variant="title" tx="login.title" />
        <Text variant="subtitle" style={styles.subtitle} tx={'login.welcome'} />

        <TextInput
          onChangeText={txt => console.log(txt, 'jfhfh1')}
          labelTx="login.email"
          placeholderTx={'login.emailPlaceholder'}
        />
        <TextInput
          labelTx="login.password"
          placeholderTx={'login.passwordPlaceholder'}
        />

        <Button
          tx={'login.signIn'}
          onPress={() => console.log('Sign In Pressed')}
          style={styles.button}
        />
      </Layout.Body>
    </Layout>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    marginBottom: verticalScale(spacing.l),
    color: colors.placeholder,
  },
  button: {
    marginTop: verticalScale(spacing.m),
  },
});

export default LoginScreen;
