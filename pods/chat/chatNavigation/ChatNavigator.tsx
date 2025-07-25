import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ChatListScreen from '../screens/chatListScreen';
import ConversationScreen from '../screens/conversationScreen';
import { ChatStackParamList } from '../types/navigation';

const Stack = createStackNavigator<ChatStackParamList>();

const ChatNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ChatList" component={ChatListScreen} />
      <Stack.Screen name="ConversationScreen" component={ConversationScreen} />
    </Stack.Navigator>
  );
};

export default ChatNavigator;
