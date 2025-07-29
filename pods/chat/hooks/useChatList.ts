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
  const [chatlistMessages, setChatListMessages] = useState<ListItem[]>(data);
  const [searchText, setSearchText] = useState('');

  /**
   * Handles press event on a chat list item
   * Navigates to the conversation screen with the selected item data
   *
   * @param item - The chat list item that was pressed
   */
  const handleChatItemPress = (chatItem: ListItem) => {
    navigation.navigate('ChatDetail', { item: chatItem });
  };

  const handleChangeSearchText = (searchValue: string) => {
    setSearchText(searchValue);
    const filteredChatList = data.filter(item =>
      item.name.toLowerCase().includes(searchValue.toLowerCase()),
    );
    setChatListMessages(filteredChatList);
    if (searchValue === '') {
      setChatListMessages(data);
    }
  };

  const handleClearSearch = () => {
    setSearchText('');
    setChatListMessages(data);
  };
  return {
    searchText,
    chatlistMessages,
    handleChatItemPress,
    handleChangeSearchText,
    handleClearSearch,
  };
};
