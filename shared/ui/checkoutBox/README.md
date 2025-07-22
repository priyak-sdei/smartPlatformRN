# CheckoutBox (Checkbox) Component

A flexible, theme-aware Checkbox component for React Native, supporting custom rendering, color customization, and easy integration.

## Features

- ✅ **Customizable Colors**: Set box, check, checked, and disabled colors
- ✅ **Custom Rendering**: Render your own box, check, or label with `renderBox`, `renderCheck`, and `renderLabel`
- ✅ **Theme Support**: Integrates with your app's theme system
- ✅ **Accessible**: Proper accessibility roles and states
- ✅ **TypeScript**: Full TypeScript support

---

## Installation

This component is part of your project's `shared/ui` library. Import and use directly:

```tsx
import CheckoutBox from 'shared/ui/CheckoutBox';
```

---

## Usage

### Basic Usage

```tsx
const [checked, setChecked] = useState(false);

<CheckoutBox checked={checked} onChange={setChecked} label="Accept Terms" />;
```

### Custom Colors

```tsx
<CheckoutBox
  checked={checked}
  onChange={setChecked}
  boxColor="#888"
  checkedBoxColor="#4caf50"
  checkColor="#fff"
  disabledBoxColor="#eee"
/>
```

### Custom Rendering

```tsx
<CheckoutBox
  checked={checked}
  onChange={setChecked}
  renderBox={(checked, disabled) => (
    <View
      style={{
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: checked ? 'green' : 'gray',
        backgroundColor: checked ? 'green' : 'white',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {checked && (
        <View
          style={{
            width: 12,
            height: 12,
            borderRadius: 6,
            backgroundColor: 'white',
          }}
        />
      )}
    </View>
  )}
  renderLabel={(label, labelTx, checked, disabled) => (
    <Text style={{ color: checked ? 'green' : 'black', marginLeft: 8 }}>
      {label}
    </Text>
  )}
/>
```

---

## Props

| Prop             | Type                                             | Default                        | Description                               |
| ---------------- | ------------------------------------------------ | ------------------------------ | ----------------------------------------- |
| checked          | boolean                                          | —                              | Whether the checkbox is checked           |
| onChange         | (checked: boolean) => void                       | —                              | Callback when the value changes           |
| label            | string                                           | —                              | Label text                                |
| labelTx          | string                                           | —                              | Translation key for label                 |
| style            | ViewStyle                                        | —                              | Custom style for the container            |
| labelStyle       | TextStyle                                        | —                              | Custom style for the label text           |
| disabled         | boolean                                          | false                          | Disables the checkbox                     |
| boxColor         | string                                           | theme.colors.border/background | Box color (unchecked)                     |
| checkedBoxColor  | string                                           | theme.colors.primary           | Box color (checked)                       |
| checkColor       | string                                           | theme.colors.background        | Check mark color                          |
| disabledBoxColor | string                                           | —                              | Box color when disabled                   |
| renderBox        | (checked, disabled) => ReactNode                 | —                              | Custom render function for the box        |
| renderCheck      | () => ReactNode                                  | —                              | Custom render function for the check mark |
| renderLabel      | (label, labelTx, checked, disabled) => ReactNode | —                              | Custom render function for the label      |

---

## Styling

- The checkbox adapts to your theme by default.
- You can override box, check, and label styles with color props or custom renderers.
- Use `renderBox`, `renderCheck`, or `renderLabel` for full control over appearance.

---

## Accessibility

- Uses `accessibilityRole="checkbox"` and proper `accessibilityState`.
- Fully keyboard/touch accessible.

---

## Example

```tsx
import React, { useState } from 'react';
import CheckoutBox from 'shared/ui/CheckoutBox';

export default function Example() {
  const [checked, setChecked] = useState(false);
  return (
    <CheckoutBox
      checked={checked}
      onChange={setChecked}
      label="Subscribe to newsletter"
      boxColor="#888"
      checkedBoxColor="#1976d2"
      checkColor="#fff"
    />
  );
}
```

---

## License

MIT (as part of your project)
