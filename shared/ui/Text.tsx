import React from 'react';
import { Text as RNText, StyleProp, TextProps, TextStyle } from 'react-native';
import { fonts, moderateScale, spacing, colors } from '../theme';

type Variant = 'title' | 'subtitle' | 'body';

const variantStyles: Record<Variant, TextStyle> = {
  title: {
    fontSize: moderateScale(spacing.l),
    fontFamily: fonts.bold,
    color: colors.secondary,
  },
  subtitle: {
    fontSize: moderateScale(spacing.s),
    fontFamily: fonts.medium,
    color: colors.label,
  },
  body: {
    fontSize: moderateScale(spacing.s),
    fontFamily: fonts.regular,
    color: colors.label,
  },
};

interface AppTextProps extends TextProps {
  variant?: Variant;
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
}
const Text: React.FC<AppTextProps> = ({
  variant = 'body',
  style,
  children,
  ...props
}) => {
  return (
    <RNText style={[variantStyles[variant], style]} {...props}>
      {children}
    </RNText>
  );
};

export default Text;
