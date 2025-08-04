import type { AuthNavigationProp } from '../types';
import React, { useEffect } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Layout, Text, Button, TextInput } from '@shared/index';
import {
  fonts,
  moderateScale,
  spacing,
  verticalScale,
  useTheme,
} from '@shared/theme';

import { IMAGES } from '@shared/theme';
import { useTranslation } from 'react-i18next';
import { useLogin } from '../hooks/useLogin';
import SocialLoginButtons from '@pods/social/SocialLoginButtons';
interface LoginProps {
  navigation: AuthNavigationProp<'Login'>;
}

const Login = ({ navigation: _navigation }: LoginProps) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const { t } = useTranslation();
  const { email, password, setEmail, setPassword, login, isValid } = useLogin();
  useEffect(() => {
    const logBuildEnvironment = () => {
      const env = process.env.ENV;
      const env1 = process.env;

      console.log(`Current build environment: ${env}`);
      console.log(`Current build env1: ${JSON.stringify(env1)}`);
    };

    logBuildEnvironment();
  }, []);
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
        <SocialLoginButtons
          showGoogle
          showApple
          onResult={result => {
            console.log('Social login result:', result);
          }}
          style={styles.socialContainer}
        />
        <Button
          tx={'login.signIn'}
          onPress={() => login()}
          style={styles.button}
          disabled={!isValid()}
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

const getStyles = (theme: any) =>
  StyleSheet.create({
    logo: {
      width: moderateScale(80),
      height: moderateScale(80),
      alignSelf: 'center',
      marginBottom: verticalScale(spacing.l),
      borderRadius: moderateScale(5),
    },
    subtitle: {
      marginBottom: verticalScale(spacing.l),
      color: theme.colors.placeholder,
    },
    button: {
      marginTop: verticalScale(spacing.m),
    },
    bottomText: {
      textAlign: 'center',
      marginTop: verticalScale(spacing.xxs),
      color: theme.colors.secondary,
      fontSize: moderateScale(spacing.s),
    },
    bottomTextBold: {
      fontFamily: fonts.medium,
    },
    forgotText: {
      textAlign: 'right',
      marginBottom: verticalScale(spacing.s),
      color: theme.colors.primary,
      fontSize: moderateScale(spacing.s),
      marginTop: verticalScale(-spacing.xxs),
    },
    socialContainer: {
      marginVertical: moderateScale(spacing.s),
    },
  });

export default Login;
