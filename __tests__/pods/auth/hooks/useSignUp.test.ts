import { renderHook, act } from '@testing-library/react-hooks';
import { useSignUp } from '../../../../pods/auth/hooks/useSignUp';

jest.useFakeTimers();

describe('useSignUp hook', () => {
    it('should initialize with default values', () => {
        const { result } = renderHook(() => useSignUp());

        expect(result.current.name).toBe('');
        expect(result.current.email).toBe('');
        expect(result.current.password).toBe('');
        expect(result.current.confirmPassword).toBe('');
        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBeNull();
    });

    it('should update form values correctly', () => {
        const { result } = renderHook(() => useSignUp());

        act(() => {
            result.current.setName('John Doe');
            result.current.setEmail('john@example.com');
            result.current.setPassword('123456');
            result.current.setConfirmPassword('123456');
        });

        expect(result.current.name).toBe('John Doe');
        expect(result.current.email).toBe('john@example.com');
        expect(result.current.password).toBe('123456');
        expect(result.current.confirmPassword).toBe('123456');
    });

    it('should return false from isValid() when form is invalid', () => {
        const { result } = renderHook(() => useSignUp());

        act(() => {
            result.current.setName('');
            result.current.setEmail('invalid-email');
            result.current.setPassword('123');
            result.current.setConfirmPassword('321');
        });

        expect(result.current.isValid()).toBe(false);
    });

    it('should return true from isValid() when form is valid', () => {
        const { result } = renderHook(() => useSignUp());

        act(() => {
            result.current.setName('Alice');
            result.current.setEmail('alice@example.com');
            result.current.setPassword('abcdef');
            result.current.setConfirmPassword('abcdef');
        });

        expect(result.current.isValid()).toBe(true);
    });

    it('should not call handleSignUp if form is invalid', async () => {
        const { result } = renderHook(() => useSignUp());

        act(() => {
            result.current.setName('');
            result.current.setEmail('bad-email');
            result.current.setPassword('123');
            result.current.setConfirmPassword('456');
        });

        await act(async () => {
            await result.current.handleSignUp();
        });

        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBeNull(); // because validation failed before setting error
    });

    it('should simulate successful sign-up and toggle loading', async () => {
        const { result } = renderHook(() => useSignUp());

        act(() => {
            result.current.setName('Test User');
            result.current.setEmail('test@example.com');
            result.current.setPassword('password123');
            result.current.setConfirmPassword('password123');
        });

        await act(async () => {
            const promise = result.current.handleSignUp();
            expect(result.current.isLoading).toBe(false);

            // fast-forward timer
            jest.runAllTimers();
            await promise;
        });

        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBeNull();
    });
});
