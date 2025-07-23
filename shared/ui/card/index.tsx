import { useTheme } from '@shared/theme';
import React from 'react';
import { View, ViewStyle, StyleProp } from 'react-native';
import { getStyles } from './styles';

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  elevation?: number;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  customStyle?: Partial<
    Record<'card' | 'header' | 'footer', StyleProp<ViewStyle>>
  >;
}

const Card: React.FC<CardProps> = ({
  children,
  style,
  elevation = 3,
  header,
  footer,
  customStyle,
}) => {
  const { theme } = useTheme();
  const styles = getStyles(theme, { elevation });

  return (
    <View style={[styles.card, customStyle?.card, style]}>
      {header && (
        <View style={[styles.header, customStyle?.header]}>{header}</View>
      )}
      {children}
      {footer && (
        <View style={[styles.footer, customStyle?.footer]}>{footer}</View>
      )}
    </View>
  );
};

export default Card;
