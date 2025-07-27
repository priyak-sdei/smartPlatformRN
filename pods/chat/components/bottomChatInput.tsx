import { useTheme } from '@shared/theme';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  TextInput as RNTextInput,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Attach } from '../assets/svg';
import { useBottomChatInput } from '../hooks/useBottomChatInput';
import { BottomChatInputProps } from '../types/components';
import { getStyles } from './styles';

/**
 * BottomChatInput component for sending messages in a chat.
 * It includes an input field, send button, and an attach button.
 *
 * @param {BottomChatInputProps} props - The properties for the component.
 * @returns {JSX.Element} The rendered component.
 */
const BottomChatInput: React.FC<BottomChatInputProps> = ({
  onSendMessage,
  placeholder = 'Type a message...',
  maxLength = 1000,
}) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const {
    inputMessage,
    handleSend,
    handleTextChange,
    handleAttach,
    isSendDisabled,
  } = useBottomChatInput(onSendMessage, maxLength);

  return (
    <View style={styles.bottomInputContainer}>
      <RNTextInput
        placeholderTextColor={theme.colors.placeholder}
        value={inputMessage}
        onChangeText={handleTextChange}
        style={styles.input}
        autoCapitalize="sentences"
        autoCorrect={false}
        placeholder={placeholder}
      />
      <View style={styles.sendButtonContainer}>
        <Attach style={styles.attachIcon} onPress={handleAttach} />
        <TouchableOpacity
          style={[
            styles.sendButton,
            isSendDisabled && styles.sendButtonDisabled,
          ]}
          onPress={handleSend}
          disabled={isSendDisabled}
        >
          <Text
            style={[
              styles.sendButtonText,
              isSendDisabled && styles.sendButtonTextDisabled,
            ]}
          >
            {t('Send')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BottomChatInput;
