import type { AuthNavigationProp } from '../types';
import { Button, Layout, Text, TextInput } from '@shared/index';
import {
  moderateScale,
  spacing,
  verticalScale,
  fonts,
  useTheme,
  Back,
} from '@shared/theme';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, ViewStyle } from 'react-native';
import { useSignUp } from '../hooks/useSignUp';
import Dropdown from '@shared/ui/dropdown';
import Checkbox from '@shared/ui/checkoutBox';
import Switch from '@shared/ui/switch';
import RadioGroup from '@shared/ui/radioGroup';

interface SignUpProps {
  navigation: AuthNavigationProp<'SignUp'>;
}

const SignUp = ({ navigation: _navigation }: SignUpProps) => {
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    handleSignUp,
    isValid,
  } = useSignUp();
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = getStyles(theme);

  // New state for additional fields
  const [acceptedTerms, setAcceptedTerms] = React.useState(false);
  const [gender, setGender] = React.useState<string | null>(null);
  const [country, setCountry] = React.useState<string | null>(null);
  const [subscribe, setSubscribe] = React.useState(false);

  // Interests multi-select example
  const [interests, setInterests] = React.useState<string[]>([]);
  const interestOptions = [
    { label: 'Sports', value: 'sports' },
    { label: 'Music', value: 'music' },
    { label: 'Travel', value: 'travel' },
    { label: 'Reading', value: 'reading' },
    { label: 'Technology', value: 'technology' },
  ];

  // Gender and country options
  const genderOptions = [
    { label: t('auth.genderMale'), value: 'male', labelTx: 'auth.genderMale' },
    {
      label: t('auth.genderFemale'),
      value: 'female',
      labelTx: 'auth.genderFemale',
    },
    {
      label: t('auth.genderOther'),
      value: 'other',
      labelTx: 'auth.genderOther',
    },
  ];
  const countryOptions = [
    { label: 'United States', value: 'us', tx: 'auth.countryUS' },
    { label: 'India', value: 'in', tx: 'auth.countryIN' },
    { label: 'United Kingdom', value: 'uk', tx: 'auth.countryUK' },
  ];

  // Enhanced validation
  const isFormValid = () => isValid() && acceptedTerms && gender && country;

  return (
    <Layout>
      <Layout.Header
        leftIcon={<Back />}
        onLeftPress={() => _navigation.goBack()}
      />
      <Layout.Body scrollable={true}>
        <Text variant="title" tx="login.signUp" style={styles.titleMargin} />
        <TextInput
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          labelTx="auth.name"
          placeholderTx={'auth.name'}
        />
        <TextInput
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          labelTx="login.email"
          placeholderTx={'login.email'}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          labelTx="auth.createPassword"
          placeholderTx={'auth.createPassword'}
        />
        <TextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={true}
          labelTx="auth.confirmPassword"
          placeholderTx={'auth.confirmPassword'}
        />
        {/* Gender Section Title */}
        <Text style={styles.sectionTitle} tx="auth.selectGender" />
        {/* Add spacing to match label/input */}
        <RadioGroup
          options={genderOptions}
          value={gender}
          onChange={val => setGender(val as string)}
          style={
            [styles.fieldMargin, styles.inputSpacing] as unknown as ViewStyle
          }
        />
        {/* Country Section Title */}
        <Text style={styles.sectionTitle} tx="auth.selectCountryTitle" />
        {/* Country Dropdown */}
        <Dropdown
          options={countryOptions}
          value={country}
          onChange={val => setCountry(val as string)}
          placeholder={t('auth.selectCountry')}
          style={
            [styles.fieldMargin, styles.inputSpacing] as unknown as ViewStyle
          }
        />
        {/* Interests Multi-Select Dropdown Example */}
        <Text style={styles.sectionTitle}>Select Interests</Text>
        <Dropdown
          options={interestOptions}
          value={interests}
          onChange={val =>
            setInterests(Array.isArray(val) ? (val as string[]) : [])
          }
          placeholder="Select your interests"
          multiple
          style={
            [styles.fieldMargin, styles.inputSpacing] as unknown as ViewStyle
          }
        />

        {/* Newsletter Section Title */}
        <Text style={styles.sectionTitle} tx="auth.newsletterTitle" />
        {/* Subscribe Switch */}
        <Switch
          value={subscribe}
          onValueChange={setSubscribe}
          style={
            [styles.switchMargin, styles.inputSpacing] as unknown as ViewStyle
          }
        />
        <Text style={styles.switchLabel} tx="auth.subscribeNewsletter" />
        {/* Terms Section Title */}
        <Text style={styles.sectionTitle} tx="auth.termsTitle" />
        {/* Terms Checkbox */}
        <Checkbox
          checked={acceptedTerms}
          onChange={setAcceptedTerms}
          labelTx="auth.acceptTerms"
          style={
            [styles.fieldMargin, styles.inputSpacing] as unknown as ViewStyle
          }
        />
        <Button
          tx={'login.signUp'}
          style={styles.button}
          onPress={handleSignUp}
          disabled={!isFormValid()}
        />
        <Text
          style={styles.bottomText}
          onPress={() => _navigation.navigate('Login')}
        >
          {t('login.alreadyAccount')}{' '}
          <Text style={styles.bottomTextBold}>{t('login.signIn')}</Text>
        </Text>
      </Layout.Body>
    </Layout>
  );
};

const getStyles = (theme: any) =>
  StyleSheet.create({
    button: {
      marginTop: verticalScale(spacing.m),
    },
    titleMargin: {
      marginBottom: moderateScale(spacing.s),
    },
    fieldMargin: {
      marginTop: verticalScale(spacing.xs),
    },
    switchMargin: {
      marginTop: verticalScale(spacing.xs),
      alignSelf: 'flex-start',
    },
    switchLabel: {
      marginLeft: moderateScale(spacing.s),
      marginBottom: verticalScale(spacing.xxs),
      color: theme.colors.label,
    },
    bottomText: {
      textAlign: 'center',
      marginTop: verticalScale(spacing.xxs),
      color: theme.colors.secondary,
      fontSize: moderateScale(spacing.s),
    },
    bottomTextBold: {
      fontFamily: fonts.medium,
    },
    sectionTitle: {
      marginBottom: verticalScale(spacing.xxs),
      color: theme.colors.label,
      fontFamily: fonts.medium,
      fontSize: moderateScale(15),
    },
    inputSpacing: {
      marginBottom: verticalScale(spacing.s),
    },
  });

export default SignUp;
