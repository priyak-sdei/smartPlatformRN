/* eslint-disable react/no-unstable-nested-components */
import { useTheme } from '@shared/theme';
import React from 'react';
import {
  FlatList,
  Image,
  ListRenderItem,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { CHATIMAGES } from '../assets/images';

import { getStyles } from './styles';
import { ListItem } from '../types';
import { useTranslation } from 'react-i18next';

// ListComponentProps interface for the component props
export interface ListComponentProps {
  data: ListItem[];
  onListItemPress: (item: ListItem) => void;
}

// ListComponent component to display a list of items
const ListComponent: React.FC<ListComponentProps> = ({
  data,
  onListItemPress,
}) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = getStyles(theme);

  // Render each list item
  const renderItem: ListRenderItem<ListItem> = ({ item }) => (
    <TouchableOpacity
      style={styles.listContainer}
      onPress={() => onListItemPress(item)}
    >
      <Image source={CHATIMAGES.chat.avatar} style={styles.profileImage} />
      <View style={styles.listInfoContent}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.message} numberOfLines={1} ellipsizeMode="tail">
          {item.message}
        </Text>
      </View>
      <View style={styles.timeContent}>
        <Text style={styles.timeText}>{item.time}</Text>
        {item.isMessage && (
          <View style={styles.isMessage}>
            <Text style={styles.badgeText}>1</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.flatListContainer}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContentContainer}
        ListEmptyComponent={() => (
          <View style={styles.emptyListContainer}>
            <Text style={styles.emptyText}>{t('No chats available')}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default ListComponent;
