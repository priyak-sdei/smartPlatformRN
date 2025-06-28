import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
} from 'react-native';
import Text from './Text';
import { fonts, moderateScale, spacing, colors } from '../theme';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  title,
  style,
  textStyle,
  leftIcon,
  rightIcon,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      activeOpacity={0.8}
      {...props}
    >
      {leftIcon && <>{leftIcon}</>}
      <Text style={[styles.text, textStyle]}>{title}</Text>
      {rightIcon && <>{rightIcon}</>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: moderateScale(spacing.s),
    paddingHorizontal: moderateScale(spacing.l),
    borderRadius: moderateScale(spacing.xxs),
    marginVertical: moderateScale(spacing.xxs),
    width: '100%',
  },
  text: {
    color: colors.background,
    fontFamily: fonts.bold,
    marginHorizontal: moderateScale(spacing.xxs),
  },
});

export default Button;
