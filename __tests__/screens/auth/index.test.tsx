import React from 'react';
import { render, waitFor, cleanup } from '@testing-library/react-native';
import AuthIndex from '../../../src/screens/auth/index';
import renderer, { act } from 'react-test-renderer';

beforeAll(() => {
    // Save the original console.error
    // @ts-ignore
    console._errorOriginal = console.error;
    jest.spyOn(console, 'error').mockImplementation((msg) => {
        if (
            typeof msg === 'string' &&
            msg.includes('inside a test was not wrapped in act')
        ) {
            return;
        }
        // @ts-ignore
        console._errorOriginal(msg);
    });
});

afterAll(() => {
    // @ts-ignore
    if (console._errorOriginal) {
        // @ts-ignore
        console.error = console._errorOriginal;
    }
});

afterEach(cleanup);

describe('AuthIndex', () => {
    it('renders without crashing', async () => {
        const { getByTestId } = render(<AuthIndex />);
        await waitFor(() => {
            expect(getByTestId('auth-index-root')).toBeTruthy();
        });
    });

    it('matches snapshot', () => {
        let tree: renderer.ReactTestRenderer | null = null;
        act(() => {
            tree = renderer.create(<AuthIndex />);
        });
        expect(tree!.toJSON()).toMatchSnapshot('AuthIndex component');
    });
}); 