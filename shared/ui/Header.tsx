import React, { ReactElement } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ViewProps,
  ViewStyle,
} from 'react-native';
import Text from './Text';
import { fonts, moderateScale, spacing, colors } from '../theme';

interface HeaderProps extends ViewProps {
  title?: string;
  leftIcon?: ReactElement;
  leftIconColor?: string;
  centerComponent?: ReactElement;
  rightComponent?: ReactElement;
  noBottomBorder?: boolean;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  style?: ViewStyle;
}

const Header: React.FC<HeaderProps> = ({
  title,
  leftIcon,
  centerComponent,
  rightComponent,
  noBottomBorder,
  onLeftPress,
  onRightPress,
  style,
  ...rest
}) => {
  return (
    <View
      style={[styles.container, !noBottomBorder && styles.bottomBorder, style]}
      {...rest}
    >
      <View style={styles.side}>
        {leftIcon ? (
          <TouchableOpacity
            onPress={onLeftPress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            {leftIcon}
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={styles.center}>
        {centerComponent
          ? centerComponent
          : !!title && (
              <Text style={styles.title} numberOfLines={1}>
                {title}
              </Text>
            )}
      </View>
      <View style={styles.side}>
        {rightComponent ? (
          <TouchableOpacity
            onPress={onRightPress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            {rightComponent}
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: moderateScale(80),
    backgroundColor: colors.background,
    paddingHorizontal: moderateScale(spacing.s),
    justifyContent: 'space-between',
  },
  bottomBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  side: {
    width: moderateScale(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 0,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: moderateScale(18),
    color: colors.text,
    textAlign: 'center',
  },
});

export default Header;
