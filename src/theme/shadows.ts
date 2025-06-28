import { StyleSheet } from 'react-native';
import { colors, moderateScale } from './index';

/*
 * generated with https://ethercreative.github.io/react-native-shadow-generator/
 * to get the same shadow on both platforms
 */
export const shadow = StyleSheet.create({
  primary: {
    elevation: 5,
    shadowColor: '#000000',
    shadowRadius: 3.84,
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  headerShadow: {
    shadowOffset: { width: 0, height: moderateScale(10) },
    shadowOpacity: 0.15,
    shadowRadius: moderateScale(4),
    shadowColor: colors.primary,
    elevation: moderateScale(15),
  },
});
