# SmartPlatformRN

SmartPlatform is a modular React Native project designed for scalability, maintainability, and reusability. It uses a **pods** architecture, where each feature is encapsulated as a reusable component (pod). The project also includes a shared UI library and a robust navigation and theming system.

---

## ✅ Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version `>=20.18.1`

---

## 🚀 Features

- **Pods Architecture:** Each feature (e.g., Auth, Header) is a self-contained module with its own screens, navigation, and logic.
- **Shared UI Library:** Common UI components (Button, TextInput, Layout, etc.) are centralized for consistency and reuse.
- **Theming:** Centralized theme management for colors, fonts, and spacing.
- **Module Aliasing:** Clean and maintainable imports using Babel and TypeScript path aliases.
- **Localization:** Built-in multi-language support using `i18next` and `react-i18next`.
- **Environment Variable Support:** Supports multiple environments (`.env`, `.env.dev`, `.env.staging`) for easy configuration of API endpoints and other secrets.
- **Automatic Dark/Light Mode:** The app automatically adapts to the system's theme.
- **App Icon & Splash Generation:** Automated scripts for generating app icons and splash screens.
- **Pre-commit Linting:** Uses Husky and lint-staged to automatically lint and fix code before every commit.
- **Screen Orientation:** Locked to portrait mode to ensure a consistent user experience and avoid orientation-related UI issues.
- **Automatic Network Status:** The app displays a connection status strip that automatically updates based on network connectivity.
- **Social Logins:** Pre-integrated Google Sign-In and Sign in with Apple for streamlined authentication.

---

## 📁 Folder Structure

```
smartPlatformRN/
│
├── android/                  # Android native project
├── ios/                      # iOS native project
├── smart-assets/             #App icon and splash images
├── src/
│   ├── navigation/           # App and feature navigators
│   ├── screens/              # App-level screens (if any)
│   ├── theme/                # Theme provider, colors, fonts, spacing
│   ├── assets/               # Images, fonts, etc.
│   ├── components/           # App-level reusable components
│   ├── hooks/                # Custom React hooks
│   ├── redux/                # Redux store and slices (if used)
│   ├── constants/            # App-wide constants
│   └── App.tsx               # App entry point
│   └── i18n/                 # multi-language support
│
├── pods/                     # Feature modules (pods)
│   └── auth/
│       ├── screens/          # Auth feature screens (Login, Register, etc.)
│       ├── navigation/       # Auth feature navigator
│       └── index.ts          # Auth pod exports
│
├── shared/                   # Shared UI library
│   ├── ui/                   # UI components (Button, TextInput, Layout, etc.)
│   └── index.ts              # Shared exports
│
├── babel.config.js           # Babel config with module resolver
├── tsconfig.json             # TypeScript config with path aliases
├── package.json              # Project dependencies and scripts
└── README.md                 # Project documentation
└── .env                     # Environment variables
└── .env.dev                 # Development environment variables
└── .env.staging             # Staging environment variables
```

---

## 🧩 Pods (Feature Modules)

- **Pods** are self-contained feature modules.
- Each pod contains its own screens, navigation, and logic.
- Example: The `auth` pod contains all authentication-related screens and navigation.

---

## 🖼️ Shared UI Library

- All common UI components (Button, TextInput, Layout, etc.) are in `shared/ui`.
- These components are theme-aware and reusable across pods and app screens.

---

## 🛠️ Theming

- Centralized in `src/theme/` for colors, fonts, and spacing.
- Supports automatic switching between light and dark modes based on system settings.

---

## 🗂️ Module Aliasing

- Clean imports using aliases like `@shared`, `@pods`, `@theme`, etc.
- Configured in both `babel.config.js` and `tsconfig.json`.

---

## 🧑‍💻 Get Started

### 1. Install dependencies

```sh
yarn install
```

### 2. Install iOS pods (if on Mac)

```sh
npx pod-install
```

### 3. Start the Metro bundler

```sh
yarn start
```

### 4. Run the app

```sh
yarn ios
# or
yarn android
```

---

## 📦 Adding a New Pod

1. Create a new folder under `pods/` (e.g., `pods/profile/`).
2. Add `screens/`, `navigation/`, and `index.ts` as needed.
3. Export your pod's navigator and screens via `index.ts`.
4. Plug the pod's navigator into the main app navigator as needed.

---

## 🤝 Contributing

- Keep UI components generic and reusable.
- Encapsulate feature logic within pods.
- Use module aliases for all imports.

---

## 🏢 Maintained By

**SmartData**  
https://www.smartdatainc.com/

---

## 👩‍💻 Author

**Priya Kumari**
[www.linkedin.com/in/priya-kumari-8391b6113](https://www.linkedin.com/in/priya-kumari-8391b6113)

---

##
