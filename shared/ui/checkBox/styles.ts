import { StyleSheet } from 'react-native';
import { moderateScale, spacing, fonts } from '@shared/theme';

export const getStyles = (
  theme: any,
  colors?: {
    boxColor?: string;
    checkedBoxColor?: string;
    checkColor?: string;
    disabledBoxColor?: string;
  },
) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: moderateScale(spacing.xxs),
    },
    box: {
      width: moderateScale(22),
      height: moderateScale(22),
      justifyContent: 'center',
      alignItems: 'center',
    },
    boxChecked: {
      borderColor: colors?.checkedBoxColor || theme.colors.primary,
      backgroundColor: colors?.checkedBoxColor || theme.colors.primary,
    },
    boxDisabled: {
      opacity: 0.5,
      backgroundColor: colors?.disabledBoxColor,
    },
    check: {
      width: moderateScale(12),
      height: moderateScale(12),
      backgroundColor: colors?.checkColor || theme.colors.background,
      borderRadius: moderateScale(2),
    },
    label: {
      marginLeft: moderateScale(spacing.xs),
      color: theme.colors.label,
      fontFamily: fonts.regular,
    },
    disabled: {
      opacity: 0.6,
    },
  });
