import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from '../../../shared/ui/Button';
import { Text as RNText } from 'react-native';
import renderer, { act } from 'react-test-renderer';

// Mock Text to use RNText so getByText works
jest.mock('../../../shared/ui/Text', () => {
    const { Text } = require('react-native');
    return (props: any) => <Text>{props.children || props.tx}</Text>;
});

const mockTheme = {
    colors: {
        primary: '#d92029',
        background: '#fff',
        disabled: '#ccc',
    },
};

jest.mock('../../../shared/theme', () => ({
    useTheme: () => ({ theme: mockTheme }),
    moderateScale: (v: number) => v,
    spacing: { s: 1, l: 2, xxs: 0.5 },
    fonts: { bold: 'bold' },
}));

describe('Button', () => {
    it('renders with title', () => {
        const { getByText } = render(<Button title="Click me" disabled={false} />);
        expect(getByText('Click me')).toBeTruthy();
    });

    it('renders with tx (i18n)', () => {
        const { getByText } = render(<Button tx="button.tx" disabled={false} />);
        expect(getByText('button.tx')).toBeTruthy();
    });

    it('calls onPress when pressed', () => {
        const onPress = jest.fn();
        const { getByTestId } = render(<Button title="Press" onPress={onPress} disabled={false} />);
        fireEvent.press(getByTestId('button-root'));
        expect(onPress).toHaveBeenCalled();
    });

    it('applies disabled style when disabled', () => {
        const onPress = jest.fn();
        const { getByTestId } = render(<Button title="Disabled" onPress={onPress} disabled />);
        const button = getByTestId('button-root');
        expect(button.props.style.opacity).toBe(0.6);
    });

    it('renders left and right icons', () => {
        const Left = () => <RNText>L</RNText>;
        const Right = () => <RNText>R</RNText>;
        const { getByText } = render(
            <Button title="IconBtn" leftIcon={<Left />} rightIcon={<Right />} disabled={false} />
        );
        expect(getByText('L')).toBeTruthy();
        expect(getByText('R')).toBeTruthy();
    });

    it('applies custom style and textStyle', () => {
        const { getByText } = render(
            <Button title="Styled" style={{ backgroundColor: 'red' }} textStyle={{ color: 'blue' }} disabled={false} />
        );
        expect(getByText('Styled')).toBeTruthy();
    });

    it('matches snapshot', () => {
        let tree: renderer.ReactTestRenderer | null = null;
        act(() => {
            tree = renderer.create(<Button title="Snapshot" disabled={false} />);
        });
        expect(tree!.toJSON()).toMatchSnapshot('Button component');
    });
}); 