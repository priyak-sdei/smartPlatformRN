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
  onSendMessage: (message: string) => void;
  placeholder?: string;
  maxLength?: number;
}

// Chat messages props
export interface ChatMessagesProps {
  messages: Message[];
  currentUserId: string;
  autoScroll?: boolean;
}
