import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Header from '../../../shared/ui/Header';
import { Text as RNText } from 'react-native';
import renderer, { act } from 'react-test-renderer';

const mockTheme = {
    colors: {
        background: 'white',
        border: 'gray',
        text: 'black',
    },
};

jest.mock('../../../shared/theme', () => ({
    useTheme: () => ({ theme: mockTheme }),
    moderateScale: (v: number) => v,
    spacing: { s: 1, l: 2, xxs: 0.5 },
    fonts: { bold: 'bold' },
}));

jest.mock('../../../shared/ui/Text', () => {
    const { Text } = require('react-native');
    return (props: any) => <Text>{props.children || props.title}</Text>;
});

describe('Header', () => {
    it('renders with title', () => {
        const { getByText } = render(<Header title="Header Title" />);
        expect(getByText('Header Title')).toBeTruthy();
    });

    it('renders leftIcon and triggers onLeftPress', () => {
        const onLeftPress = jest.fn();
        const LeftIcon = () => <RNText>L</RNText>;
        const { getByText } = render(<Header leftIcon={<LeftIcon />} onLeftPress={onLeftPress} />);
        fireEvent.press(getByText('L'));
        expect(onLeftPress).toHaveBeenCalled();
    });

    it('renders rightComponent and triggers onRightPress', () => {
        const onRightPress = jest.fn();
        const RightIcon = () => <RNText>R</RNText>;
        const { getByText } = render(<Header rightComponent={<RightIcon />} onRightPress={onRightPress} />);
        fireEvent.press(getByText('R'));
        expect(onRightPress).toHaveBeenCalled();
    });

    it('renders centerComponent', () => {
        const Center = () => <RNText>CENTER</RNText>;
        const { getByText } = render(<Header centerComponent={<Center />} />);
        expect(getByText('CENTER')).toBeTruthy();
    });

    it('applies custom style', () => {
        const { getByTestId } = render(<Header title="Styled" style={{ backgroundColor: 'red' }} testID="header-root" />);
        expect(getByTestId('header-root')).toBeTruthy();
    });

    it('applies BottomBorder style', () => {
        const { getByTestId } = render(<Header title="Bordered" BottomBorder testID="header-root" />);
        expect(getByTestId('header-root')).toBeTruthy();
    });

    it('matches snapshot', () => {
        let tree: renderer.ReactTestRenderer | null = null;
        act(() => {
            tree = renderer.create(<Header title="Snapshot" />);
        });
        expect(tree!.toJSON()).toMatchSnapshot('Header component');
    });
}); 