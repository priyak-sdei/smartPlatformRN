import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ForgotPassword from '../../../../pods/auth/screens/ForgotPassword';
// Add i18n mock so t returns the key
jest.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock('../../../../pods/auth/hooks/useForgotPassword', () => ({
    useForgotPassword: () => ({
        email: 'test@example.com',
        setEmail: jest.fn(),
        handleForgotPassword: jest.fn(),
        isValid: () => true,
    }),
}));

describe('ForgotPassword Screen', () => {
    const navigation = { goBack: jest.fn(), navigate: jest.fn() } as any;

    it('renders header, email input, and button', () => {
        const { getByText, getByPlaceholderText } = render(
            <ForgotPassword navigation={navigation} />
        );
        expect(getByText('login.forgetPassword')).toBeTruthy();
        expect(getByPlaceholderText('login.emailPlaceholder')).toBeTruthy();
        expect(getByText('login.restLink')).toBeTruthy();
    });

    it('calls navigation.goBack on header left press', () => {
        // This may need to be adjusted if the header left press is not easily accessible
        // For now, just call the prop directly if possible
        // @ts-ignore
        const header = ForgotPassword({ navigation });
        header.props.children[0].props.onLeftPress();
        expect(navigation.goBack).toHaveBeenCalled();
    });

    it('calls handleForgotPassword and navigation.navigate on button press', () => {
        const { getByText } = render(<ForgotPassword navigation={navigation} />);
        fireEvent.press(getByText('login.restLink'));
        expect(navigation.navigate).toHaveBeenCalledWith('SignUp');
    });

    it('reset link button is enabled when isValid is true', () => {
        const navigation = { goBack: jest.fn(), navigate: jest.fn() } as any;
        const mockUseForgotPassword = () => ({
            email: '',
            setEmail: jest.fn(),
            handleForgotPassword: jest.fn(),
            isValid: () => true,
        });
        const { getByTestId, unmount } = render(
            <ForgotPassword navigation={navigation} useForgotPasswordHook={mockUseForgotPassword} />
        );
        const resetLinkButton = getByTestId('button-root');
        expect(resetLinkButton.props.accessibilityState.disabled).not.toBe(true);
        fireEvent.press(resetLinkButton);
        unmount();
    });

    it('reset link button is disabled when isValid is false', () => {
        const navigation = { goBack: jest.fn(), navigate: jest.fn() } as any;
        const mockUseForgotPassword = () => ({
            email: '',
            setEmail: jest.fn(),
            handleForgotPassword: jest.fn(),
            isValid: () => false,
        });
        const { getByTestId, unmount } = render(
            <ForgotPassword navigation={navigation} useForgotPasswordHook={mockUseForgotPassword} />
        );
        const resetLinkButton = getByTestId('button-root');
        expect(resetLinkButton.props.accessibilityState.disabled).toBe(true);
        unmount();
    });
}); 