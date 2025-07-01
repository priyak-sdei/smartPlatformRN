import type { StackNavigationProp } from '@react-navigation/stack';
import { Button, Layout, Text, TextInput } from '@shared/index';
import { Back } from '@shared/theme';
import { moderateScale, spacing, verticalScale } from '@src/theme';
import React from 'react';
import { StyleSheet } from 'react-native';
type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
};

type ForgotPasswordPropsNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'Login'
>;

interface ForgotPasswordProps {
  navigation: ForgotPasswordPropsNavigationProp;
}
const ForgotPassword = ({ navigation: _navigation }: ForgotPasswordProps) => {
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
          onChangeText={txt => console.log(txt, 'jfhfh1')}
          labelTx="login.email"
          placeholderTx={'login.emailPlaceholder'}
        />

        <Button
          tx={'login.restLink'}
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

export default ForgotPassword;
