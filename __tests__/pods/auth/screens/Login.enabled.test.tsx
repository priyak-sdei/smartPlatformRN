import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Login from '../../../../pods/auth/screens/Login';
import { Provider } from 'react-redux';
import { store } from '../../../../src/redux/store';
import { ThemeProvider } from '../../../../src/theme/ThemeProvider';

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

describe('Login Screen (enabled state)', () => {
    it('sign in button is enabled when isValid is true', () => {
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