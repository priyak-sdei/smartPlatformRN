import React from 'react';
import { render, waitFor, cleanup } from '@testing-library/react-native';
import HomeScreen from '../../src/screens/HomeScreen';
import { Provider } from 'react-redux';
import { store } from '../../src/redux/store';
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

describe('HomeScreen', () => {
    it('renders without crashing', async () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <HomeScreen />
            </Provider>
        );
        await waitFor(() => {
            expect(getByTestId('home-root')).toBeTruthy();
        });
    });

    it('matches snapshot', () => {
        let tree: renderer.ReactTestRenderer | null = null;
        act(() => {
            tree = renderer.create(
                <Provider store={store}>
                    <HomeScreen />
                </Provider>
            );
        });
        expect(tree!.toJSON()).toMatchSnapshot('HomeScreen component');
    });
}); 