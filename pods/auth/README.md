# Auth Pod

This pod provides all authentication-related screens and logic for the SmartPlatform project. It is designed as a **self-contained, reusable module** that only imports UI components and utilities from the shared library.

---

## ✨ Features

- **Welcome Screen:** Intro slider and onboarding for new users.
- **Login Screen:** User login with email and password.
- **Sign Up Screen:** New user registration.
- **Forgot Password Screen:** Password reset flow.

---

## 📦 Folder Structure

```
pods/
└── auth/
    ├── navigation/         # Auth stack navigator
    ├── screens/            # All authentication screens
    │   ├── Welcome.tsx
    │   ├── Login.tsx
    │   ├── SignUp.tsx
    │   └── ForgotPassword.tsx
    └── index.ts            # Pod exports (navigator, screens, etc.)
```

---

## 🔗 Demo

[View Demo of the Auth Pod](https://smartdatainc-my.sharepoint.com/:i:/g/personal/priya_kumari_smartdatainc_net/ETDjlhLBpllFklEzcuP5ImEBDzIj2nCI-3MNTK4yGQAp0A?e=OPAr9s) <!-- Replace # with your actual demo link -->

---

## 🧩 Usage

- The Auth pod **only imports components from the shared UI library** (`shared/ui`) and does not depend on any other pods or app-level code.
- To use the Auth pod, simply import its navigator or screens from `pods/auth` in your main app navigator.

---

## 🤝 Contributing

- To contribute, generate a new branch with the naming convention:  
  `refactor/podname` (e.g., `refactor/auth`)
- Commit your changes using the standard message format:  
  `refactor(PodName): <description>`  
  Example:  
  `refactor(Auth): improve login form validation`
- Ensure your code follows the existing structure and only imports from the shared UI library and generate the merge request.

## 🛠️ Maintained By

**SmartData**  
https://www.smartdatainc.com/

---

## 👩‍💻 Author

**Priya Kumari**  
[www.linkedin.com/in/priya-kumari-8391b6113](https://www.linkedin.com/in/priya-kumari-8391b6113)

---
