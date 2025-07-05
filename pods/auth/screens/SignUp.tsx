import type { StackNavigationProp } from '@react-navigation/stack';
import { Button, Layout, Text, TextInput } from '@shared/index';
import { Back } from '@shared/theme';
import {
  moderateScale,
  spacing,
  verticalScale,
  fonts,
  useTheme,
} from '@shared/theme';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { useSignUp } from '../hooks/useSignUp';

type AuthStackParamList = {
  Login: undefined;
};

type SignUpPropsNavigationProp = StackNavigationProp<AuthStackParamList>;

interface SignUpProps {
  navigation: SignUpPropsNavigationProp;
}

const SignUp = ({ navigation: _navigation }: SignUpProps) => {
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    handleSignUp,
    isValid,
  } = useSignUp();
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = getStyles(theme);
  return (
    <Layout>
      <Layout.Header
        leftIcon={<Back />}
        onLeftPress={() => _navigation.goBack()}
      />
      <Layout.Body scrollable={true}>
        <Text variant="title" tx="login.signUp" style={styles.titleMargin} />
        <TextInput
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          labelTx="auth.name"
          placeholderTx={'auth.name'}
        />
        <TextInput
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          labelTx="login.email"
          placeholderTx={'login.email'}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          labelTx="auth.createPassword"
          placeholderTx={'auth.createPassword'}
        />
        <TextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={true}
          labelTx="auth.confirmPassword"
          placeholderTx={'auth.confirmPassword'}
        />

        <Button
          tx={'login.signUp'}
          style={styles.button}
          onPress={handleSignUp}
          disabled={!isValid()}
        />

        <Text
          style={styles.bottomText}
          onPress={() => _navigation.navigate('Login')}
        >
          {t('login.alreadyAccount')}{' '}
          <Text style={styles.bottomTextBold}>{t('login.signIn')}</Text>
        </Text>
      </Layout.Body>
    </Layout>
  );
};

const getStyles = (theme: any) =>
  StyleSheet.create({
    button: {
      marginTop: verticalScale(spacing.m),
    },
    titleMargin: {
      marginBottom: moderateScale(spacing.s),
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
  });

export default SignUp;
