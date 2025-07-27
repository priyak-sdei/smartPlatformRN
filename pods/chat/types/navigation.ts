import type { StackNavigationProp } from '@react-navigation/stack';
import type { RouteProp } from '@react-navigation/native';
import type { ListItem } from './components';

export type ChatStackParamList = {
  Chat: undefined;
  ChatDetail: { item: ListItem };
};

export type ChatNavigationProp<T extends keyof ChatStackParamList> =
  StackNavigationProp<ChatStackParamList, T>;

export type ChatRouteProp<T extends keyof ChatStackParamList> = RouteProp<
  ChatStackParamList,
  T
>;
