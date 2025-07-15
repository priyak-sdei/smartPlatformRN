import { act, renderHook } from '@testing-library/react-hooks';
import { useForgotPassword } from '../../../../pods/auth/hooks/useForgotPassword';

describe('useForgotPassword', () => {
    it('should initialize with empty email', () => {
        const { result } = renderHook(() => useForgotPassword());
        expect(result.current.email).toBe('');
        expect(result.current.isValid()).toBe(false);
    });

    it('should update email', () => {
        const { result } = renderHook(() => useForgotPassword());
        act(() => {
            result.current.setEmail('test@example.com');
        });
        expect(result.current.email).toBe('test@example.com');
    });

    it('should validate correct email', () => {
        const { result } = renderHook(() => useForgotPassword());
        act(() => {
            result.current.setEmail('test@example.com');
        });
        expect(result.current.isValid()).toBe(true);
    });

    it('should invalidate incorrect email', () => {
        const { result } = renderHook(() => useForgotPassword());
        act(() => {
            result.current.setEmail('invalid-email');
        });
        expect(result.current.isValid()).toBe(false);
    });

    it('should not call API if email is invalid', async () => {
        const { result } = renderHook(() => useForgotPassword());
        act(() => {
            result.current.setEmail('bad');
        });
        // handleForgotPassword should return early
        await act(async () => {
            await result.current.handleForgotPassword();
        });
        // Email should remain unchanged
        expect(result.current.email).toBe('bad');
    });

    it('should simulate API and clear email on success', async () => {
        const { result } = renderHook(() => useForgotPassword());
        act(() => {
            result.current.setEmail('test@example.com');
        });
        await act(async () => {
            await result.current.handleForgotPassword();
        });
        expect(result.current.email).toBe('');
    });

    it('should handle errors in handleForgotPassword', async () => {
        const errorFn = jest.fn(() => Promise.reject(new Error('Simulated error')));
        const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
        const { result } = renderHook(() => useForgotPassword(errorFn));
        act(() => {
            result.current.setEmail('test@example.com');
        });
        await act(async () => {
            await result.current.handleForgotPassword();
        });
        expect(errorFn).toHaveBeenCalledWith('test@example.com');
        errorSpy.mockRestore();
    });

    it('matches snapshot', () => {
        const { result } = renderHook(() => useForgotPassword());
        expect(result.current).toMatchSnapshot('useForgotPassword hook');
    });
}); 