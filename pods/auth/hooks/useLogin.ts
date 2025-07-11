import { useAppDispatch } from '@src/redux/hooks';
import { setUser } from '@src/redux/slices/userSlice';
import { useState } from 'react';

interface UseLogin {
  email: string;
  password: string;
  loading: boolean;
  error: string | null;
  setEmail: (val: string) => void;
  setPassword: (val: string) => void;
  login: () => Promise<void>;
  isValid: () => boolean;
}

export function useLogin(): UseLogin {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const login = async () => {
    setLoading(true);
    setError(null);
    try {
      // Replace this with your actual authentication logic
      if (!email || !password) {
        throw new Error('Email and password are required.');
      }
      // Simulate API call
      await new Promise(res => {
        dispatch(setUser(email));
      }
      );
      // Handle successful login here
    } catch (e: any) {
      setError(e.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  function validateEmail(emailToValidate: string): boolean {
    // Simple email regex for demonstration
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailToValidate);
  }

  // Method to check if fields are valid and filled
  const isValid = () => validateEmail(email) && !!password;

  return {
    email,
    password,
    loading,
    error,
    setEmail,
    setPassword,
    login,
    isValid,
  };
}
