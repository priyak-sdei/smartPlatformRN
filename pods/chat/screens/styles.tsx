import { spacing, verticalScale } from '@src/theme';
import { StyleSheet } from 'react-native';

/**
 * Styles for the chat screens.
 * This file contains styles for the conversation screen and chat list screen.
 */
export const getStyles = (theme: any) =>
  StyleSheet.create({
    keyboardAvoidingView: {
      flex: 1,
    },
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    messagesContainer: {
      flex: 1,
    },
    bottomInputContainer: {
      paddingBottom: verticalScale(spacing.xxs),
    },
  });
