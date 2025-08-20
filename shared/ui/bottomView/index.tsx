import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, View, StyleProp, ViewStyle } from 'react-native';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import { useTheme } from '@shared/theme';
import Text from '../Text';
import Button from '../Button';
import { getStyles } from '@ui/bottomView/styles';

type ActionConfig = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

interface BottomViewProps {
  visible: boolean;
  onRequestClose: () => void;
  title?: string;
  children?: React.ReactNode;
  dismissOnOverlayPress?: boolean;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  overlayStyle?: StyleProp<ViewStyle>;
  showHandle?: boolean;
  showClose?: boolean;
  primaryAction?: ActionConfig;
  secondaryAction?: ActionConfig;
}

const BottomView: React.FC<BottomViewProps> = ({
  visible,
  onRequestClose,
  title,
  children,
  dismissOnOverlayPress = true,
  style,
  contentStyle,
  overlayStyle,
  showHandle = true,
  showClose = true,
  primaryAction,
  secondaryAction,
}) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const sheetRef = useRef<ActionSheetRef>(null);

  useEffect(() => {
    if (visible) sheetRef.current?.show();
    else sheetRef.current?.hide();
  }, [visible]);

  return (
    <ActionSheet
      ref={sheetRef}
      closeOnPressBack
      closeOnTouchBackdrop={dismissOnOverlayPress}
      onClose={onRequestClose}
      containerStyle={[styles.sheet, style] as any}
      indicatorStyle={showHandle ? styles.handle : (styles as any).handleHidden}
      gestureEnabled
      drawUnderStatusBar={false}
      overlayColor={
        (overlayStyle as any)?.backgroundColor || 'rgba(0,0,0,0.35)'
      }
    >
      <View>
        <View style={styles.headerRow}>
          {!!title && (
            <Text variant="title" style={styles.title}>
              {title}
            </Text>
          )}
          {showClose && (
            <TouchableOpacity
              onPress={() => {
                sheetRef.current?.hide();
                onRequestClose();
              }}
              style={styles.closeBtn}
            >
              <Text style={styles.closeText}>×</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={[styles.content, contentStyle]}>{children}</View>

        {(primaryAction || secondaryAction) && (
          <View style={styles.footerRow}>
            {secondaryAction && (
              <Button
                title={secondaryAction.label}
                onPress={secondaryAction.onPress}
                disabled={secondaryAction.disabled}
                style={[styles.secondaryButton, secondaryAction.style] as any}
                textStyle={styles.secondaryButtonText as any}
              />
            )}
            {primaryAction && (
              <Button
                title={primaryAction.label}
                onPress={primaryAction.onPress}
                disabled={primaryAction.disabled}
                style={[styles.primaryButton, primaryAction.style] as any}
              />
            )}
          </View>
        )}
      </View>
    </ActionSheet>
  );
};

export default BottomView;
