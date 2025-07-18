import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Login, Welcome, ForgotPassword, SignUp } from '@pods/auth/index';

export type AuthStackParamList = {
  Auth: undefined;
  Login: undefined;
  Welcome: undefined;
  ForgotPassword: undefined;
  SignUp: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

const AuthNavigator = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName="Welcome"
  >
    <Stack.Screen name="Welcome" component={Welcome} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    <Stack.Screen name="SignUp" component={SignUp} />
  </Stack.Navigator>
);

export default AuthNavigator;
