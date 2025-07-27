import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigator from './AuthNavigator';
import TabNavigator from './TabNavigator';
import { useAppSelector } from '../redux/hooks';
import { ChatDetail } from '@pods/chat/index';
const RootStack = createStackNavigator();

const AppNavigator = () => {
  //add login logic here
  // For now, we will use a simple check for email in the Redux store
  // In a real application, you would likely check for an authentication token or similar
  // This is just a placeholder for demonstration purposes
  // You can replace this with your actual authentication logic
  const email = useAppSelector(state => state.user.email);
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {email ? (
          <RootStack.Screen name="MainTabs" component={TabNavigator} />
        ) : (
          <RootStack.Screen name="Auth" component={AuthNavigator} />
        )}
        <RootStack.Screen name="ChatDetail" component={ChatDetail} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
