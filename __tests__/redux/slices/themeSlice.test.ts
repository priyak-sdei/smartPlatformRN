import themeReducer, { setTheme } from '../../../src/redux/slices/themeSlice';

describe('themeSlice', () => {
    it('should return the initial state', () => {
        expect(themeReducer(undefined, { type: 'theme/unknown' })).toEqual({
            mode: 'light',
        });
    });

    it('should handle setTheme', () => {
        const previousState = { mode: 'light' as 'light' };
        expect(themeReducer(previousState, setTheme('dark'))).toEqual({ mode: 'dark' });
    });

    it('matches snapshot', () => {
        expect(themeReducer(undefined, { type: 'theme/unknown' })).toMatchSnapshot('themeSlice initial state');
    });
}); 