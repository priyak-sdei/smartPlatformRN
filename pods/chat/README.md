# Chat Pod

This pod provides comprehensive chat functionality for the SmartPlatform project. It's designed as a **self-contained, reusable module** that handles all chat-related features and interactions.

---

## ✨ Features

- **Chat List:** Display of all conversations with message previews
- **Conversation Screen:** Full chat interface with message history
- **Real-time Messaging:** Send and receive messages instantly
- **Message Input:** Rich text input with attachment support
- **Search:** Search through chat conversations
- **Auto-scroll:** Smart scrolling behavior with keyboard awareness

---

## 📦 Folder Structure

```
pods/
└── chat/
    ├── assets/            # Chat-related assets
    │   ├── images/       # Image assets
    │   └── svg/         # SVG icons
    ├── components/       # UI Components
    │   ├── bottomChatInput/    # Message input component
    │   ├── chatMessages/       # Messages display
    │   ├── listComponent/      # Chat list view
    │   ├── search/            # Search component
    │   └── styles.ts         # Shared styles
    ├── hooks/           # Custom hooks
    │   ├── useBottomChatInput.ts
    │   ├── useChatList.ts
    │   ├── useChatMessage.ts
        └── useConversation.ts
    ├── screens/         # Main screens
    │   ├── ChatListScreen.tsx
    │   └── ConversationScreen.tsx
    ├── types/          # TypeScript definitions
    │   ├── components.ts
    │   └── navigation.ts
    └── index.ts        # Pod exports
```

---
## 🔗 Demo

[View Demo of the Chat Pod](https://smartdatainc-my.sharepoint.com/:v:/g/personal/nandinisharma_smartdatainc_net/EYvhoEXQqH9PgmZY9M4dyHUB0WYnH3N_0iSPSFv4ItkOAA?e=DE3X21) <!-- Replace # with your actual demo link -->

---


## 🧩 Components

### 1. BottomChatInput
- Message composition and sending
- Attachment handling
- Character limit support
- Multiline input
- Send button state management

### 2. ChatMessages
- Message history display
- Auto-scrolling
- Message grouping
- Timestamp display
- Read receipts

### 3. ListComponent
- Chat conversation list
- Unread message indicators
- Last message preview
- Timestamp display
- Avatar support

### 4. Search
- Real-time chat search
- History filtering
- Search suggestions

---

## 📚 Component Props

### BottomChatInput Props
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `onSendMessage` | `(message: string) => void` | Yes | - | Callback function when message is sent |
| `placeholder` | `string` | No | "Type a message..." | Placeholder text for input |
| `maxLength` | `number` | No | 1000 | Maximum characters allowed |
| `disabled` | `boolean` | No | false | Disables input when true |

### ChatMessages Props
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `messages` | `Message[]` | Yes | - | Array of messages to display |
| `currentUserId` | `string` | Yes | - | ID of current user |
| `autoScroll` | `boolean` | No | true | Auto-scrolls to bottom on new message |
| `onMessagePress` | `(message: Message) => void` | No | - | Callback when message is pressed |
| `onMessageLongPress` | `(message: Message) => void` | No | - | Callback for long press |

### ListComponent Props
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `data` | `ListItem[]` | Yes | - | Array of chat list items |
| `onItemPress` | `(item: ListItem) => void` | Yes | - | Callback when item is pressed |
| `onRefresh` | `() => void` | No | - | Pull-to-refresh callback |
| `refreshing` | `boolean` | No | false | Shows refresh indicator |

### Search Props
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `onSearch` | `(query: string) => void` | Yes | - | Search callback function |
| `placeholder` | `string` | No | "Search..." | Search input placeholder |
| `debounceTime` | `number` | No | 300 | Debounce delay in ms |
| `minLength` | `number` | No | 2 | Minimum query length |

## 📋 Type Definitions

```typescript
interface Message {
  _id: string;
  text: string;
  createdAt: Date;
  user: {
    _id: string;
    name: string;
    avatar?: string;
  };
}

interface ListItem {
  id: string;
  name: string;
  message: string;
  time: string;
  isMessage?: boolean;
  avatar?: string;
}
```


## 🎣 Custom Hooks

### `useBottomChatInput`
- Input state management
- Message validation
- Send functionality
- Attachment handling

### `useChatList`
- Conversation management
- Navigation handling
- List item interactions

### `useChatMessage`
- Message state management
- Auto-scroll behavior
- Keyboard interaction handling

### `useConversation`
- Handling send message

---


## 🔗 Usage

```typescript
// In your navigation stack
import { ChatListScreen, ConversationScreen } from '@pods/chat';

const Stack = createStackNavigator();

<Stack.Navigator>
  <Stack.Screen name="ChatList" component={ChatListScreen} />
  <Stack.Screen name="Conversation" component={ConversationScreen} />
</Stack.Navigator>
```

---

## 🤝 Contributing

- Create a new branch: `feature/chat-<feature-name>`
- Commit format: `feat(Chat): <description>`
- Example: `feat(Chat): add emoji support to input`
- Follow existing component structure
- Update documentation for new features

---

## 🔧 Technical Details

### State Management
- Local state for UI components
- Custom hooks for logic separation
- Efficient re-rendering optimizations

### Performance
- FlatList virtualization
- Debounced input handling
- Optimized image loading
- Keyboard event management

### Styling
- Themed components
- Responsive design
- Platform-specific adaptations
- Dark mode support

---

## 📱 Platform Support

- iOS: Version 13+
- Android: API Level 21+

---

## 🛠️ Maintained By

**SmartData**  
https://www.smartdatainc.com/

---

## 👩‍💻 Author

**Nandini Sharma**  
[www.linkedin.com/in/nandini-sharma-00404623a](https://www.linkedin.com/in/nandini-sharma-00404623a)

---


## 📝 Notes

- All components use shared UI library
- Follows atomic design principles
- Implements accessibility features
- Supports RTL languages
- Unit test coverage > 80%