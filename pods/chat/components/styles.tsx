import {
  fonts,
  horizontalScale,
  moderateScale,
  spacing,
  verticalScale,
} from '@shared/theme';
import { StyleSheet } from 'react-native';

/**
 * Styles for the chat components.
 * This file contains styles for search input, list component, chat messages, and bottom chat input.
 */
export const getStyles = (theme: any) =>
  StyleSheet.create({
    // seacrh styles
    searchContainer: {
      margin: moderateScale(spacing.xs),
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: moderateScale(spacing.s),
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    searchInput: {
      flex: 1,
      padding: moderateScale(spacing.xs),
      color: theme.colors.label,
      fontSize: moderateScale(spacing.s),
      fontFamily: fonts.medium,
      borderColor: theme.colors.inputBorder,
    },
    searchIcon: {
      margin: moderateScale(spacing.xs),
    },
    //list component styles
    container: {
      backgroundColor: theme.colors.background,
      flex: 1,
      marginHorizontal: moderateScale(spacing.xs),
    },
    listContainer: {
      flexDirection: 'row',
      paddingVertical: moderateScale(spacing.xs),
      paddingHorizontal: moderateScale(spacing.s),
      borderRadius: moderateScale(spacing.s),
    },
    content: {
      flex: 1,
      marginLeft: horizontalScale(spacing.xs),
      marginRight: horizontalScale(spacing.m),
    },
    timeContent: {
      flexDirection: 'column',
      alignItems: 'flex-end',
      minWidth: horizontalScale(50),
    },
    name: {
      color: theme.colors.label,
      fontSize: moderateScale(spacing.s),
      fontFamily: fonts.medium,
    },
    profileImage: {
      width: moderateScale(50),
      height: moderateScale(50),
      borderRadius: moderateScale(25),
    },
    message: {
      fontFamily: fonts.medium,
      color: theme.colors.label,
    },
    timeText: {
      fontFamily: fonts.regular,
      fontSize: moderateScale(spacing.xss),
      color: theme.colors.label,
    },
    isMessage: {
      backgroundColor: theme.colors.primary,
      height: moderateScale(spacing.sm),
      width: moderateScale(spacing.sm),
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: moderateScale(10),
      marginVertical: verticalScale(spacing.xxxs),
    },
    badgeText: {
      color: theme.colors.background,
      fontSize: moderateScale(spacing.xs),
      fontFamily: fonts.medium,
    },
    separator: {
      height: 1,
      backgroundColor: theme.colors.border,
      marginHorizontal: moderateScale(spacing.xs),
    },
    // chat messages styles
    chatContainer: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    emptyContainer: {
      flex: 1,
      backgroundColor: theme.colors.background,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyText: {
      fontSize: moderateScale(spacing.xs),
      color: theme.colors.placeholder,
      textAlign: 'center',
    },
    flatListContent: {
      flexGrow: 1,
    },
    messageContainer: {
      flex: 1,
      flexDirection: 'row',
      marginVertical: verticalScale(spacing.xxs),
      alignItems: 'flex-end',
    },
    senderContainer: {
      justifyContent: 'flex-end',
    },
    recieverContainer: {
      justifyContent: 'flex-start',
    },
    avatar: {
      width: moderateScale(25),
      height: moderateScale(25),
      borderRadius: moderateScale(13.5),
      margin: moderateScale(spacing.xxs),
    },
    messageBubble: {
      paddingVertical: verticalScale(spacing.xxs),
      paddingHorizontal: horizontalScale(spacing.xss),
      borderRadius: moderateScale(spacing.sm),
      backgroundColor: theme.colors.background,
      borderWidth: 1,
      maxWidth: '60%',
    },
    senderBubble: {
      backgroundColor: theme.colors.primary,
      borderBottomRightRadius: 4,
      borderColor: theme.colors.border,
    },
    recieverBubble: {
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.background,
      borderBottomLeftRadius: 4,
    },
    userName: {
      fontSize: moderateScale(spacing.xss),
      fontFamily: fonts.medium,
      color: theme.colors.text,
    },
    messageText: {
      fontSize: moderateScale(spacing.xss),
      fontFamily: fonts.regular,
      color: theme.colors.text,
    },
    messageTime: {
      fontSize: moderateScale(spacing.xss),
      marginTop: moderateScale(spacing.xxxxs),
      alignSelf: 'flex-end',
    },
    senderText: {
      color: theme.colors.background,
    },
    recieverText: {
      color: theme.colors.text,
    },
    messageImage: {
      width: moderateScale(150),
      height: moderateScale(150),
      borderRadius: moderateScale(8),
      resizeMode: 'cover',
    },

    // bottom chat input styles
    bottomInputContainer: {
      backgroundColor: theme.colors.border,
      marginHorizontal: horizontalScale(spacing.xs),
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: moderateScale(spacing.s),
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    input: {
      flex: 1,
      fontSize: moderateScale(spacing.s),
      color: theme.colors.text,
      paddingHorizontal: horizontalScale(spacing.xs),
      borderRadius: moderateScale(spacing.s),
    },
    inputDisabled: {
      opacity: 0.6,
      backgroundColor: theme.colors.background,
    },
    sendButton: {
      paddingHorizontal: horizontalScale(spacing.xs),
      paddingVertical: verticalScale(spacing.xs),
      borderRadius: moderateScale(spacing.s),
    },
    sendButtonDisabled: {
      opacity: 0.5,
    },
    sendButtonText: {
      color: theme.colors.primary,
      fontSize: moderateScale(spacing.s),
    },
    sendButtonTextDisabled: {
      color: theme.colors.placeholder,
    },
    sendButtonContainer: {
      flexDirection: 'row',
    },
    attachIcon: {
      marginVertical: verticalScale(spacing.xs),
    },
  });
