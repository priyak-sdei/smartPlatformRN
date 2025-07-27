import { useTheme } from '@shared/theme';
import React from 'react';
import { View } from 'react-native';
import ListComponent from '../components/listComponent';
import Search from '../components/search';
import { data } from '../data';
import { Layout } from '@shared/index';
import { getStyles } from './styles';
import { ChatNavigationProp } from '../types/navigation';
import { useChatList } from '../hooks/useChatList';

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
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const { handleItemPress, handleChangeText, listMessages } = useChatList(
    navigation,
    data,
  );

  return (
    <Layout>
      <Layout.Header title={'Messages'} />
      <View style={styles.container}>
        <Search onChangeText={handleChangeText} />
        <ListComponent data={listMessages} onItemPress={handleItemPress} />
      </View>
    </Layout>
  );
};

export default ChatList;
