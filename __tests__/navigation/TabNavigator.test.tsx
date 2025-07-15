import React from 'react';
import { render, waitFor, cleanup } from '@testing-library/react-native';
import TabNavigator from '../../src/navigation/TabNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from '../../src/redux/store';
import renderer, { act } from 'react-test-renderer';

afterEach(cleanup);

describe('TabNavigator', () => {
    it('renders without crashing', async () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <NavigationContainer>
                    <TabNavigator />
                </NavigationContainer>
            </Provider>
        );
        await waitFor(() => {
            expect(getByTestId('tab-navigator-root')).toBeTruthy();
        });
    });

    it('matches snapshot', () => {
        let tree: renderer.ReactTestRenderer | null = null;
        act(() => {
            tree = renderer.create(
                <Provider store={store}>
                    <NavigationContainer>
                        <TabNavigator />
                    </NavigationContainer>
                </Provider>
            );
        });
        expect(tree!.toJSON()).toMatchSnapshot('TabNavigator component');
    });
}); 