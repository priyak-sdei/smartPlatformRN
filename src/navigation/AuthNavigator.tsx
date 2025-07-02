import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthModule from '../screens/auth';
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
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Welcome" component={Welcome} />

    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    <Stack.Screen name="SignUp" component={SignUp} />
    <Stack.Screen name="Auth" component={AuthModule} />
  </Stack.Navigator>
);

export default AuthNavigator;
