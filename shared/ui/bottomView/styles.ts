import { StyleSheet } from 'react-native';
import { moderateScale, spacing } from '@shared/theme';

export const getStyles = (theme: any) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.35)',
      justifyContent: 'flex-end',
    },
    sheet: {
      backgroundColor: theme.colors.background,
      borderTopLeftRadius: moderateScale(spacing.m),
      borderTopRightRadius: moderateScale(spacing.m),
      paddingHorizontal: moderateScale(spacing.m),
      paddingTop: moderateScale(spacing.s),
      paddingBottom: moderateScale(spacing.m),
      elevation: 6,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
    },
    handle: {
      alignSelf: 'center',
      width: moderateScale(44),
      height: moderateScale(5),
      borderRadius: moderateScale(3),
      backgroundColor: theme.colors.border,
      marginBottom: moderateScale(spacing.s),
    },
    handleHidden: {
      height: 0,
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: moderateScale(spacing.xs),
    },
    title: {
      flex: 1,
    },
    closeBtn: {
      padding: moderateScale(spacing.xs),
    },
    closeText: {
      fontSize: moderateScale(spacing.l),
      color: theme.colors.label,
    },
    content: {
      marginBottom: moderateScale(spacing.s),
    },
    footerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: moderateScale(spacing.xs) as any,
    },
    secondaryButton: {
      backgroundColor: theme.colors.transparent,
      borderWidth: 1,
      borderColor: theme.colors.border,
      flex: 1,
    },
    secondaryButtonText: {
      color: theme.colors.label,
    },
    primaryButton: {
      flex: 1,
    },
  });
