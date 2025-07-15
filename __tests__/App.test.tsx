/**
 * @format
 */

import React from 'react';
import { render, waitFor, cleanup } from '@testing-library/react-native';
import App from '../src/App';
import renderer, { act } from 'react-test-renderer';
import * as RN from 'react-native';

jest.mock('../src/i18n/i18n', () => ({
  __esModule: true,
  default: {},
  initI18n: jest.fn(() => Promise.resolve()),
}));

// Mock react-native-bootsplash to prevent .catch errors
jest.mock('react-native-bootsplash', () => ({
  hide: jest.fn(() => Promise.resolve()),
}));

// Mock Appearance.addChangeListener to prevent environment teardown errors
jest.spyOn(RN.Appearance, 'addChangeListener').mockImplementation(() => ({ remove: jest.fn() }));

// Mock useColorScheme to always return 'light'
jest.spyOn(RN, 'useColorScheme').mockImplementation(() => 'light');

afterEach(cleanup);

const flushPromises = () => new Promise(setImmediate);

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

describe('App', () => {
  it('renders without crashing', async () => {
    const { getByTestId } = render(<App />);
    await flushPromises();
    await waitFor(() => {
      expect(getByTestId('app-root')).toBeTruthy();
    });
  });

  it('matches snapshot', async () => {
    let tree: renderer.ReactTestRenderer | null = null;
    await act(async () => {
      tree = renderer.create(<App />);
      await flushPromises();
    });
    expect(tree!.toJSON()).toMatchSnapshot('App component');
  });
});
