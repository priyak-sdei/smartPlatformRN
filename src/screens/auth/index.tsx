import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { fonts } from '../../theme';

const AuthModule = () => {
  const { theme } = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      testID="auth-index-root"
    >
      <Text style={[styles.text, { color: theme.colors.text }]}>
        Welcome to Smart Platform!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontFamily: fonts.regular, // Use the bold font from the theme
  },
});

export default AuthModule;
