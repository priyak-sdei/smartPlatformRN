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
  Alert,
  Platform,
} from 'react-native';
import { GoogleIC, AppleIC } from '@assets/svg';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import appleAuth from '@invertase/react-native-apple-authentication';
import { useTheme } from '@src/theme/ThemeProvider';
import { spacing, moderateScale } from '@src/theme';

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
  // Real Google login logic
  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      await GoogleSignin.signIn();
      const user = GoogleSignin.getCurrentUser()?.user;
      if (user) {
        onResult?.({
          success: true,
          user: {
            id: user.id,
            name: user.name || undefined,
            email: user.email || undefined,
            imageUrl: user.photo || undefined,
          },
          provider: 'google',
        });
      } else {
        throw new Error('Google user info not available');
      }
    } catch (error: any) {
      let errorMsg = 'Google login failed';
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        errorMsg = 'Google sign in was cancelled';
      } else if (error.code === statusCodes.IN_PROGRESS) {
        errorMsg = 'Google sign in is in progress';
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        errorMsg = 'Google Play Services not available or outdated';
      } else if (error.message) {
        errorMsg = error.message;
      }
      onResult?.({ success: false, provider: 'google', error: errorMsg });
    }
  };

  // Real Apple login logic
  const handleAppleLogin = async () => {
    if (Platform.OS !== 'ios') {
      Alert.alert('Apple Sign-In is only supported on iOS devices.');
      onResult?.({
        success: false,
        provider: 'apple',
        error: 'Apple Sign-In is only supported on iOS devices.',
      });
      return;
    }
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
      const user = {
        id: appleAuthRequestResponse.user,
        name: appleAuthRequestResponse.fullName
          ? `${appleAuthRequestResponse.fullName.givenName || ''} ${
              appleAuthRequestResponse.fullName.familyName || ''
            }`.trim()
          : undefined,
        email: appleAuthRequestResponse.email || undefined,
      };
      onResult?.({ success: true, user, provider: 'apple' });
    } catch (error: any) {
      const errorMsg = error?.message || 'Apple login failed';
      onResult?.({ success: false, provider: 'apple', error: errorMsg });
    }
  };

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
