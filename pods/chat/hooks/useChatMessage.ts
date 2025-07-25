import { useEffect, useRef } from 'react';
import { FlatList, Keyboard, Platform, KeyboardEvent } from 'react-native';
import { Message } from '../types/components';

/**
 * Props interface for useChatMessages hook
 * @interface UseChatMessagesProps
 * @property {Message[]} messages - Array of chat messages to display
 * @property {boolean} [autoScroll=true] - Whether to auto-scroll to bottom on new messages
 */
interface UseChatMessagesProps {
  messages: Message[];
  autoScroll?: boolean;
}

/**
 * Custom hook to manage chat messages scrolling behavior
 * Handles auto-scrolling on new messages and keyboard show events
 *
 * @param {UseChatMessagesProps} props - Hook configuration props
 * @returns {Object} Object containing flatListRef for the chat messages list
 */
export const useChatMessages = ({
  messages,
  autoScroll = true,
}: UseChatMessagesProps) => {
  // Reference to the FlatList component
  const flatListRef = useRef<FlatList>(null);

  /**
   * Scrolls the chat to the bottom with animation
   * Uses a small delay to ensure proper scroll behavior
   */
  const scrollToBottom = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  // Auto-scroll when new messages are added
  useEffect(() => {
    if (autoScroll && messages.length > 0) {
      scrollToBottom();
    }
  }, [messages.length, autoScroll]);

  // Handle keyboard appearance
  useEffect(() => {
    const keyboardDidShow = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (_e: KeyboardEvent) => {
        scrollToBottom();
      },
    );

    // Cleanup listener on component unmount
    return () => {
      keyboardDidShow.remove();
    };
  }, []);

  return {
    flatListRef,
  };
};
