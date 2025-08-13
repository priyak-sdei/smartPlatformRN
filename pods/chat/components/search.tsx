import { moderateScale, useTheme } from '@shared/theme';

import React, { useRef } from 'react';
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
import { CrossIcon, SearchIcon } from '../assets/svg';
interface CustomSearchTextInputProps extends TextInputProps {
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
  labelStyle?: StyleProp<TextStyle>;
  inputRef?: React.Ref<RNTextInput>;
  txOptions?: import('i18next').TOptions;
  value?: string; // NEW: controlled value from parent
  onClear?: () => void; // NEW: callback when CrossIcon is pressed
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
  value = '',
  onChangeText,
  onClear,
  ...props
}) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const internalRef = useRef<RNTextInput>(null);
  const ref = inputRef ?? internalRef;

  return (
    <View style={[styles.searchContainer, style]}>
      <RNTextInput
        ref={ref}
        value={value}
        onChangeText={onChangeText}
        placeholder={t('Search')}
        placeholderTextColor={theme.colors.placeholder}
        selectionColor={theme.colors.primary}
        autoCapitalize="none"
        autoCorrect={false}
        style={[styles.searchInput, style]}
        {...props}
      />
      {value.length > 0 ? (
        <CrossIcon
          style={[styles.crossIcon, style]}
          height={moderateScale(20)}
          width={moderateScale(20)}
          onPress={onClear}
        />
      ) : (
        <SearchIcon style={[styles.searchIcon, style]} />
      )}
    </View>
  );
};

export default Search;
