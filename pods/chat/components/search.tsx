import { useTheme } from '@shared/theme';

import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  TextInput as RNTextInput,
  StyleProp,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { getStyles } from './styles';
import { SearchIcon } from '../assets/svg';
interface CustomSearchTextInputProps extends TextInputProps {
  rightIcon?: React.ReactNode; // Icon or element on the right side
  containerStyle?: ViewStyle; // Style for the outer container
  labelStyle?: StyleProp<TextStyle>; // Style for the label text
  inputRef?: React.Ref<RNTextInput>; // Ref forwarding for focus/blur
  txOptions?: import('i18next').TOptions; // Use the TOptions type from i18next
}

/**
 * Search component for inputting search queries.
 * It includes a text input field with a search icon.
 *
 * @param {CustomSearchTextInputProps} props - The properties for the component.
 * @returns {JSX.Element} The rendered component.
 */
const Search: React.FC<CustomSearchTextInputProps> = ({
  inputRef,
  style,

  ...props
}) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.searchContainer}>
      <RNTextInput
        placeholderTextColor={theme.colors.placeholder}
        selectionColor={theme.colors.primary}
        ref={inputRef}
        style={[styles.searchInput, style]}
        {...props}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder={t('Search')}
      />
      <SearchIcon style={styles.searchIcon} />
    </View>
  );
};

export default Search;
