import { moderateScale, spacing, useTheme } from '@shared/theme';
import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  elevation?: number;
  header?: React.ReactNode;
  footer?: React.ReactNode;
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
}

const Card: React.FC<CardProps> = ({
  children,
  style,
  elevation = 3,
  header,
  footer,
  backgroundColor,
  borderColor,
  borderWidth,
  borderRadius,
  padding,
  margin,
  shadowColor,
  shadowOffset,
  shadowOpacity,
  shadowRadius,
}) => {
  const { theme } = useTheme();
  const styles = getStyles(theme, {
    elevation,
    backgroundColor,
    borderColor,
    borderWidth,
    borderRadius,
    padding,
    margin,
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  });

  return (
    <View style={[styles.card, style]}>
      {header && <View style={styles.header}>{header}</View>}
      {children}
      {footer && <View style={styles.footer}>{footer}</View>}
    </View>
  );
};

const getStyles = (
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

export default Card;
