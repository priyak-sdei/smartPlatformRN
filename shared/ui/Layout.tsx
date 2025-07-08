import React, { ReactNode } from 'react';
import {
  ScrollViewProps,
  StatusBar,
  StyleSheet,
  View,
  ViewProps,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, spacing, useTheme } from '../theme';
import Header from './Header';

interface LayoutProps extends ViewProps {
  children: ReactNode;
  hideStatusBar?: boolean;
  fullScreen?: boolean;
}

interface LayoutBodyProps extends ViewProps, ScrollViewProps {
  scrollable?: boolean;
  children: ReactNode;
}

const Body: React.FC<LayoutBodyProps> = ({
  children,
  style,
  scrollable = false,
  ...props
}) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  return scrollable ? (
    <KeyboardAwareScrollView
      style={[styles.body, style]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      {...props}
    >
      {children}
    </KeyboardAwareScrollView>
  ) : (
    <View style={[styles.body, style]} {...props}>
      {children}
    </View>
  );
};

const Layout: React.FC<LayoutProps> & {
  Header: typeof Header;
  Body: typeof Body;
} = ({
  children,
  style,
  hideStatusBar = false,
  fullScreen = false,
  ...props
}) => {
  const { theme, isDark } = useTheme();
  const styles = getStyles(theme);

  return fullScreen ? (
    <View style={[styles.safeArea, style]} {...props}>
      <StatusBar hidden={hideStatusBar} translucent />
      {children}
    </View>
  ) : (
    <SafeAreaView
      style={[styles.safeArea, style]}
      edges={['top', 'left', 'right']}
      {...props}
    >
      <StatusBar
        backgroundColor={theme.colors.background}
        barStyle={isDark ? 'light-content' : 'dark-content'}
        hidden={hideStatusBar}
      />
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  );
};

Layout.Header = Header;
Layout.Body = Body;

const getStyles = (theme: any) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },

    container: {
      flex: 1,
    },
    body: {
      flex: 1,
      padding: moderateScale(spacing.s),
      backgroundColor: theme.colors.background,
    },

    contentContainer: {
      flexGrow: 1,
    },
  });

export default Layout;
