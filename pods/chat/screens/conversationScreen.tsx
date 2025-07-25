import { Layout } from '@shared/index';
import { Back, useTheme } from '@shared/theme';
import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import BottomChatInput from '../components/bottomChatInput';
import ChatMessages from '../components/chatMessages';
import { useConversation } from '../hooks/useConversation';

import { getStyles } from './styles';
import { ChatNavigationProp, ChatRouteProp } from '../types/navigation';

/**
 * ConversationScreen component to display a chat conversation.
 * It includes a header, chat messages, and an input field for sending messages.
 *
 * @param {ConversationScreenProps} props - The properties for the component.
 * @returns {JSX.Element} The rendered component.
 */
export type ConversationScreenProps = {
  navigation: ChatNavigationProp<'ConversationScreen'>;
  route: ChatRouteProp<'ConversationScreen'>;
};

const ConversationScreen = ({ navigation, route }: ConversationScreenProps) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const { item } = route.params;

  const { messages, currentUserId, handleSendMessage } = useConversation({
    ...item,
    id: String(item.id),
  });

  return (
    <Layout>
      <Layout.Header
        leftIcon={<Back />}
        onLeftPress={() => navigation.goBack()}
        title={item.name || 'Conversation'}
      />
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 10}
      >
        <Layout.Body scrollable={false}>
          <View style={styles.container}>
            <ChatMessages
              messages={messages}
              currentUserId={currentUserId}
              autoScroll={true}
            />

            <View style={styles.bottomInputContainer}>
              <BottomChatInput
                onSendMessage={handleSendMessage}
                placeholder="Type a message..."
                maxLength={1000}
              />
            </View>
          </View>
        </Layout.Body>
      </KeyboardAvoidingView>
    </Layout>
  );
};

export default ConversationScreen;
