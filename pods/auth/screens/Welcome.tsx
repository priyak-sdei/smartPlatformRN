import type { StackNavigationProp } from '@react-navigation/stack';
import { Layout, Text } from '@shared/index';
import {
  colors,
  fonts,
  IMAGES,
  moderateScale,
  spacing,
  verticalScale,
} from '@shared/theme';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
};

type WelcomePropsNavigationProp = StackNavigationProp<AuthStackParamList>;

interface WelcomeProps {
  navigation: WelcomePropsNavigationProp;
}
const data = [
  {
    key: 1,
    title: 'Welcome to SmartPlatform',
    text: 'Discover a smarter way to manage your data and workflows. Let’s get started!',
    image: IMAGES.auth.slider,
    bg: '#59b2ab',
  },
  {
    key: 2,
    title: 'Seamless Collaboration',
    text: 'Connect with your team, share insights, and work together in real time—anytime, anywhere.',
    image: IMAGES.auth.slider,
    bg: '#d92029',
  },
];
type Item = (typeof data)[0];

const Welcome = ({ navigation: _navigation }: WelcomeProps) => {
  const _renderItem = ({ item }: { item: Item }) => {
    return (
      <View
        style={[
          styles.slide,
          {
            backgroundColor: item.bg,
          },
        ]}
      >
        <Text style={styles.title}>{item.title}</Text>
        <Image source={item.image} style={styles.image} resizeMode="contain" />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  const _keyExtractor = (item: Item) => item.title;
  const renderButton = (type: 'next' | 'done') => (
    <Text
      style={type === 'done' ? styles.doneText : styles.nextText}
      tx={type === 'done' ? 'login.done' : 'login.next'}
    />
  );
  return (
    <Layout>
      <Layout.Body scrollable={true} style={styles.noPadding}>
        <AppIntroSlider
          keyExtractor={_keyExtractor}
          renderItem={_renderItem}
          data={data}
          renderNextButton={() => renderButton('next')}
          renderDoneButton={() => renderButton('done')}
          onDone={() => _navigation.navigate('Login')}
        />
      </Layout.Body>
    </Layout>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: moderateScale(300),
    height: moderateScale(300),
    marginVertical: verticalScale(spacing.m),
  },
  text: {
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  title: {
    fontSize: moderateScale(spacing.l),
    fontFamily: fonts.medium,
    color: colors.background,
    textAlign: 'center',
  },
  noPadding: {
    padding: 0,
  },
  doneText: {
    fontSize: moderateScale(spacing.s),
    fontFamily: fonts.semiBold,
    color: colors.background,
  },
  nextText: {
    fontSize: moderateScale(spacing.s),
    fontFamily: fonts.light,
    color: colors.background,
  },
});

export default Welcome;
