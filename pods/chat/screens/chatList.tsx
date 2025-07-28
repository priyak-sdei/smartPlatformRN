import { Layout } from '@shared/index';
import React from 'react';
import { View } from 'react-native';
import ListComponent from '../components/listComponent';
import Search from '../components/search';
import { data } from '../data';
import { getStyles } from './styles';

import { useChatList } from '../hooks/useChatList';
import { ChatNavigationProp } from '../types';

/**
 * ChatListScreen component to display a list of chat conversations.
 * It includes a search input and a list of chat items.
 *
 * @param {ChatListScreenProps} props - The properties for the component.
 * @returns {JSX.Element} The rendered component.
 */
export type ChatListProps = {
  navigation: ChatNavigationProp<'Chat'>;
};

const ChatList: React.FC<ChatListProps> = ({ navigation }) => {
  // const { theme } = useTheme();
  const styles = getStyles();
  const {
    handleItemPress,
    handleChangeText,
    listMessages,
    searchText,
    handleClearSearch,
  } = useChatList(navigation, data);

  return (
    <Layout>
      <Layout.Header title={'Messages'} style={styles.layoutHeader} />
      <Layout.Body scrollable={false} style={styles.bodyContainer}>
        <View style={styles.container}>
          <Search
            value={searchText}
            onChangeText={handleChangeText}
            onClear={handleClearSearch}
          />
          <ListComponent data={listMessages} onItemPress={handleItemPress} />
        </View>
      </Layout.Body>
    </Layout>
  );
};

export default ChatList;
