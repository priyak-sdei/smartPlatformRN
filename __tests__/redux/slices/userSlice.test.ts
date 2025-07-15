import userReducer, { clearUser } from '../../../src/redux/slices/userSlice';

describe('userSlice', () => {
    it('should return the initial state', () => {
        expect(userReducer(undefined, { type: 'user/unknown' })).toEqual({
            email: null,
        });
    });

    it('should handle clearUser', () => {
        const previousState = { email: 'test@example.com' };
        expect(userReducer(previousState, clearUser())).toEqual({ email: null });
    });

    it('matches snapshot', () => {
        expect(userReducer(undefined, { type: 'user/unknown' })).toMatchSnapshot('userSlice initial state');
    });
}); 