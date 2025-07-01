const en = {
  // Auth Screens
  login: {
    title: 'Login',
    emailPlaceholder: 'Enter your email',
    passwordPlaceholder: 'Enter your password',
    forgotPassword: 'Forgot Password?',
    signIn: 'Sign In',
    noAccount: "Don't have an account?",
    signUp: 'Sign Up',
    welcome:
      'We are happy to see you again.\nEnter your email address and password',
    email: 'Email',
    password: 'Password',
  },
  auth: {
    name: 'Name',
    createPassword: 'Create Password',
    confirmPassword: 'Confirm Password',
  },

  // Common UI
  common: {
    Hi: 'Hello, {{name}}!',

    confirmPassword: 'Confirm Password',
    submit: 'Submit',
    cancel: 'Cancel',
    ok: 'OK',
    back: 'Back',
    next: 'Next',
    continue: 'Continue',
    error: 'Error',
    success: 'Success',
    loading: 'Loading...',
  },

  // Validation & Errors
  validation: {
    required: 'This field is required',
    invalidEmail: 'Please enter a valid email address',
    passwordShort: 'Password must be at least 6 characters',
    passwordsNotMatch: 'Passwords do not match',
  },

  // Layout
  layout: {
    headerTitle: 'SmartPlatform',
  },

  // Welcome Screen
  welcome: {
    title: 'Welcome to SmartPlatform',
    description: 'Your modular React Native starter kit.',
  },
};

export default en;
export type Translations = typeof en;
