// Required:
// - @react-native-google-signin/google-signin (Google login)
// - @invertase/react-native-apple-authentication (Apple login)
// - Google: Add your webClientId in src/App.tsx and google-services.json in android/app/
// - Apple: Enable Sign In with Apple in Xcode and Apple Developer account, and configure Info.plist
//
// See documentation for each package for full setup instructions.
import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  Platform,
} from 'react-native';
import { GoogleIC, AppleIC } from '@assets/svg';
import { moderateScale, spacing, useTheme } from '@shared/theme';
import { useSocial } from './hooks/useSocial';

export type SocialProvider = 'google' | 'apple';

export interface SocialUser {
  id: string;
  name?: string;
  email?: string;
  imageUrl?: string;
  // Add more fields as needed
}

export interface SocialLoginResult {
  success: boolean;
  user?: SocialUser;
  provider: SocialProvider;
  error?: string;
}

interface SocialLoginButtonsProps {
  showGoogle?: boolean;
  showApple?: boolean;
  onResult?: (result: SocialLoginResult) => void;
  style?: ViewStyle;
}

const SocialLoginButtons: React.FC<SocialLoginButtonsProps> = ({
  showGoogle,
  showApple,
  onResult,
  style,
}) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const { handleGoogleLogin, handleAppleLogin } = useSocial({ onResult });

  return (
    <View style={[styles.container, style]}>
      {showGoogle && (
        <TouchableOpacity
          style={styles.iconButton}
          onPress={handleGoogleLogin}
          testID="google-login-btn"
        >
          <GoogleIC width={moderateScale(56)} height={moderateScale(56)} />
        </TouchableOpacity>
      )}
      {showApple && Platform.OS === 'ios' && (
        <TouchableOpacity
          style={styles.iconButton}
          onPress={handleAppleLogin}
          testID="apple-login-btn"
        >
          <AppleIC width={moderateScale(56)} height={moderateScale(56)} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const getStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: moderateScale(spacing.s),
      gap: moderateScale(spacing.s),
    },
    iconButton: {
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: theme.colors.text,
      marginHorizontal: moderateScale(spacing.xxxs),
    },
  });

export default SocialLoginButtons;
