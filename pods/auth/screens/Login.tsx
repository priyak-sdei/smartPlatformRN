import type { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Layout, Text, Button, TextInput } from '@shared/index';
import {
  colors,
  fonts,
  moderateScale,
  spacing,
  verticalScale,
} from '@shared/theme';
import { IMAGES } from '@shared/theme';
import { useTranslation } from 'react-i18next';
import { useLogin } from '../hooks/useLogin';

type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  Welcome: undefined;
};

type LoginPropsNavigationProp = StackNavigationProp<AuthStackParamList>;
interface LoginProps {
  navigation: LoginPropsNavigationProp;
}

const Login = ({ navigation: _navigation }: LoginProps) => {
  const { t } = useTranslation();
  const { email, password, setEmail, setPassword, login } = useLogin();

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
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          labelTx="login.email"
          placeholderTx={'login.emailPlaceholder'}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
          onSubmitEditing={login}
          returnKeyType="done"
          labelTx="login.password"
          placeholderTx={'login.passwordPlaceholder'}
        />
        <Text
          style={styles.forgotText}
          onPress={() => _navigation.navigate('ForgotPassword')}
          tx="login.forgotPassword"
        />
        <Button
          tx={'login.signIn'}
          onPress={() => _navigation.navigate('SignUp')}
          style={styles.button}
        />
        <Text
          style={styles.bottomText}
          onPress={() => _navigation.navigate('SignUp')}
        >
          {t('login.noAccount')}{' '}
          <Text style={styles.bottomTextBold}>{t('login.signUp')}</Text>
        </Text>
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
  bottomText: {
    textAlign: 'center',
    marginTop: verticalScale(spacing.xxs),
    color: colors.secondary,
    fontSize: moderateScale(spacing.s),
  },
  bottomTextBold: {
    fontFamily: fonts.medium,
  },
  forgotText: {
    textAlign: 'right',
    marginBottom: verticalScale(spacing.s),
    color: colors.primary,
    fontSize: moderateScale(spacing.s),
    marginTop: verticalScale(-spacing.xxs),
  },
});

export default Login;
