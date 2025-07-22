import { moderateScale, spacing, useTheme } from '@shared/theme';
import React from 'react';
import {
  Modal as RNModal,
  View,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
} from 'react-native';

interface ModalProps {
  visible: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  overlayStyle?: StyleProp<ViewStyle>;
  dismissOnOverlayPress?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  visible,
  onRequestClose,
  children,
  style,
  overlayStyle,
  dismissOnOverlayPress = true,
}) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onRequestClose}
    >
      <TouchableOpacity
        style={[styles.overlay, overlayStyle]}
        activeOpacity={1}
        onPress={dismissOnOverlayPress ? onRequestClose : undefined}
      >
        <View style={[styles.modal, style]}>{children}</View>
      </TouchableOpacity>
    </RNModal>
  );
};

const getStyles = (theme: any) =>
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

export default Modal;
