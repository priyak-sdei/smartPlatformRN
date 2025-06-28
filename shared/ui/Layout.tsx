import { moderateScale, spacing } from '@src/theme';
import React, { ReactNode } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  ViewProps,
  ScrollViewProps,
} from 'react-native';

interface LayoutProps extends ViewProps {
  children: ReactNode;
}

interface LayoutHeaderProps extends ViewProps {
  children: ReactNode;
}

interface LayoutBodyProps extends ViewProps, ScrollViewProps {
  scrollable?: boolean;
  children: ReactNode;
}

const Header: React.FC<LayoutHeaderProps> = ({ children, style, ...props }) => (
  <View style={[styles.header, style]} {...props}>
    {children}
  </View>
);

const Body: React.FC<LayoutBodyProps> = ({
  children,
  style,
  scrollable = false,
  ...props
}) =>
  scrollable ? (
    <ScrollView
      style={[styles.body, style]}
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      {...props}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.body, style]} {...props}>
      {children}
    </View>
  );

// Compound component pattern
const Layout: React.FC<LayoutProps> & {
  Header: typeof Header;
  Body: typeof Body;
} = ({ children, style, ...props }) => (
  <View style={[styles.container, style]} {...props}>
    {children}
  </View>
);

Layout.Header = Header;
Layout.Body = Body;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },
  body: {
    flex: 1,
    padding: moderateScale(spacing.xs),
  },
});

export default Layout;
