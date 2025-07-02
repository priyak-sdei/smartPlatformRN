import React from 'react';
import {
  View,
  TouchableOpacity,
  TextInput as RNTextInput,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  TextStyle,
  StyleProp,
} from 'react-native';
import Text from './Text';
import {
  fonts,
  moderateScale,
  spacing,
  verticalScale,
  useTheme,
} from '../theme'; // Adjust the import path as needed
import { TxKeyPath } from '@src/i18n';
import { useTranslation } from 'react-i18next';

interface CustomTextInputProps extends TextInputProps {
  label?: string; // Label above the input
  error?: string; // Error message below the input
  helperText?: string; // Helper or hint text below the input (when no error)
  leftIcon?: React.ReactNode; // Icon or element on the left side
  rightIcon?: React.ReactNode; // Icon or element on the right side
  containerStyle?: ViewStyle; // Style for the outer container
  labelStyle?: StyleProp<TextStyle>; // Style for the label text
  errorStyle?: TextStyle; // Style for the error text
  helperTextStyle?: TextStyle; // Style for the helper text
  inputRef?: React.Ref<RNTextInput>; // Ref forwarding for focus/blur
  labelTx?: string;
  txOptions?: import('i18next').TOptions; // Use the TOptions type from i18next
  placeholderTx?: TxKeyPath;
}

const TextInput: React.FC<CustomTextInputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  containerStyle,
  labelStyle,
  errorStyle,
  inputRef,
  style,
  labelTx,
  placeholderTx,
  txOptions,
  ...props
}) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const i18nPlaceholder = placeholderTx ? t(placeholderTx) : props.placeholder;

  return (
    <View style={[styles.container, containerStyle]}>
      {label || labelTx ? (
        <Text
          style={[styles.label, labelStyle]}
          tx={labelTx}
          txOptions={txOptions}
        >
          {label}
        </Text>
      ) : null}
      <View style={styles.inputRow}>
        {leftIcon ? <View style={styles.icon}>{leftIcon}</View> : null}
        <RNTextInput
          placeholderTextColor={theme.colors.placeholder}
          selectionColor={theme.colors.primary}
          ref={inputRef}
          style={[styles.input, style]}
          {...props}
          autoCapitalize="none"
          placeholder={i18nPlaceholder}
        />
        {rightIcon ? (
          <TouchableOpacity style={styles.icon}>{rightIcon}</TouchableOpacity>
        ) : null}
      </View>
      {error ? <Text style={[styles.error, errorStyle]}>{error}</Text> : null}
    </View>
  );
};

const getStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      marginBottom: verticalScale(spacing.s),
      width: '100%',
    },
    label: {
      marginBottom: verticalScale(spacing.xxs),
    },
    inputRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    input: {
      flex: 1,
      borderWidth: moderateScale(1),
      borderRadius: moderateScale(8),
      padding: moderateScale(spacing.xs),
      color: theme.colors.label,
      fontSize: moderateScale(spacing.s),
      fontFamily: fonts.medium,
      borderColor: theme.colors.inputBorder,
    },
    icon: {
      marginHorizontal: 4,
    },
    error: {
      fontSize: moderateScale(spacing.xs),
      marginTop: verticalScale(1),
      fontFamily: fonts.regular,
      color: theme.colors.error,
    },
  });

export default TextInput;
