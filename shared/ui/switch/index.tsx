import { useTheme } from '@shared/theme';
import { moderateScale } from '@src/theme';
import React from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Animated,
  ViewStyle,
} from 'react-native';

interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  style?: ViewStyle;
  // Customizable color props
  trackColorOn?: string;
  trackColorOff?: string;
  thumbColor?: string;
  disabledColor?: string;
}

const SWITCH_WIDTH = moderateScale(48);
const SWITCH_HEIGHT = moderateScale(28);
const THUMB_SIZE = moderateScale(22);

const Switch: React.FC<SwitchProps> = ({
  value,
  onValueChange,
  disabled = false,
  style,
  trackColorOn,
  trackColorOff,
  thumbColor,
  disabledColor,
}) => {
  const { theme } = useTheme();
  const styles = getStyles(theme, {
    trackColorOn,
    trackColorOff,
    thumbColor,
    disabledColor,
  });

  return (
    <TouchableOpacity
      style={[styles.container, style, disabled && styles.disabled]}
      onPress={() => !disabled && onValueChange(!value)}
      activeOpacity={0.8}
      accessibilityRole="switch"
      accessibilityState={{ checked: value, disabled }}
      disabled={disabled}
    >
      <View
        style={[
          styles.track,
          value ? styles.trackOn : styles.trackOff,
          disabled && styles.trackDisabled,
        ]}
      >
        <Animated.View
          style={[
            styles.thumb,
            value ? styles.thumbOn : styles.thumbOff,
            {
              left: value
                ? SWITCH_WIDTH - THUMB_SIZE - moderateScale(3)
                : moderateScale(3),
            },
          ]}
        />
      </View>
    </TouchableOpacity>
  );
};

const getStyles = (
  theme: any,
  colors?: {
    trackColorOn?: string;
    trackColorOff?: string;
    thumbColor?: string;
    disabledColor?: string;
  },
) =>
  StyleSheet.create({
    container: {
      width: SWITCH_WIDTH,
      height: SWITCH_HEIGHT,
      justifyContent: 'center',
    },
    track: {
      width: SWITCH_WIDTH,
      height: SWITCH_HEIGHT,
      borderRadius: SWITCH_HEIGHT / 2,
      backgroundColor: colors?.trackColorOff || theme.colors.border,
      justifyContent: 'center',
    },
    trackOn: {
      backgroundColor: colors?.trackColorOn || theme.colors.primary,
    },
    trackOff: {
      backgroundColor: colors?.trackColorOff || theme.colors.border,
    },
    trackDisabled: {
      opacity: 0.5,
      backgroundColor: colors?.disabledColor,
    },
    thumb: {
      position: 'absolute',
      width: THUMB_SIZE,
      height: THUMB_SIZE,
      borderRadius: THUMB_SIZE / 2,
      backgroundColor: colors?.thumbColor || theme.colors.background,
      top: (SWITCH_HEIGHT - THUMB_SIZE) / 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 2,
    },
    thumbOn: {},
    thumbOff: {},
    disabled: {
      opacity: 0.6,
    },
  });

export default Switch;
