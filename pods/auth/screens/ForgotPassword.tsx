import { Button, Layout, Text, TextInput } from '@shared/index';
import { Back } from '@shared/theme';
import { moderateScale, spacing, verticalScale } from '@src/theme';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useForgotPassword } from '../hooks/useForgotPassword';
import type { AuthNavigationProp } from '../types';

interface ForgotPasswordProps {
  navigation: AuthNavigationProp<'ForgotPassword'>;
}
const ForgotPassword = ({ navigation: _navigation }: ForgotPasswordProps) => {
  const { email, setEmail, handleForgotPassword, isValid } =
    useForgotPassword();
  return (
    <Layout>
      <Layout.Header
        leftIcon={<Back />}
        onLeftPress={() => _navigation.goBack()}
      />
      <Layout.Body scrollable={true}>
        <Text
          variant="title"
          tx="login.forgetPassword"
          style={styles.titleMargin}
        />

        <TextInput
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          labelTx="login.email"
          placeholderTx={'login.emailPlaceholder'}
        />

        <Button
          tx={'login.restLink'}
          onPress={() => {
            handleForgotPassword();
            _navigation.navigate('SignUp');
          }}
          style={styles.button}
          disabled={!isValid()}
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

export default ForgotPassword;
