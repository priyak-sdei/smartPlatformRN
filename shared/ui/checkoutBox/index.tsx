import React from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Text from '../Text';
import { useTheme, moderateScale, spacing, fonts } from '@shared/theme';
import { Path, Svg } from 'react-native-svg';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  labelTx?: string;
  style?: ViewStyle;
  labelStyle?: TextStyle;
  disabled?: boolean;
  // Customization
  boxColor?: string;
  checkedBoxColor?: string;
  checkColor?: string;
  disabledBoxColor?: string;
  renderBox?: (checked: boolean, disabled: boolean) => React.ReactNode;
  renderCheck?: () => React.ReactNode;
  renderLabel?: (
    label: string | undefined,
    labelTx: string | undefined,
    checked: boolean,
    disabled: boolean,
  ) => React.ReactNode;
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  labelTx,
  style,
  labelStyle,
  disabled = false,
  boxColor,
  checkedBoxColor,
  checkColor,
  disabledBoxColor,
  renderBox,
  renderCheck,
  renderLabel,
}) => {
  const { theme } = useTheme();
  const styles = getStyles(theme, {
    boxColor,
    checkedBoxColor,
    checkColor,
    disabledBoxColor,
  });

  // Default check icon
  function CheckIcon() {
    return (
      <Svg width={16} height={16} viewBox="0 0 20 20" fill="none">
        <Path
          d="M5 10.5L9 14.5L15 7.5"
          stroke={checkColor || theme.colors.background}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.container, style, disabled && styles.disabled]}
      onPress={() => !disabled && onChange(!checked)}
      activeOpacity={0.8}
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
      disabled={disabled}
    >
      {renderBox ? (
        renderBox(checked, disabled)
      ) : (
        <View
          style={[
            styles.box,
            checked && styles.boxChecked,
            disabled && styles.boxDisabled,
          ]}
        >
          {checked ? renderCheck ? renderCheck() : <CheckIcon /> : null}
        </View>
      )}
      {(label || labelTx) &&
        (renderLabel ? (
          renderLabel(label, labelTx, checked, disabled)
        ) : (
          <Text style={[styles.label, labelStyle]} tx={labelTx}>
            {label}
          </Text>
        ))}
    </TouchableOpacity>
  );
};

const getStyles = (
  theme: any,
  colors?: {
    boxColor?: string;
    checkedBoxColor?: string;
    checkColor?: string;
    disabledBoxColor?: string;
  },
) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: moderateScale(spacing.xxs),
    },
    box: {
      width: moderateScale(22),
      height: moderateScale(22),
      borderRadius: moderateScale(4),
      borderWidth: 2,
      borderColor: colors?.boxColor || theme.colors.border,
      backgroundColor: colors?.boxColor || theme.colors.background,
      justifyContent: 'center',
      alignItems: 'center',
    },
    boxChecked: {
      borderColor: colors?.checkedBoxColor || theme.colors.primary,
      backgroundColor: colors?.checkedBoxColor || theme.colors.primary,
    },
    boxDisabled: {
      opacity: 0.5,
      backgroundColor: colors?.disabledBoxColor,
    },
    check: {
      width: moderateScale(12),
      height: moderateScale(12),
      backgroundColor: colors?.checkColor || theme.colors.background,
      borderRadius: moderateScale(2),
    },
    label: {
      marginLeft: moderateScale(spacing.xs),
      color: theme.colors.label,
      fontFamily: fonts.regular,
    },
    disabled: {
      opacity: 0.6,
    },
  });

export default Checkbox;
