// __mocks__/useSignUp.ts

let mockState = {
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
};

export const __setMockSignUpState = (state: Partial<typeof mockState>) => {
    mockState = { ...mockState, ...state };
};

export const useSignUp = () => ({
    ...mockState,
    isValid: typeof mockState.isValid === 'function' ? mockState.isValid : () => mockState.isValid,
}); 