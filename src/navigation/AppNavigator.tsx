import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigator from './AuthNavigator';
import TabNavigator from './TabNavigator';
import { useAppSelector } from '../redux/hooks';

const RootStack = createStackNavigator();

const AppNavigator = () => {
  const email = useAppSelector(state => state.user.email);
  return (
    <View testID="app-navigator-root" style={{ flex: 1 }}>
      <NavigationContainer>
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          {email ? (
            <RootStack.Screen name="MainTabs" component={TabNavigator} />
          ) : (
            <RootStack.Screen name="Auth" component={AuthNavigator} />
          )}
        </RootStack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default AppNavigator;
