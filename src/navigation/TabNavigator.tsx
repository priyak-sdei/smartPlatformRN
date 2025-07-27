import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import { Home, Profile } from '@src/assets/svg';
import HomeScreen from '@src/screens/HomeScreen';
import ProfileScreen from '@src/screens/ProfileScreen';
import { useTheme } from '@shared/theme';
import { ChatList } from '@pods/chat/index';
export type TabParamList = {
  Home: undefined;
  Profile: undefined;
  Chat: undefined;
};

export type TabImages = {
  Home: any;
  Profile: any;
  Chat: any;
};

const Tab = createBottomTabNavigator<TabParamList>();

function renderTabIcon(
  routeName: string,
  color: string,
  size: number,
  tabImages: TabImages,
) {
  const Icon = tabImages[routeName as keyof TabImages];
  // If it's a function/component (SVG), render as component
  if (typeof Icon === 'function') {
    return <Icon width={size} height={size} fill={color} />;
  }
  // Otherwise, treat as image source
  return (
    <Image
      source={Icon}
      style={{ width: size, height: size, tintColor: color }}
      resizeMode="contain"
    />
  );
}
//add custom images here
function getTabImages() {
  return {
    Home: Home,
    Profile: Profile,
    Chat: Profile,
  };
}

interface TabNavigatorProps {
  tabImages?: TabImages;
}

const TabNavigator: React.FC<TabNavigatorProps> = ({
  tabImages = getTabImages(),
}) => {
  const { theme } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopColor: theme.colors.border,
        },
        tabBarActiveTintColor: theme.colors.tabActive,
        tabBarInactiveTintColor: theme.colors.tabInactive,
        tabBarIcon: ({ color, size }) =>
          renderTabIcon(route.name, color, size, tabImages),
      })}
      initialRouteName="Home"
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Chat" component={ChatList} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
