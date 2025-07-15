import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));
jest.mock('react-native-bootsplash', () => ({
  hide: jest.fn(),
}));

// Mock navigation
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({ navigate: jest.fn() }),
    useRoute: () => ({}),
  };
});

// Manually mock RefreshControl for React Native 0.72+
jest.mock('react-native/Libraries/Components/RefreshControl/RefreshControl', () => 'RefreshControl');

// Mock react-native-gesture-handler to bypass ESM import issues
jest.mock('react-native-gesture-handler', () => {
  const View = require('react-native').View;
  return {
    Swipeable: View,
    DrawerLayout: View,
    State: {},
    PanGestureHandler: View,
    TapGestureHandler: View,
    FlingGestureHandler: View,
    LongPressGestureHandler: View,
    NativeViewGestureHandler: View,
    GestureHandlerRootView: View,
    Directions: {},
  };
});

// Mock @react-navigation/stack to bypass ESM import issues
jest.mock('@react-navigation/stack', () => {
  return {
    createStackNavigator: jest.fn(() => ({
      Navigator: ({ children }) => children,
      Screen: ({ children }) => children,
    })),
  };
});

// Mock react-native-keyboard-controller to bypass native module errors
jest.mock('react-native-keyboard-controller', () => ({
  KeyboardProvider: (props) => props.children,
  KeyboardAwareScrollView: (props) => props.children,
}));

// Mock react-native-localize to bypass native module errors
jest.mock('react-native-localize', () => ({
  getLocales: () => [{ languageTag: 'en', languageCode: 'en', countryCode: 'US', isRTL: false }],
  getNumberFormatSettings: () => ({ decimalSeparator: '.', groupingSeparator: ',' }),
  getCalendar: () => 'gregorian',
  getCountry: () => 'US',
  getCurrencies: () => ['USD'],
  getTemperatureUnit: () => 'celsius',
  getTimeZone: () => 'America/New_York',
  uses24HourClock: () => true,
  usesMetricSystem: () => true,
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
})); 