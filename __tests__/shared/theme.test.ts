import * as theme from '../../shared/theme';

describe('shared/theme barrel file', () => {
    it('should export expected symbols', () => {
        expect(theme.colors).toBeDefined();
        expect(theme.spacing).toBeDefined();
        expect(theme.shadow).toBeDefined();
        expect(theme.getFontScaleValue).toBeDefined();
        expect(theme.horizontalScale).toBeDefined();
        expect(theme.moderateScale).toBeDefined();
        expect(theme.screenHeight).toBeDefined();
        expect(theme.screenWidth).toBeDefined();
        expect(theme.verticalScale).toBeDefined();
        expect(theme.fonts).toBeDefined();
        expect(theme.useTheme).toBeDefined();
        expect(theme.IMAGES).toBeDefined();
        expect(theme.Back).toBeDefined();
    });
}); 