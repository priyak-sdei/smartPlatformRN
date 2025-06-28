import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthModule from '../screens/auth';
import {
  LoginScreen,
  WelcomeScreen,
  ForgotPasswordScreen,
  SignUpScreen,
} from '@pods/auth/index';

export type AuthStackParamList = {
  Auth: undefined;
  Login: undefined;
  Welcome: undefined;
  ForgotPassword: undefined;
  SignUp: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

const AuthNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Welcome" component={WelcomeScreen} />
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
    <Stack.Screen name="Auth" component={AuthModule} />
  </Stack.Navigator>
);

export default AuthNavigator;
