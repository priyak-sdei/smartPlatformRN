import { renderHook, act } from '@testing-library/react-hooks';
import { useLogin } from '../../../../pods/auth/hooks/useLogin';
import { useAppDispatch } from '@src/redux/hooks';
import { setUser } from '@src/redux/slices/userSlice';

jest.mock('@src/redux/hooks', () => ({
    useAppDispatch: jest.fn(),
}));

jest.mock('@src/redux/slices/userSlice', () => ({
    setUser: jest.fn(),
}));

describe('useLogin hook', () => {
    const dispatchMock = jest.fn();

    beforeEach(() => {
        (useAppDispatch as jest.Mock).mockReturnValue(dispatchMock);
        dispatchMock.mockClear();
    });

    it('should set error if login fails due to missing fields', async () => {
        const { result } = renderHook(() => useLogin());

        expect(result.current).toBeDefined(); // sanity check

        act(() => {
            result.current.setEmail('');
            result.current.setPassword('');
        });

        await act(async () => {
            await result.current.login();
        });

        expect(result.current.error).toBe('Email and password are required.');
        expect(dispatchMock).not.toHaveBeenCalled();
    });
});
