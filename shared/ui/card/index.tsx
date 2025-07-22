import { moderateScale, spacing, useTheme } from '@shared/theme';
import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  elevation?: number;
}

const Card: React.FC<CardProps> = ({ children, style, elevation = 3 }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme, elevation);

  return <View style={[styles.card, style]}>{children}</View>;
};

const getStyles = (theme: any, elevation: number) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.colors.background,
      borderRadius: moderateScale(spacing.xs),
      padding: moderateScale(spacing.m),
      marginVertical: moderateScale(spacing.xxs),
      // Shadow for iOS
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.15,
      shadowRadius: elevation * 2,
      // Elevation for Android
      elevation,
    },
  });

export default Card;
