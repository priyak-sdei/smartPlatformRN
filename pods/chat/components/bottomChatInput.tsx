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
  onChangeText,
  onSend,
  onAttach,
  isSendDisabled,
  placeholder = 'Type a message...',
  maxLength = 1000,
}) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.bottomInputContainer}>
      <RNTextInput
        placeholderTextColor={theme.colors.placeholder}
        value={inputMessage}
        onChangeText={onChangeText}
        style={styles.input}
        autoCapitalize="sentences"
        autoCorrect={false}
        placeholder={placeholder}
        maxLength={maxLength}
      />
      <View style={styles.sendButtonContainer}>
        <Attach style={styles.attachIcon} onPress={onAttach} />
        <TouchableOpacity
          style={[
            styles.sendButton,
            isSendDisabled && styles.sendButtonDisabled,
          ]}
          onPress={onSend}
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
