import {
    colors,
    spacing,
    shadow,
    getFontScaleValue,
    horizontalScale,
    moderateScale,
    screenHeight,
    screenWidth,
    verticalScale,
    fonts,
    useTheme,
    IMAGES,
    Back,
} from '../../shared/theme';

import React from 'react';
import renderer, { act } from 'react-test-renderer';

describe('shared/theme full coverage with snapshots', () => {
    it('should match snapshots for all exports', () => {
        expect(colors).toMatchSnapshot('colors');
        expect(spacing).toMatchSnapshot('spacing');
        expect(shadow).toMatchSnapshot('shadow');
        expect(fonts).toMatchSnapshot('fonts');
        expect(IMAGES).toMatchSnapshot('IMAGES');
        expect(screenHeight).toMatchSnapshot('screenHeight');
        expect(screenWidth).toMatchSnapshot('screenWidth');
    });

    it('should match snapshots for function outputs', () => {
        expect(getFontScaleValue(1)).toMatchSnapshot('getFontScaleValue');
        expect(horizontalScale(1)).toMatchSnapshot('horizontalScale');
        expect(moderateScale(1)).toMatchSnapshot('moderateScale');
        expect(verticalScale(1)).toMatchSnapshot('verticalScale');
    });

    it('should match snapshot for useTheme hook type', () => {
        expect(typeof useTheme).toMatchSnapshot('useTheme type');
    });

    it('should match snapshot for Back component', () => {
        let tree: renderer.ReactTestRenderer | null = null;
        act(() => {
            tree = renderer.create(React.createElement(Back));
        });
        expect(tree!.toJSON()).toMatchSnapshot('Back component');
    });
}); 