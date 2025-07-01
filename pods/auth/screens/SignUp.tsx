import type { StackNavigationProp } from '@react-navigation/stack';
import { Button, Layout, Text, TextInput } from '@shared/index';
import { Back } from '@shared/theme';
import { moderateScale, spacing, verticalScale } from '@src/theme';
import React from 'react';
import { StyleSheet } from 'react-native';

type AuthStackParamList = {
  LoginScreen: undefined;
  SignUp: undefined;
};

type SignUpPropsNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'SignUp'
>;

interface SignUpProps {
  navigation: SignUpPropsNavigationProp;
}

const SignUp = ({ navigation: _navigation }: SignUpProps) => {
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

        <Button
          tx={'login.signUp'}
          onPress={() => _navigation.navigate('SignUp')}
          style={styles.button}
        />
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
});

export default SignUp;
