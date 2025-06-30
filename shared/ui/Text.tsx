import React from 'react';
import { Text as RNText, StyleProp, TextProps, TextStyle } from 'react-native';
import { fonts, moderateScale, spacing, colors } from '../theme';
import { TxKeyPath } from '@src/i18n';
import { TOptions } from 'i18next';
import { useTranslation } from 'react-i18next';

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
  children?: React.ReactNode;
  /**
   * Text which is looked up via i18n.
   */
  tx?: TxKeyPath;
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: TOptions;
}
const Text: React.FC<AppTextProps> = ({
  variant = 'body',
  style,
  children,
  tx,
  txOptions,
  ...props
}) => {
  // const i18nText = tx && translate(tx, txOptions);
  const { t } = useTranslation();

  const i18nText = tx && t(tx, txOptions);
  const content = i18nText || children;

  return (
    <RNText style={[variantStyles[variant], style]} {...props}>
      {content}
    </RNText>
  );
};

export default Text;
