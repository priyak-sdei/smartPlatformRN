import { useState } from 'react';

interface UseLogin {
  email: string;
  password: string;
  loading: boolean;
  error: string | null;
  setEmail: (val: string) => void;
  setPassword: (val: string) => void;
  login: () => Promise<void>;
}

export function useLogin(): UseLogin {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async () => {
    setLoading(true);
    setError(null);
    try {
      // Replace this with your actual authentication logic
      if (!email || !password) {
        throw new Error('Email and password are required.');
      }
      // Simulate API call
      await new Promise(res => setTimeout(res, 1000));
      // Handle successful login here
    } catch (e: any) {
      setError(e.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    password,
    loading,
    error,
    setEmail,
    setPassword,
    login,
  };
}
