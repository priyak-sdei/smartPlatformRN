import type { StackNavigationProp } from '@react-navigation/stack';
import type { RouteProp } from '@react-navigation/native';

// Message list item
export interface ListItem {
  id: number;
  name: string;
  message: string;
  isMessage: boolean;
  time: string;
}

// Message type for chat messages
export interface Message {
  _id: string;
  text: string;
  createdAt: string | Date;
  user: {
    _id: string;
    name: string;
    avatar?: string;
  };
}

// Bottom chat input props
export interface BottomChatInputProps {
  inputMessage: string;
  onChangeMessageText: (messagetext: string) => void;
  onMessageSend: () => void;
  onAttachMessage: () => void;
  isSendDisabled: boolean;
  placeholder?: string;
}

// Chat messages props
export interface ChatMessagesProps {
  messages: Message[];
  currentUserId: string;
}

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
