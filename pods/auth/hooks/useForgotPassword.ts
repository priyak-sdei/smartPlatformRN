import { useState } from 'react';

interface UseForgotPassword {
  email: string;
  setEmail: (val: string) => void;
  isLoading?: boolean;
  error?: string | null;
  successMessage?: string | null;
  handleForgotPassword: () => Promise<void>;
  validateForm?: () => boolean;
  isValid: () => boolean;
}

// Allow injection of async logic for testability
export const useForgotPassword = (
  requestPasswordReset?: (email: string) => Promise<void>
): UseForgotPassword => {
  const [email, setEmail] = useState('');

  const validateForm = () => {
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return false;
    }
    return true;
  };

  const defaultRequest = async (email: string) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Simulated password reset request successful for:', email);
  };

  const handleForgotPassword = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      await (requestPasswordReset || defaultRequest)(email);
      setEmail(''); // Optionally clear the email field on success
    } catch (err: any) {
      console.error('Forgot password error:', err);
    } finally {
    }
  };
  const isValid = () => validateForm();

  return {
    email,
    setEmail,
    handleForgotPassword,
    isValid,
  };
};
