import { useState } from 'react';
import { ChatNavigationProp, ListItem } from '../types';

/**
 * Custom hook to handle chat list functionality
 *
 * @param navigation - Navigation prop for handling screen navigation
 * @returns Object containing methods for chat list interactions
 */
export const useChatList = (
  navigation: ChatNavigationProp<'Chat'>,
  data: ListItem[],
) => {
  const [listMessages, setListMessages] = useState<ListItem[]>(data);
  const [searchText, setSearchText] = useState('');

  /**
   * Handles press event on a chat list item
   * Navigates to the conversation screen with the selected item data
   *
   * @param item - The chat list item that was pressed
   */
  const handleItemPress = (item: ListItem) => {
    navigation.navigate('ChatDetail', { item: item });
  };

  const handleChangeText = (text: string) => {
    setSearchText(text);
    const filtered = data.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase()),
    );
    setListMessages(filtered);
    if (text === '') {
      setListMessages(data);
    }
  };

  const handleClearSearch = () => {
    setSearchText('');
    setListMessages(data);
  };
  return {
    searchText,
    handleItemPress,
    handleChangeText,
    listMessages,
    handleClearSearch,
  };
};
