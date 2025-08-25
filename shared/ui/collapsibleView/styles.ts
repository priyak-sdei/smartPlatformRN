import { StyleSheet } from 'react-native';
import { fonts, moderateScale } from '@shared/theme';
import { Theme } from '@src/types/Theme';

export const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      borderColor: theme.colors.border,
      borderWidth: moderateScale(1),
      borderRadius: moderateScale(8),
      marginTop: moderateScale(16),
      marginHorizontal: moderateScale(16),
    },
    collapsibleHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: moderateScale(12),
      justifyContent: 'space-between',
    },
    collapsibleHeaderContent: {
      flex: 1,
      flexDirection: 'row',
      marginEnd: moderateScale(12),
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    collapsibleContent: {
      borderTopWidth: moderateScale(1),
      paddingVertical: moderateScale(12),
      marginHorizontal: moderateScale(12),
      borderTopColor: theme.colors.border,
    },
    collapsibleHeaderLabel: {
      fontFamily: fonts.medium,
      color: theme.colors.label,
      fontSize: moderateScale(16),
    },
    collapsibleHeaderValue: {
      fontFamily: fonts.regular,
      color: theme.colors.label,
      fontSize: moderateScale(16),
    },
  });
