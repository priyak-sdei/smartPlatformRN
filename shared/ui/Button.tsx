import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
} from 'react-native';
import Text from './Text';
import { fonts, moderateScale, spacing, useTheme } from '../theme';

interface ButtonProps extends TouchableOpacityProps {
  title?: string;
  tx?: string;
  txOptions?: import('i18next').TOptions; // Use the TOptions type from i18next
  style?: ViewStyle;
  textStyle?: TextStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  tx,
  txOptions,
  style,
  textStyle,
  leftIcon,
  rightIcon,
  disabled = true,
  ...props
}) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  return (
    <TouchableOpacity
      style={[styles.button, style, disabled && styles.disabled]}
      activeOpacity={0.8}
      {...props}
    >
      {leftIcon && <>{leftIcon}</>}
      <Text style={[styles.text, textStyle]} tx={tx} txOptions={txOptions}>
        {title}
      </Text>
      {rightIcon && <>{rightIcon}</>}
    </TouchableOpacity>
  );
};

const getStyles = (theme: any) =>
  StyleSheet.create({
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.primary,
      paddingVertical: moderateScale(spacing.s),
      paddingHorizontal: moderateScale(spacing.l),
      borderRadius: moderateScale(spacing.xxs),
      marginVertical: moderateScale(spacing.xxs),
      width: '100%',
    },
    text: {
      color: theme.colors.background,
      fontFamily: fonts.bold,
      marginHorizontal: moderateScale(spacing.xxs),
    },
    disabled: {
      opacity: 0.6,
    },
  });

export default Button;
