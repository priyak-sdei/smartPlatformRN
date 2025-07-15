import React from 'react';
import { render, waitFor, cleanup } from '@testing-library/react-native';
import AuthNavigator from '../../src/navigation/AuthNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from '../../src/redux/store';
import renderer, { act } from 'react-test-renderer';

afterEach(cleanup);

describe('AuthNavigator', () => {
    it('renders without crashing', async () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <NavigationContainer>
                    <AuthNavigator />
                </NavigationContainer>
            </Provider>
        );
        await waitFor(() => {
            expect(getByTestId('auth-navigator-root')).toBeTruthy();
        });
    });

    it('matches snapshot', () => {
        let tree: renderer.ReactTestRenderer | null = null;
        act(() => {
            tree = renderer.create(
                <Provider store={store}>
                    <NavigationContainer>
                        <AuthNavigator />
                    </NavigationContainer>
                </Provider>
            );
        });
        expect(tree!.toJSON()).toMatchSnapshot('AuthNavigator component');
    });
}); 