const en = {
  // Auth Screens
  login: {
    title: 'Login',
    emailPlaceholder: 'Enter your email',
    passwordPlaceholder: 'Enter your password',
    forgotPassword: 'Forgot Password?',
    forgetPassword: 'Forgot Password',
    restLink: 'Send Reset Link',
    signIn: 'Sign In',
    noAccount: "Don't have an account?",
    signUp: 'Sign Up',
    welcome:
      'We are happy to see you again.\nEnter your email address and password',
    email: 'Email',
    password: 'Password',
    done: 'Done',
    next: 'Next',
    alreadyAccount: 'Already have an account?',
  },
  auth: {
    name: 'Name',
    createPassword: 'Create Password',
    confirmPassword: 'Confirm Password',
    genderMale: 'Male',
    genderFemale: 'Female',
    genderOther: 'Other',
    selectGender: 'Select your gender',
    selectCountry: 'Select Country',
    selectCountryTitle: 'Select your country',
    countryUS: 'United States',
    countryIN: 'India',
    countryUK: 'United Kingdom',
    acceptTerms: 'I accept the Terms and Conditions',
    subscribeNewsletter: 'Subscribe to our newsletter',
    newsletterTitle: 'Newsletter Subscription',
    termsTitle: 'Terms and Conditions',
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
    connection_restored: 'Internet connection restored',
    connection_lost: 'You are offline',
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
  //Schedule Screen
  schedule: {
    title: 'Schedule',
    subTitle: 'Calendar',
    subTitleContent: 'See all your events ',
  },
};

export default en;
export type Translations = typeof en;
