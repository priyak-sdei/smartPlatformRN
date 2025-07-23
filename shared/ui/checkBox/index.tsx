import React from 'react';
import { TouchableOpacity, View, ViewStyle, TextStyle } from 'react-native';
import Text from '../Text';
import { useTheme } from '@shared/theme';
import { getStyles } from './styles';
import CheckSvg from '@src/assets/svg/check.svg';
import UncheckSvg from '@src/assets/svg/uncheck.svg';

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
  renderLabel,
}) => {
  const { theme } = useTheme();
  const styles = getStyles(theme, {
    boxColor,
    checkedBoxColor,
    checkColor,
    disabledBoxColor,
  });

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
        <View style={[styles.box, disabled && styles.boxDisabled]}>
          {checked ? (
            <CheckSvg width={20} height={20} />
          ) : (
            <UncheckSvg width={20} height={20} />
          )}
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

export default Checkbox;
