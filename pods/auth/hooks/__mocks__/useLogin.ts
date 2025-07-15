// __mocks__/useLogin.ts

const defaultState = {
    isValid: false,
    loading: false,
    error: null,
    values: { email: '', password: '' },
    setEmail: jest.fn(),
    setPassword: jest.fn(),
    onLogin: jest.fn(),
};

let mockState = {
    isValid: false,
    loading: false,
    error: null,
    email: '',
    password: '',
    setEmail: jest.fn(),
    setPassword: jest.fn(),
    login: jest.fn(),
};

export const __setMockLoginState = (state: Partial<typeof mockState>) => {
    mockState = { ...mockState, ...state };
};

export const resetMockLoginState = () => {
    mockState = {
        isValid: false,
        loading: false,
        error: null,
        email: '',
        password: '',
        setEmail: jest.fn(),
        setPassword: jest.fn(),
        login: jest.fn(),
    };
};

export const useLogin = () => ({
    ...mockState,
    isValid: () => mockState.isValid,
}); 