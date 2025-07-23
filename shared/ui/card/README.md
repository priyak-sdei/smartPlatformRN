# Card Component

A flexible, theme-aware Card component for React Native, supporting custom header/footer, border, shadow, and more.

## Screenshot

<img src="../screenshot/card.png" alt="Card Example" width="300" />

[▶️ View Full Screenshot](../screenshot/card.png)

---

## Features

- ✅ **Customizable Header & Footer**: Add any React node above or below the content
- ✅ **Custom Colors & Borders**: Set background, border color, width, and radius
- ✅ **Custom Padding & Margin**: Control spacing inside and outside the card
- ✅ **Custom Shadow**: Control shadow color, offset, opacity, and radius
- ✅ **Theme Support**: Integrates with your app's theme system
- ✅ **TypeScript**: Full TypeScript support

---

## Installation

This component is part of your project's `shared/ui` library. Import and use directly:

```tsx
import Card from 'shared/ui/card';
```

---

## Usage

### Basic Usage

```tsx
<Card>
  <Text>This is a card!</Text>
</Card>
```

### With Header and Footer

```tsx
<Card
  header={<Text style={{ fontWeight: 'bold' }}>Header</Text>}
  footer={<Text style={{ color: 'gray' }}>Footer</Text>}
>
  <Text>Card content goes here.</Text>
</Card>
```

### Custom Styles with customStyle Prop

```tsx
<Card
  customStyle={{
    card: { backgroundColor: '#fffbe6', borderRadius: 16 },
    header: { backgroundColor: '#f0f0f0', padding: 8 },
    footer: { borderTopWidth: 1, borderColor: '#eee', padding: 8 },
  }}
  header={<Text>Header</Text>}
  footer={<Text>Footer</Text>}
>
  <Text>Card content</Text>
</Card>
```

### Using a Local SVG as an Icon (No Vector Icon Library Needed)

If you have a local SVG file (e.g., `myIcon.svg`), you can import and use it directly as a React component in your Card header, footer, or content:

```tsx
// Import your SVG (requires react-native-svg-transformer or similar setup)
import MyIcon from '../screenshot/myIcon.svg';

<Card header={<MyIcon width={24} height={24} />}>
  <Text>Card content</Text>
</Card>;
```

This keeps your LOC low and avoids extra dependencies. Make sure your project is set up to import SVGs as components (e.g., using `react-native-svg-transformer`).

---

## Props

| Prop        | Type                  | Default  | Description                         |
| ----------- | --------------------- | -------- | ----------------------------------- | --- | -------------------------------------- |
| children    | ReactNode             | —        | Card content                        |
| style       | ViewStyle             | —        | Custom style for the card           |
| elevation   | number                | 3        | Android elevation & iOS shadow size |
| header      | ReactNode             | —        | Optional header above content       |
| footer      | ReactNode             | —        | Optional footer below content       |
| customStyle | Partial<Record<'card' | 'header' | 'footer', StyleProp<ViewStyle>>>    | —   | Custom styles for card, header, footer |

---

## Styling

- The card adapts to your theme by default.
- You can override all visual aspects with the `customStyle` prop or custom styles.
- Use header/footer for extra content or actions.

---

## Accessibility

- The card is a simple View, so you can add accessibility props as needed.

---

## Example

```tsx
import Card from 'shared/ui/card';
import MyIcon from '../screenshot/myIcon.svg';
import { Text } from 'react-native';

export default function Example() {
  return (
    <Card
      header={<MyIcon width={24} height={24} />}
      customStyle={{ card: { backgroundColor: '#fffbe6' } }}
    >
      <Text>Custom styled card with SVG icon in header</Text>
    </Card>
  );
}
```

---

## License

MIT (as part of your project)
