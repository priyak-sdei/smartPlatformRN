import { useTheme } from '@shared/theme';
import { getStyles } from './styles';
import React from 'react';
import {
  Modal as RNModal,
  View,
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

export default Modal;
