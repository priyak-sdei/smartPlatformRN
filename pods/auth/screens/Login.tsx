import type { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Layout, Text, Button, TextInput } from '@shared/index';
import { colors, moderateScale, spacing, verticalScale } from '@shared/theme';
import { IMAGES } from '@shared/theme';

type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  Welcome: undefined;
};

type LoginPropsNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'Login'
>;

interface LoginProps {
  navigation: LoginPropsNavigationProp;
}

const Login = ({ navigation: _navigation }: LoginProps) => {
  return (
    <Layout>
      <Layout.Header />
      <Layout.Body scrollable={true}>
        <Image
          source={IMAGES.auth.logo}
          style={styles.logo}
          resizeMode="contain"
        />
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
          onPress={() => _navigation.navigate('SignUp')}
          style={styles.button}
        />
      </Layout.Body>
    </Layout>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: moderateScale(80),
    height: moderateScale(80),
    alignSelf: 'center',
    marginBottom: verticalScale(spacing.l),
    borderRadius: moderateScale(5),
  },
  subtitle: {
    marginBottom: verticalScale(spacing.l),
    color: colors.placeholder,
  },
  button: {
    marginTop: verticalScale(spacing.m),
  },
});

export default Login;
