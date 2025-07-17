import { useCallback } from 'react';
import { Alert, Platform } from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import appleAuth from '@invertase/react-native-apple-authentication';

export type SocialProvider = 'google' | 'apple';

export interface SocialUser {
  id: string;
  name?: string;
  email?: string;
  imageUrl?: string;
}

export interface SocialLoginResult {
  success: boolean;
  user?: SocialUser;
  provider: SocialProvider;
  error?: string;
}

interface UseSocialLoginOptions {
  onResult?: (result: SocialLoginResult) => void;
}

export const useSocial = ({ onResult }: UseSocialLoginOptions = {}) => {
  // Google login handler
  const handleGoogleLogin = useCallback(async () => {
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
  }, [onResult]);

  // Apple login handler
  const handleAppleLogin = useCallback(async () => {
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
  }, [onResult]);

  return {
    handleGoogleLogin,
    handleAppleLogin,
  };
};
