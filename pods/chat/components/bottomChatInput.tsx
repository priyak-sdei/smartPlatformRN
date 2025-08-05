import { useTheme } from '@shared/theme';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  TextInput as RNTextInput,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { AttachIcon } from '../assets/svg';
import { BottomChatInputProps } from '../types';
import { getStyles } from './styles';

/**
 * BottomChatInput component for sending messages in a chat.
 * It includes an input field, send button, and an attach button.
 *
 * @param {BottomChatInputProps} props - The properties for the component.
 * @returns {JSX.Element} The rendered component.
 */
const BottomChatInput: React.FC<BottomChatInputProps> = ({
  inputMessage,
  onChangeMessageText,
  onMessageSend,
  onAttachMessage,
  isSendDisabled,
  placeholder = 'Type a message...',
}) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.bottomInputContainer}>
      <View style={styles.inputRow}>
        <RNTextInput
          placeholderTextColor={theme.colors.placeholder}
          value={inputMessage}
          onChangeText={onChangeMessageText}
          style={styles.bottomInput}
          autoCapitalize="sentences"
          autoCorrect={false}
          placeholder={placeholder}
          multiline={true}
          numberOfLines={5}
        />
        <View style={styles.sendButtonContainer}>
          <AttachIcon style={styles.attachIcon} onPress={onAttachMessage} />
          <TouchableOpacity
            style={[
              styles.sendButton,
              isSendDisabled && styles.sendButtonDisabled,
            ]}
            onPress={onMessageSend}
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
    </View>
  );
};

export default BottomChatInput;
