import { StyleSheet } from 'react-native';
import { moderateScale, spacing } from '@shared/theme';

export const getStyles = (theme: any) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.3)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modal: {
      backgroundColor: theme.colors.background,
      borderRadius: moderateScale(spacing.xs),
      padding: moderateScale(spacing.l),
      minWidth: '70%',
      maxWidth: '90%',
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 6,
    },
  });
