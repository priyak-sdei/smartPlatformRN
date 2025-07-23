import { StyleSheet } from 'react-native';
import { fonts, moderateScale, spacing } from '@shared/theme';

export const getStyles = (theme: any) =>
  StyleSheet.create({
    wrapper: {
      marginBottom: moderateScale(spacing.s),
    },
    title: {
      marginBottom: moderateScale(spacing.xxs),
      color: theme.colors.label,
      fontFamily: fonts.medium,
      fontSize: moderateScale(spacing.s),
    },
    required: {
      color: theme.colors.error,
    },
    dropdown: {
      height: moderateScale(48),
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: moderateScale(8),
      paddingHorizontal: moderateScale(spacing.s),
      backgroundColor: theme.colors.background,
    },
    dropdownFocus: {
      borderColor: theme.colors.primary,
    },
    errorBorder: {
      borderColor: theme.colors.error,
    },
    placeholder: {
      color: theme.colors.placeholder,
      fontFamily: fonts.regular,
      fontSize: moderateScale(spacing.s),
    },
    selectedText: {
      color: theme.colors.label,
      fontFamily: fonts.regular,
      fontSize: moderateScale(spacing.s),
    },
    iconStyle: {
      width: moderateScale(18),
      height: moderateScale(18),
      tintColor: theme.colors.label,
    },
    inputSearch: {
      color: theme.colors.label,
      fontFamily: fonts.regular,
      fontSize: moderateScale(spacing.s),
    },
    errorText: {
      color: theme.colors.error,
      fontFamily: fonts.regular,
      fontSize: moderateScale(spacing.xs),
      marginTop: moderateScale(spacing.xxs),
    },
  });
