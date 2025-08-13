import { Layout } from '@shared/index';
import { Back } from '@shared/theme';
import React from 'react';
import { Platform, View } from 'react-native';
import BottomChatInput from '../components/bottomChatInput';
import ChatMessages from '../components/chatMessages';
import { useConversation } from '../hooks/useConversation';

import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { ChatNavigationProp, ChatRouteProp } from '../types';
import { getStyles } from './styles';

/**
 * ConversationScreen component to display a chat conversation.
 * It includes a header, chat messages, and an input field for sending messages.
 *
 * @param {ChatDetailProps} props - The properties for the component.
 * @returns {JSX.Element} The rendered component.
 */
export type ChatDetailProps = {
  navigation: ChatNavigationProp<'ChatDetail'>;
  route: ChatRouteProp<'ChatDetail'>;
};

const ChatDetail = ({ navigation, route }: ChatDetailProps) => {
  // const { theme } = useTheme();
  const styles = getStyles();
  const { item } = route.params;

  const {
    messages,
    currentUserId,
    inputMessage,
    handleSendMessage,
    handleTextChange,
    handleAttach,
    isSendDisabled,
  } = useConversation({
    ...item,
    id: String(item.id),
  });

  return (
    <Layout>
      <Layout.Header
        leftIcon={<Back />}
        onLeftPress={() => navigation.goBack()}
        title={item.name || 'Conversation'}
        style={styles.layoutHeader}
      />

      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}
      >
        <Layout.Body scrollable={false} style={styles.bodyContainer}>
          <ChatMessages
            messages={messages}
            currentUserId={currentUserId}
            autoScroll={true}
          />
          <View style={styles.bottomInputContainer}>
            <BottomChatInput
              inputMessage={inputMessage}
              onChangeText={handleTextChange}
              onSend={() => handleSendMessage(inputMessage)}
              onAttach={handleAttach}
              isSendDisabled={isSendDisabled}
              placeholder="Type a message..."
              maxLength={1000}
            />
          </View>
        </Layout.Body>
      </KeyboardAvoidingView>
    </Layout>
  );
};

export default ChatDetail;
