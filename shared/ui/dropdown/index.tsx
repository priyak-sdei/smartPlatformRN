import React, { useState } from 'react';
import { View, ViewStyle, TextStyle } from 'react-native';
import {
  Dropdown as ElementDropdown,
  MultiSelect as ElementMultiSelect,
} from 'react-native-element-dropdown';
import Text from '../Text';
import { useTheme } from '@shared/theme';
import { getStyles } from './styles';

interface DropdownOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string | number | Array<string | number> | null;
  onChange: (value: string | number | Array<string | number> | null) => void;
  placeholder?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  title?: string;
  titleTx?: string;
  // Customization props
  search?: boolean;
  searchPlaceholder?: string;
  maxHeight?: number;
  // Validation props
  required?: boolean;
  error?: string;
  errorTx?: string;
  // Multi-select
  multiple?: boolean;
  renderSelectedItems?: (selected: DropdownOption[]) => React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  style,
  textStyle,
  disabled = false,
  title,
  titleTx,
  // Customization props
  search = false,
  searchPlaceholder = 'Search...',
  maxHeight = 200,
  // Validation props
  required = false,
  error,
  errorTx,
  // Multi-select
  multiple = false,
  renderSelectedItems,
}) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const [isFocus, setIsFocus] = useState(false);

  // Convert options to dropdown format
  const dropdownItems = options.map(option => ({
    label: option.label,
    value: option.value,
    disabled: option.disabled,
  }));

  return (
    <View style={styles.wrapper}>
      {(title || titleTx) && (
        <Text style={styles.title} tx={titleTx}>
          {title}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}

      {multiple ? (
        <ElementMultiSelect
          style={[
            styles.dropdown,
            isFocus && styles.dropdownFocus,
            error && styles.errorBorder,
            style,
          ].filter(Boolean)}
          placeholderStyle={styles.placeholder}
          selectedTextStyle={[styles.selectedText, textStyle]}
          inputSearchStyle={styles.inputSearch}
          iconStyle={styles.iconStyle}
          data={dropdownItems}
          search={search}
          searchPlaceholder={searchPlaceholder}
          maxHeight={maxHeight}
          labelField="label"
          valueField="value"
          placeholder={placeholder}
          value={Array.isArray(value) ? value.map(String) : []}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={selected => {
            onChange(selected);
          }}
          disable={disabled}
          renderSelectedItem={
            renderSelectedItems
              ? item => {
                  const option = dropdownItems.find(opt => opt.value === item);
                  if (!option) return null;
                  // Must return ReactElement or null
                  const rendered = renderSelectedItems([option]);
                  // If renderSelectedItems returns an array, return the first element or null
                  if (Array.isArray(rendered)) return rendered[0] || null;
                  return rendered || null;
                }
              : undefined
          }
        />
      ) : (
        <ElementDropdown
          style={[
            styles.dropdown,
            isFocus && styles.dropdownFocus,
            error && styles.errorBorder,
            style,
          ].filter(Boolean)}
          placeholderStyle={styles.placeholder}
          selectedTextStyle={[styles.selectedText, textStyle]}
          inputSearchStyle={styles.inputSearch}
          iconStyle={styles.iconStyle}
          data={dropdownItems}
          search={search}
          searchPlaceholder={searchPlaceholder}
          maxHeight={maxHeight}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? placeholder : '...'}
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            if (item) {
              onChange(item.value);
              setIsFocus(false);
            }
          }}
          disable={disabled}
        />
      )}

      {(error || errorTx) && (
        <Text style={styles.errorText} tx={errorTx}>
          {error}
        </Text>
      )}
    </View>
  );
};

export default Dropdown;
