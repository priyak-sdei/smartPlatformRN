// __mocks__/useSignUp.ts

let mockState = {
    isValid: false,
    loading: false,
    error: null,
    values: { email: '', password: '', confirmPassword: '' },
    setEmail: jest.fn(),
    setPassword: jest.fn(),
    setConfirmPassword: jest.fn(),
    onSignUp: jest.fn(),
};

export const __setMockSignUpState = (state: Partial<typeof mockState>) => {
    mockState = { ...mockState, ...state };
};

export const useSignUp = () => ({
    ...mockState,
    isValid: () => mockState.isValid,
}); 