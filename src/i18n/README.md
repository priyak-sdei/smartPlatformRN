# Internationalization (i18n)

This document explains how our application handles multiple languages using `i18next` and `react-i18next`.

## Overview

Our goal is to centralize all user-facing text into one place, making it easy to manage, translate, and maintain. We use a "translation key" system, where components reference a key (e.g., `login.title`) instead of hardcoding text.

## Folder Structure

-   `locales/`: This directory contains the translation files for each supported language.
    -   `en.ts`: The source of truth for all English translations. It exports the main translation object and a `Translations` type for type-safety.
-   `index.ts`: This is the core configuration file. It initializes `i18next`, connects it to React, and exports the fully-typed `TxKeyPath` for use across the app.
-   `README.md`: This file.

---

## How It Works

1.  **Initialization**: The `i18n/index.ts` file is imported **once** at the very top of our application's entry point (`App.tsx` or `index.js`). This is critical because it sets up the `i18next` instance *before* any React components attempt to render.
2.  **React Integration**: We use `initReactI18next` which provides the `i18next` instance to our entire component tree via React Context.
3.  **Type Safety**: We generate a `TxKeyPath` type from the `en.ts` file. This provides full autocompletion and compile-time checks for translation keys, preventing typos and references to non-existent keys.

---

## Best Practices & Usage

### The Golden Rule: Avoid Direct Imports

**DO NOT** import a `translate` function or the `i18n` instance directly into your components for rendering text.

-   **Why?** Components need to be reactive. Using hooks or our custom components ensures that if the language changes, your component will automatically re-render with the new text. Direct imports can lead to stale translations or errors if the `i18n` instance isn't ready yet.

### 1. Using Custom UI Components (Preferred Method)

Our shared UI components (`Text`, `Button`, `TextInput`, etc.) are designed to handle translations for you. This is the cleanest and most common way to display translated text.

Use the `tx` prop to pass the translation key.

```typescriptreact
// Good: Clean, simple, and reactive.
<Text tx="login.title" />

<Button tx="login.signIn" onPress={handlePress} />

<TextInput labelTx="login.email" placeholderTx="login.emailPlaceholder" />
```

For dynamic values (interpolation), use the `txOptions` prop.

```typescriptreact
// In en.ts: 'Hi': 'Hello, {{name}}!'
<Text tx="common.Hi" txOptions={{ name: 'Alex' }} />
```

### 2. Using the `useTranslation` Hook

For logic inside your components (e.g., showing an alert, passing a string to a third-party library), use the `useTranslation` hook.

```typescriptreact
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';

const MyComponent = () => {
  const { t } = useTranslation();

  const showAlert = () => {
    const title = t('common.error');
    const message = t('validation.required');
    Alert.alert(title, message);
  };

  // ...
};
```

---

## Adding and Modifying Translations

1.  **Open `src/i18n/locales/en.ts`**.
2.  Add your new key-value pair inside the appropriate nested object (e.g., inside `login` or `common`).
3.  The `TxKeyPath` type will automatically update, and you can immediately use your new key in any component with full autocompletion.