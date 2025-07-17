# Social Pod

---

## 🔗 Demo

[View Demo of the Social Pod](https://smartdatainc-my.sharepoint.com/:i:/g/personal/anilkumar_smartdatainc_net/EZz5Xd1Ud_RCoK1nqCI47RUBzfbEncxDhPiGcxv6CwXDTw?e=4nCX0I)

---

This pod provides all social authentication buttons and logic for the SmartPlatform project. It is a **self-contained, reusable module** that only imports UI components and utilities from the shared library.

---

## ✨ Features

- **SocialLoginButtons Component:** Unified UI for Google and Apple social login.
- **Google Sign-In:** Integrates with Google authentication using `@react-native-google-signin/google-signin`.
- **Apple Sign-In:** Integrates with Apple authentication using `@invertase/react-native-apple-authentication` (iOS only).
- **TypeScript Types:** Strongly typed props and result objects for integration.

---

## 📦 Folder Structure

```
pods/
└── social/
    ├── SocialLoginButtons.tsx   # Social login button component
    ├── README.md                # Pod documentation
    └── meta.ts                  # Pod metadata
```

---

## ⚙️ Requirements

- For Google Sign-In: Configure your `webClientId` in your app and add `google-services.json` (Android) and `GoogleService-Info.plist` (iOS) as per the [Google Sign-In docs](https://react-native-google-signin.github.io/docs/).
- For Apple Sign-In: Enable Sign In with Apple in your Apple Developer account and Xcode project. Only available on iOS 13+ and real devices (not simulators).

---

## ⚙️ Additional Setup

### 1. App Configuration (`App.js` or `App.tsx`)

Import and configure Google Sign-In at app startup:

```js
import { GoogleSignin } from '@react-native-google-signin/google-signin';
GoogleSignin.configure({
  webClientId: 'YOUR_WEB_CLIENT_ID', // from Google Cloud Console
  offlineAccess: false,
});
```

### 2. iOS Native Setup

- Add your `GoogleService-Info.plist` to `ios/yourAppName/` and ensure it's included in the Xcode project.
- In Xcode, open your app target > Info > URL Types, and add a new URL scheme with your reversed client ID (from the plist).
- Enable 'Sign In with Apple' capability in Xcode and on the Apple Developer portal.
- Set iOS Deployment Target to 13.0 or higher.

### 3. Android Native Setup

- Add your `google-services.json` to `android/app/`.
- Ensure your `android/app/build.gradle` includes:
  ```gradle
  apply plugin: 'com.google.gms.google-services'
  ```
- Make sure you have the correct permissions in `AndroidManifest.xml` (usually handled by the library).

For more details, see the official docs:

- [Google Sign-In Setup](https://react-native-google-signin.github.io/docs/)
- [Apple Sign-In Setup](https://invertase.io/oss/react-native-apple-authentication/quick-start/ios)

---

## 🧩 Usage

- The Social pod **only imports components from the shared UI library** (`shared/ui`) and does not depend on any other pods or app-level code.
- To use the Social pod, simply import the `SocialLoginButtons` component from `pods/social/SocialLoginButtons` and use it in your authentication screens.

Example:

```tsx
import SocialLoginButtons from 'pods/social/SocialLoginButtons';

<SocialLoginButtons
  showGoogle
  showApple
  onResult={result => {
    // handle social login result
  }}
/>;
```

---

## 🤝 Contributing

- To contribute, generate a new branch with the naming convention:  
  `refactor/social`
- Commit your changes using the standard message format:  
  `refactor(Social): <description>`  
  Example:  
  `refactor(Social): add Facebook login support`
- Ensure your code follows the existing structure and only imports from the shared UI library and generate the merge request.

---

## 🛠️ Maintained By

**SmartData**  
https://www.smartdatainc.com/

---

## 👨‍💻 Author

**Anil Kumar**  
[www.linkedin.com/in/thakkuranil](https://www.linkedin.com/in/thakkuranil)

---
