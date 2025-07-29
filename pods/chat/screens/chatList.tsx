import { Layout } from '@shared/index';
import React from 'react';
import { View } from 'react-native';
import ListComponent from '../components/listComponent';
import Search from '../components/search';
import { data } from '../data';
import { getStyles } from './styles';

import { useChatList } from '../hooks/useChatList';
import { ChatNavigationProp } from '../types';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const styles = getStyles();
  const {
    chatlistMessages,
    searchText,
    handleChatItemPress,
    handleChangeSearchText,
    handleClearSearch,
  } = useChatList(navigation, data);

  return (
    <Layout>
      <Layout.Header
        title={t('Messages')}
        style={styles.chatListLayoutHeader}
      />

      <View style={styles.container}>
        <Search
          searchValue={searchText}
          onChangeSearchValue={handleChangeSearchText}
          onClearSearch={handleClearSearch}
        />
        <ListComponent
          data={chatlistMessages}
          onListItemPress={handleChatItemPress}
        />
      </View>
    </Layout>
  );
};

export default ChatList;
