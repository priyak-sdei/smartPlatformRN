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
import { fonts, moderateScale, spacing, verticalScale, colors } from '../theme'; // Adjust the import path as needed

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
  ...props
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label ? <Text style={[styles.label, labelStyle]}>{label}</Text> : null}
      <View style={styles.inputRow}>
        {leftIcon ? <View style={styles.icon}>{leftIcon}</View> : null}
        <RNTextInput
          placeholderTextColor={colors.placeholder}
          selectionColor={colors.primary}
          ref={inputRef}
          style={[styles.input, style]}
          {...props}
          autoCapitalize="none"
        />
        {rightIcon ? (
          <TouchableOpacity style={styles.icon}>{rightIcon}</TouchableOpacity>
        ) : null}
      </View>
      {error ? <Text style={[styles.error, errorStyle]}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
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
    color: colors.label,
    fontSize: moderateScale(spacing.s),
    fontFamily: fonts.medium,
    borderColor: colors.inputBorder,
  },
  icon: {
    marginHorizontal: 4,
  },
  error: {
    fontSize: moderateScale(spacing.xs),
    marginTop: verticalScale(1),
    fontFamily: fonts.regular,
    color: colors.error,
  },
});

export default TextInput;
