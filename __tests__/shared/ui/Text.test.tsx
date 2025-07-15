import React from 'react';
import { render } from '@testing-library/react-native';
import Text from '../../../shared/ui/Text';
import renderer, { act } from 'react-test-renderer';

const mockTheme = {
    colors: {
        secondary: 'red',
        label: 'blue',
    },
};

jest.mock('../../../shared/theme', () => ({
    useTheme: () => ({ theme: mockTheme }),
    moderateScale: (v: number) => v,
    spacing: { l: 20, s: 10 },
    fonts: { bold: 'bold', medium: 'medium', regular: 'regular' },
}));

jest.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (k: string) => `i18n:${k}` }),
}));

describe('Text', () => {
    it('renders children', () => {
        const { getByText } = render(<Text>hello</Text>);
        expect(getByText('hello')).toBeTruthy();
    });

    it('renders with tx (i18n)', () => {
        const { getByText } = render(<Text tx="greeting" />);
        expect(getByText('i18n:greeting')).toBeTruthy();
    });

    it('applies custom style', () => {
        const { getByText } = render(<Text style={{ color: 'green' }}>styled</Text>);
        expect(getByText('styled')).toBeTruthy();
    });

    it('renders with variant styles', () => {
        expect(render(<Text variant="title">title</Text>).getByText('title')).toBeTruthy();
        expect(render(<Text variant="subtitle">subtitle</Text>).getByText('subtitle')).toBeTruthy();
        expect(render(<Text variant="body">body</Text>).getByText('body')).toBeTruthy();
    });

    it('matches snapshot', () => {
        let tree: renderer.ReactTestRenderer | null = null;
        act(() => {
            tree = renderer.create(<Text>Snapshot</Text>);
        });
        expect(tree!.toJSON()).toMatchSnapshot('Text component');
    });
}); 