import { useTheme } from '@shared/theme';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Image, Text, View } from 'react-native';
import { getStyles } from './styles';
import { ChatMessagesProps, Message } from '../types';

/**
 * ChatMessages component to display a list of chat messages.
 *
 * @param {ChatMessagesProps} props - The properties for the component.
 * @returns {JSX.Element} The rendered component.
 */
const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  currentUserId,
}) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = getStyles(theme);

  // Render each message item
  const renderMessageItem = ({ item }: { item: Message }) => {
    const isCurrentUser = item.user._id === currentUserId;
    const messageTime = new Date(item.createdAt).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    const defaultAvatar =
      'https://via.placeholder.com/40x40/cccccc/ffffff?text=U';

    return (
      <View
        style={[
          styles.messageContainer,
          isCurrentUser ? styles.senderContainer : styles.recieverContainer,
        ]}
      >
        {!isCurrentUser && (
          <Image
            source={{ uri: item.user.avatar || defaultAvatar }}
            style={styles.avatar}
          />
        )}

        <View
          style={[
            styles.messageBubble,
            isCurrentUser ? styles.senderBubble : styles.recieverBubble,
          ]}
        >
          {item.text?.startsWith('file://') ||
          item.text?.startsWith('data:image') ? (
            <Image source={{ uri: item.text }} style={styles.messageImage} />
          ) : (
            <Text
              style={[
                styles.messageText,
                isCurrentUser ? styles.senderText : styles.recieverText,
              ]}
            >
              {item.text}
            </Text>
          )}
          <Text
            style={[
              styles.messageTime,
              isCurrentUser ? styles.senderText : styles.recieverText,
            ]}
          >
            {messageTime}
          </Text>
        </View>

        {isCurrentUser && (
          <Image
            source={{ uri: item.user.avatar || defaultAvatar }}
            style={styles.avatar}
          />
        )}
      </View>
    );
  };

  if (!messages?.length) {
    return (
      <View style={styles.emptyChatContainer}>
        <Text style={styles.emptyText}>
          {t(`No messages yet. \n Start the conversation!`)}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.chatContainer}>
      <FlatList
        data={[...messages].reverse()}
        inverted={true}
        renderItem={renderMessageItem}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ChatMessages;
