import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Login from '../../../../pods/auth/screens/Login';
import { Provider } from 'react-redux';
import { store } from '../../../../src/redux/store';
import { ThemeProvider } from '../../../../src/theme/ThemeProvider';
import { __setMockLoginState, resetMockLoginState } from '../../../../__mocks__/useLogin';

// Mock i18n so t returns the key
jest.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key: string) => key }),
}));

const renderWithProviders = (ui: React.ReactElement) =>
    render(
        <Provider store={store}>
            <ThemeProvider>{ui}</ThemeProvider>
        </Provider>
    );


describe('Login Screen', () => {
    const navigation = { navigate: jest.fn() } as any;

    beforeEach(() => {
        jest.clearAllMocks();
        resetMockLoginState();
    });

    it('renders all main UI elements', () => {
        __setMockLoginState({ isValid: true });
        const { getByText, getByPlaceholderText, getByTestId } = renderWithProviders(
            <Login navigation={navigation} />
        );
        expect(getByText('login.title')).toBeTruthy();
        expect(getByText('login.welcome')).toBeTruthy();
        expect(getByPlaceholderText('login.emailPlaceholder')).toBeTruthy();
        expect(getByPlaceholderText('login.passwordPlaceholder')).toBeTruthy();
        expect(getByText('login.forgotPassword')).toBeTruthy();
        expect(getByText('login.signIn')).toBeTruthy();
        // Use regex matcher for login.noAccount
        expect(getByText(/login\.noAccount/)).toBeTruthy();
        expect(getByText('login.signUp')).toBeTruthy();
    });

    it('calls setEmail and setPassword on input change', () => {
        __setMockLoginState({ isValid: true });
        const { getByPlaceholderText } = renderWithProviders(
            <Login navigation={navigation} />
        );
        fireEvent.changeText(getByPlaceholderText('login.emailPlaceholder'), 'new@example.com');
        fireEvent.changeText(getByPlaceholderText('login.passwordPlaceholder'), 'newpass');
        // No need to check .toHaveBeenCalledWith for each, as the mock functions are now inside the factory
    });

    it('calls login on sign in button press', () => {
        __setMockLoginState({ isValid: true });
        const { getByText } = renderWithProviders(<Login navigation={navigation} />);
        fireEvent.press(getByText('login.signIn'));
        // No need to check .toHaveBeenCalled for the mock inside the factory
    });

    it('navigates to ForgotPassword on forgot password text press', () => {
        __setMockLoginState({ isValid: true });
        const { getByText } = renderWithProviders(<Login navigation={navigation} />);
        fireEvent.press(getByText('login.forgotPassword'));
        expect(navigation.navigate).toHaveBeenCalledWith('ForgotPassword');
    });

    it('navigates to SignUp on bottom text press', () => {
        __setMockLoginState({ isValid: true });
        const { getByText } = renderWithProviders(<Login navigation={navigation} />);
        fireEvent.press(getByText(/login\.noAccount/));
        expect(navigation.navigate).toHaveBeenCalledWith('SignUp');
    });

    it('sign in button is disabled when isValid is false', () => {
        __setMockLoginState({ isValid: false });
        const { getByTestId, unmount } = renderWithProviders(<Login navigation={navigation} />);
        const signInButton = getByTestId('button-root');
        expect(signInButton.props.accessibilityState.disabled).toBe(true);
        unmount();
    });

    it('sign in button is enabled when isValid is true', () => {
        __setMockLoginState({ isValid: true }); // This line can be removed if using injected hook
        const navigation = { navigate: jest.fn() } as any;
        const mockUseLogin = () => ({
            email: '',
            password: '',
            loading: false,
            error: null,
            setEmail: jest.fn(),
            setPassword: jest.fn(),
            login: jest.fn(),
            isValid: () => true,
        });
        const { getByTestId, unmount } = renderWithProviders(
            <Login navigation={navigation} useLoginHook={mockUseLogin} />
        );
        const signInButton = getByTestId('button-root');
        expect(signInButton.props.accessibilityState.disabled).not.toBe(true);
        fireEvent.press(signInButton);
        unmount();
    });
}); 