import { StyleSheet } from 'react-native';
import { fonts, moderateScale, spacing } from '@shared/theme';

export const getStyles = (theme: any) =>
  StyleSheet.create({
    horizontalContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
    },
    verticalContainer: {
      flexDirection: 'column',
    },
    option: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: moderateScale(spacing.xxs),
    },
    horizontalOption: {
      marginRight: moderateScale(spacing.m),
      marginBottom: moderateScale(spacing.xs),
      // Optionally, set a maxWidth or flexBasis for wrapping
      // maxWidth: '45%',
    },
    outerCircle: {
      width: moderateScale(22),
      height: moderateScale(22),
      borderRadius: moderateScale(11),
      borderWidth: 2,
      borderColor: theme.colors.border,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
    outerCircleSelected: {
      borderColor: theme.colors.primary,
    },
    innerCircle: {
      width: moderateScale(12),
      height: moderateScale(12),
      borderRadius: moderateScale(6),
      backgroundColor: theme.colors.primary,
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
