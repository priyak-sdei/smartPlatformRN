import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';

const AppNavigator = () => (
  <NavigationContainer>
    <AuthNavigator />
  </NavigationContainer>
);

export default AppNavigator;
