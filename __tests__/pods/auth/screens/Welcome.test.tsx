import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Welcome, { _renderItem, _keyExtractor, renderButton } from '../../../../pods/auth/screens/Welcome';

// Mock i18n so t returns the key
jest.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key: string) => key }),
}));

// Mock AppIntroSlider to render children and simulate button presses
jest.mock('react-native-app-intro-slider', () => {
    const React = require('react');
    const { TouchableOpacity } = require('react-native');
    return ({ renderItem, data, renderNextButton, renderDoneButton, onDone }: any) => (
        <>
            {data.map((item: any, idx: number) => (
                <React.Fragment key={item.key}>{renderItem({ item, index: idx })}</React.Fragment>
            ))}
            <>{renderNextButton && renderNextButton()}</>
            <>{renderDoneButton && (
                <TouchableOpacity testID="done-btn" onPress={onDone}>
                    {renderDoneButton()}
                </TouchableOpacity>
            )}</>
        </>
    );
});

describe('Welcome Screen', () => {
    const navigation = { navigate: jest.fn() } as any;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders all slides and navigation buttons', () => {
        const { getByText } = render(<Welcome navigation={navigation} />);
        expect(getByText('Welcome to SmartPlatform')).toBeTruthy();
        expect(getByText('Seamless Collaboration')).toBeTruthy();
        expect(getByText('login.next')).toBeTruthy();
        expect(getByText('login.done')).toBeTruthy();
    });

    it('navigates to Login on done button press', () => {
        const { getByTestId } = render(<Welcome navigation={navigation} />);
        fireEvent.press(getByTestId('done-btn'));
        expect(navigation.navigate).toHaveBeenCalledWith('Login');
    });

    it('directly tests _renderItem', () => {
        const item = {
            key: 1,
            title: 'Test Title',
            text: 'Test Text',
            image: 'test.png',
            bg: '#fff',
        };
        const { getByText } = render(_renderItem({ item }));
        expect(getByText('Test Title')).toBeTruthy();
        expect(getByText('Test Text')).toBeTruthy();
    });

    it('directly tests _keyExtractor', () => {
        const item = { key: 1, title: 'UniqueTitle', text: '', image: '', bg: '' };
        expect(_keyExtractor(item)).toBe('UniqueTitle');
    });

    it('directly tests renderButton for next and done', () => {
        const { getByText, rerender } = render(renderButton('next'));
        expect(getByText('login.next')).toBeTruthy();
        rerender(renderButton('done'));
        expect(getByText('login.done')).toBeTruthy();
    });
}); 