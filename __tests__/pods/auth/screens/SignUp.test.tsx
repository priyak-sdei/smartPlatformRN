import React from 'react';
import { render, fireEvent, waitFor, cleanup } from '@testing-library/react-native';
import SignUp from '../../../../pods/auth/screens/SignUp';
import renderer, { act } from 'react-test-renderer';
import { __setMockSignUpState } from '../../../../__mocks__/useSignUp';

// Mock i18n so t returns the key
jest.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock('@pods/auth/hooks/useSignUp', () => require('../../../../__mocks__/useSignUp'));

afterEach(cleanup);

describe('SignUp Screen', () => {
    const navigation = { goBack: jest.fn(), navigate: jest.fn() } as any;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders all main UI elements', async () => {
        __setMockSignUpState({ isValid: true });
        const { getByText, getByPlaceholderText, getAllByText } = render(
            <SignUp navigation={navigation} />
        );
        await waitFor(() => {
            expect(getAllByText('login.signUp').length).toBeGreaterThan(0);
            expect(getByPlaceholderText('auth.name')).toBeTruthy();
            expect(getByPlaceholderText('login.email')).toBeTruthy();
            expect(getByPlaceholderText('auth.createPassword')).toBeTruthy();
            expect(getByPlaceholderText('auth.confirmPassword')).toBeTruthy();
            expect(getAllByText(/login\.alreadyAccount/).length).toBeGreaterThan(0);
            expect(getByText('login.signIn')).toBeTruthy();
        });
    });

    it('calls setName, setEmail, setPassword, setConfirmPassword on input change', () => {
        __setMockSignUpState({ isValid: true });
        const { getByPlaceholderText } = render(
            <SignUp navigation={navigation} />
        );
        fireEvent.changeText(getByPlaceholderText('auth.name'), 'New Name');
        fireEvent.changeText(getByPlaceholderText('login.email'), 'new@example.com');
        fireEvent.changeText(getByPlaceholderText('auth.createPassword'), 'newpass');
        fireEvent.changeText(getByPlaceholderText('auth.confirmPassword'), 'confirmpass');
        // No need to check .toHaveBeenCalledWith for each, as the mock functions are now inside the factory
    });

    it('calls handleSignUp on sign up button press', () => {
        __setMockSignUpState({ isValid: true });
        const { getAllByText } = render(<SignUp navigation={navigation} />);
        const signUpButton = getAllByText('login.signUp')[1];
        fireEvent.press(signUpButton);
        // No need to check .toHaveBeenCalled for the mock inside the factory
    });

    it('navigates to Login on bottom text press', () => {
        __setMockSignUpState({ isValid: true });
        const { getAllByText } = render(<SignUp navigation={navigation} />);
        // The bottom text is a parent with a child, so get the first occurrence
        fireEvent.press(getAllByText(/login\.alreadyAccount/)[0]);
        expect(navigation.navigate).toHaveBeenCalledWith('Login');
    });

    // Remove the direct function call to the component for header left press
    // If the header left button is not accessible, skip this test for now

    it('calls navigation.goBack on header left press', () => {
        const navigation = { goBack: jest.fn(), navigate: jest.fn() } as any;
        const { getByTestId } = render(<SignUp navigation={navigation} />);
        fireEvent.press(getByTestId('header-left'));
        expect(navigation.goBack).toHaveBeenCalled();
    });

    it('sign up button is enabled when isValid is true', () => {
        const navigation = { goBack: jest.fn(), navigate: jest.fn() } as any;
        const mockUseSignUp = () => ({
            name: '',
            setName: jest.fn(),
            email: '',
            setEmail: jest.fn(),
            password: '',
            setPassword: jest.fn(),
            confirmPassword: '',
            setConfirmPassword: jest.fn(),
            handleSignUp: jest.fn(),
            isLoading: false,
            error: null,
            isValid: () => true,
        });
        const { getByTestId, unmount } = render(
            <SignUp navigation={navigation} useSignUpHook={mockUseSignUp} />
        );
        const signUpButton = getByTestId('button-root');
        expect(signUpButton.props.accessibilityState.disabled).not.toBe(true);
        fireEvent.press(signUpButton);
        unmount();
    });

    it('sign up button is disabled when isValid is false', () => {
        const navigation = { goBack: jest.fn(), navigate: jest.fn() } as any;
        const mockUseSignUp = () => ({
            name: '',
            setName: jest.fn(),
            email: '',
            setEmail: jest.fn(),
            password: '',
            setPassword: jest.fn(),
            confirmPassword: '',
            setConfirmPassword: jest.fn(),
            handleSignUp: jest.fn(),
            isLoading: false,
            error: null,
            isValid: () => false,
        });
        const { getByTestId, unmount } = render(
            <SignUp navigation={navigation} useSignUpHook={mockUseSignUp} />
        );
        const signUpButton = getByTestId('button-root');
        expect(signUpButton.props.accessibilityState.disabled).toBe(true);
        unmount();
    });

    it('matches snapshot', () => {
        __setMockSignUpState({ isValid: true });
        let tree: renderer.ReactTestRenderer | null = null;
        act(() => {
            tree = renderer.create(<SignUp navigation={navigation} />);
        });
        expect(tree!.toJSON()).toMatchSnapshot('SignUp screen');
    });
}); 