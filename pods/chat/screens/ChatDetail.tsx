import { Layout } from '@shared/index';
import { Back } from '@shared/theme';
import React from 'react';
import { Platform, View } from 'react-native';
import BottomChatInput from '../components/bottomChatInput';
import ChatMessages from '../components/chatMessages';
import { useChatDetail } from '../hooks/useChatDetail';

import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { ChatNavigationProp, ChatRouteProp } from '../types';
import { getStyles } from './styles';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const styles = getStyles();
  const { item } = route.params;

  const {
    chatMessages,
    currentUserId,
    inputMessage,
    isSendDisabled,
    handleSendMessage,
    handleChangeMessageText,
    handleAttachImages,
  } = useChatDetail({
    ...item,
    id: String(item.id),
  });

  return (
    <Layout>
      <Layout.Header
        leftIcon={<Back />}
        onLeftPress={() => navigation.goBack()}
        title={item.name || t('Conversation')}
        style={styles.layoutHeader}
      />

      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}
      >
        <Layout.Body scrollable={false} style={styles.bodyContainer}>
          <ChatMessages messages={chatMessages} currentUserId={currentUserId} />
          <View style={styles.bottomInputContainer}>
            <BottomChatInput
              inputMessage={inputMessage}
              onChangeMessageText={handleChangeMessageText}
              onMessageSend={() => handleSendMessage(inputMessage)}
              onAttachMessage={handleAttachImages}
              isSendDisabled={isSendDisabled}
              placeholder="Type a message..."
            />
          </View>
        </Layout.Body>
      </KeyboardAvoidingView>
    </Layout>
  );
};

export default ChatDetail;
