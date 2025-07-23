import { StyleSheet } from 'react-native';
import { moderateScale, spacing } from '@shared/theme';

export const getStyles = (
  theme: any,
  opts: {
    elevation?: number;
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
    borderRadius?: number;
    padding?: number;
    margin?: number;
    shadowColor?: string;
    shadowOffset?: { width: number; height: number };
    shadowOpacity?: number;
    shadowRadius?: number;
  },
) =>
  StyleSheet.create({
    card: {
      backgroundColor: opts.backgroundColor ?? theme.colors.background,
      borderRadius: opts.borderRadius ?? moderateScale(spacing.xs),
      padding: opts.padding ?? moderateScale(spacing.m),
      marginVertical: opts.margin ?? moderateScale(spacing.xxs),
      borderColor: opts.borderColor,
      borderWidth: opts.borderWidth,
      // Shadow for iOS
      shadowColor: opts.shadowColor ?? '#000',
      shadowOffset: opts.shadowOffset ?? { width: 0, height: 1 },
      shadowOpacity: opts.shadowOpacity ?? 0.15,
      shadowRadius: opts.shadowRadius ?? (opts.elevation ?? 3) * 2,
      // Elevation for Android
      elevation: opts.elevation ?? 3,
    },
    header: {
      marginBottom: moderateScale(spacing.xxs),
    },
    footer: {
      marginTop: moderateScale(spacing.xxs),
    },
  });
