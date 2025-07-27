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
import { ListItem } from '../types/components';
import { getStyles } from './styles';

// ListComponentProps interface for the component props
export interface ListComponentProps {
  data: ListItem[];
  onItemPress: (item: ListItem) => void;
}

// ListComponent component to display a list of items
const ListComponent: React.FC<ListComponentProps> = ({ data, onItemPress }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  // Render each list item
  const renderItem: ListRenderItem<ListItem> = ({ item }) => (
    <TouchableOpacity
      style={styles.listContainer}
      onPress={() => onItemPress(item)}
    >
      <Image source={CHATIMAGES.chat.avatar} style={styles.profileImage} />
      <View style={styles.content}>
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
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ListComponent;
