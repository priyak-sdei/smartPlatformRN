import { spacing, verticalScale } from '@src/theme';
import { StyleSheet } from 'react-native';

/**
 * Styles for the chat screens.
 * This file contains styles for the conversation screen and chat list screen.
 */
export const getStyles = () =>
  StyleSheet.create({
    keyboardAvoidingView: {
      flex: 1,
    },
    layoutHeader: {
      paddingBottom: verticalScale(10),
    },
    bodyContainer: {
      padding: 0,
    },
    container: {
      flex: 1,
    },
    bottomInputContainer: {
      paddingBottom: verticalScale(spacing.s),
    },
  });
