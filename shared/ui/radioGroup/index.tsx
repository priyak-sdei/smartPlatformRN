import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Text from '../Text';
import { fonts, moderateScale, spacing, useTheme } from '@shared/theme';

interface RadioOption {
  label: string;
  value: string | number;
  labelTx?: string;
}

interface RadioGroupProps {
  options: RadioOption[];
  value: string | number | null;
  onChange: (value: string | number) => void;
  style?: ViewStyle;
  optionStyle?: ViewStyle;
  labelStyle?: TextStyle;
  disabled?: boolean;
  horizontal?: boolean; // New prop
  renderOption?: (
    option: RadioOption,
    selected: boolean,
    onPress: () => void,
    disabled: boolean,
  ) => React.ReactNode;
  renderLabel?: (option: RadioOption, selected: boolean) => React.ReactNode;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  value,
  onChange,
  style,
  optionStyle,
  labelStyle,
  disabled = false,
  horizontal = false, // New prop default
  renderOption,
  renderLabel,
}) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  return (
    <View
      style={[
        style,
        horizontal ? styles.horizontalContainer : styles.verticalContainer,
      ]}
    >
      {options.map(option => {
        const selected = value === option.value;
        const handlePress = () => !disabled && onChange(option.value);
        if (renderOption) {
          return (
            <React.Fragment key={option.value}>
              {renderOption(option, selected, handlePress, disabled)}
            </React.Fragment>
          );
        }
        return (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.option,
              optionStyle,
              disabled && styles.disabled,
              horizontal && styles.horizontalOption,
            ]}
            onPress={handlePress}
            activeOpacity={0.8}
            accessibilityRole="radio"
            accessibilityState={{ selected, disabled }}
            disabled={disabled}
          >
            <View
              style={[
                styles.outerCircle,
                selected && styles.outerCircleSelected,
              ]}
            >
              {selected && <View style={styles.innerCircle} />}
            </View>
            {renderLabel ? (
              renderLabel(option, selected)
            ) : (
              <Text style={[styles.label, labelStyle]} tx={option.labelTx}>
                {option.label}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const getStyles = (theme: any) =>
  StyleSheet.create({
    horizontalContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
    },
    verticalContainer: {
      flexDirection: 'column',
    },
    option: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: moderateScale(spacing.xxs),
    },
    horizontalOption: {
      marginRight: moderateScale(spacing.m),
      marginBottom: moderateScale(spacing.xs),
      // Optionally, set a maxWidth or flexBasis for wrapping
      // maxWidth: '45%',
    },
    outerCircle: {
      width: moderateScale(22),
      height: moderateScale(22),
      borderRadius: moderateScale(11),
      borderWidth: 2,
      borderColor: theme.colors.border,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
    outerCircleSelected: {
      borderColor: theme.colors.primary,
    },
    innerCircle: {
      width: moderateScale(12),
      height: moderateScale(12),
      borderRadius: moderateScale(6),
      backgroundColor: theme.colors.primary,
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

export default RadioGroup;
