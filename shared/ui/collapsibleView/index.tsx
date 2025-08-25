import { ChevronDown, ChevronUp } from '@src/assets/svg';
import React from 'react';
import { Pressable, Text, TextStyle, View, ViewStyle } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { getStyles } from './styles';
import { useTheme } from '@shared/theme';

interface CollapsibleViewProps {
  label: string;
  children: React.ReactNode;
  value?: string;
  labelStyle?: TextStyle;
  valueStyle?: TextStyle;
  style?: ViewStyle;
}

const CollapsibleView: React.FC<CollapsibleViewProps> = ({
  label,
  children,
  value,
  labelStyle,
  valueStyle,
  style,
}) => {
  const [isCollapsed, setIsCollapsed] = React.useState(true);
  const { theme } = useTheme();
  const styles = getStyles(theme);
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.collapsibleHeader}
        onPress={() => setIsCollapsed(!isCollapsed)}
      >
        <View style={styles.collapsibleHeaderContent}>
          <Text style={[styles.collapsibleHeaderLabel, { ...labelStyle }]}>
            {label}
          </Text>
          {value && (
            <Text style={[styles.collapsibleHeaderValue, { ...valueStyle }]}>
              {value}
            </Text>
          )}
        </View>
        {isCollapsed ? <ChevronDown /> : <ChevronUp />}
      </Pressable>
      <Collapsible collapsed={isCollapsed}>
        <View style={[styles.collapsibleContent, style]}>{children}</View>
      </Collapsible>
    </View>
  );
};

export default CollapsibleView;
