import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@src/theme/themeProvider';
import { TextInput, Button } from '../../../shared';
import type { StackNavigationProp } from '@react-navigation/stack';

import { Text, Layout } from '@shared/index';
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
        <Text variant="title">Login</Text>
        <Text variant="subtitle" style={styles.subtitle}>
          We are happy to see you again.{'\n'}Enter your email address and
          password
        </Text>

        <TextInput
          onChangeText={txt => console.log(txt, 'jfhfh')}
          label="Email"
          placeholder="Enter email"
        />
        <TextInput label="Password" placeholder="Enter Password" />

        <Button
          title="Sign In"
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
