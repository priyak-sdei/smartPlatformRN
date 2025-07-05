import { useState } from 'react';

interface UseSignUp {
  email: string;
  setEmail: (val: string) => void;
  name: string;
  setName: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  confirmPassword: string;
  setConfirmPassword: (val: string) => void;
  handleSignUp: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
  isValid: () => boolean;
}

export const useSignUp = (): UseSignUp => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateForm = () => {
    if (
      !name.trim() ||
      !email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      !password ||
      !confirmPassword ||
      password.length < 6 ||
      password !== confirmPassword
    ) {
      return false;
    }
    return true;
  };

  const isValid = () => validateForm();
  const handleSignUp = async () => {
    if (!validateForm()) {
      return;
    }
    let data = {
      name,
      email,
      password,
    };
    console.log(data);

    setIsLoading(true);
    setError(null);

    try {
      // --- Simulate API Call ---
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
      // In a real app, you would call your authentication service here:
      // const response = await someAuthService.signUp({ name, email, password });
      // console.log('Sign up successful:', response);

      // Handle successful sign-up (e.g., navigate to login or a confirmation screen)
      // dispatch(authActions.setUser(response.user)); // Example: Update Redux state
      // navigation.navigate('Login'); // Example: Navigate to Login screen

      console.log('Simulated sign-up successful for:', { name, email });
      // Potentially clear form or navigate
    } catch (err: any) {
      console.error('Sign up error:', err);
      setError(err.message || 'An unexpected error occurred during sign up.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    isLoading,
    error,
    handleSignUp,
    isValid,
  };
};
