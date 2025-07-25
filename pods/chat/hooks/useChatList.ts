import { ChatNavigationProp } from '../types/navigation';
import { ListItem } from '../types/components';
import { useState } from 'react';

/**
 * Custom hook to handle chat list functionality
 *
 * @param navigation - Navigation prop for handling screen navigation
 * @returns Object containing methods for chat list interactions
 */
export const useChatList = (
  navigation: ChatNavigationProp<'ChatList'>,
  data: ListItem[],
) => {
  const [listMessages, setListMessages] = useState<ListItem[]>(data);
  /**
   * Handles press event on a chat list item
   * Navigates to the conversation screen with the selected item data
   *
   * @param item - The chat list item that was pressed
   */
  const handleItemPress = (item: ListItem) => {
    navigation.navigate('ConversationScreen', { item: item });
  };

  const handleChangeText = (text: string) => {
    console.log('text', text);
    const filteredData = data.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase()),
    );
    setListMessages(filteredData);
    if (text === '') {
      setListMessages(data);
    }
  };

  return {
    handleItemPress,
    handleChangeText,
    listMessages,
  };
};
