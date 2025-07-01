import type { StackNavigationProp } from '@react-navigation/stack';
import { Button, Layout, Text, TextInput } from '@shared/index';
import { Back } from '@shared/theme';
import {
  moderateScale,
  spacing,
  verticalScale,
  colors,
  fonts,
} from '@src/theme';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

type AuthStackParamList = {
  Login: undefined;
};

type SignUpPropsNavigationProp = StackNavigationProp<AuthStackParamList>;

interface SignUpProps {
  navigation: SignUpPropsNavigationProp;
}

const SignUp = ({ navigation: _navigation }: SignUpProps) => {
  const { t } = useTranslation();
  return (
    <Layout>
      <Layout.Header
        leftIcon={<Back />}
        onLeftPress={() => _navigation.goBack()}
      />
      <Layout.Body scrollable={true}>
        <Text variant="title" tx="login.signUp" style={styles.titleMargin} />

        <TextInput
          onChangeText={txt => console.log(txt, 'jfhfh1')}
          labelTx="auth.name"
          placeholderTx={'auth.name'}
        />
        <TextInput
          onChangeText={txt => console.log(txt, 'jfhfh1')}
          labelTx="login.email"
          placeholderTx={'login.email'}
        />
        <TextInput
          labelTx="auth.createPassword"
          placeholderTx={'auth.createPassword'}
        />
        <TextInput
          labelTx="auth.confirmPassword"
          placeholderTx={'auth.confirmPassword'}
        />

        <Button tx={'login.signUp'} style={styles.button} />

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

const styles = StyleSheet.create({
  button: {
    marginTop: verticalScale(spacing.m),
  },
  titleMargin: {
    marginBottom: moderateScale(spacing.s),
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
});

export default SignUp;
