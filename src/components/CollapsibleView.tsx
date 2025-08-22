import { ChevronDown, ChevronUp } from '@src/assets/svg';
import { colors, fonts, moderateScale } from '@src/theme';
import React from 'react';
import { TextStyle, Pressable, StyleSheet, Text, View } from 'react-native';
import Collapsible from 'react-native-collapsible';

interface CollapsibleViewProps {
  label: string;
  children: React.ReactNode;
  value?: string;
  labelStyle?: TextStyle;
  valueStyle?: TextStyle;
}

const CollapsibleView: React.FC<CollapsibleViewProps> = ({
  label,
  children,
  value,
  labelStyle,
  valueStyle,
}) => {
  const [isCollapsed, setIsCollapsed] = React.useState(true);

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
        <View style={styles.collapsibleContent}>{children}</View>
      </Collapsible>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(8),
    marginTop: moderateScale(16),
    marginHorizontal: moderateScale(16),
  },
  collapsibleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(12),
    justifyContent: 'space-between',
  },
  collapsibleHeaderContent: {
    flex: 1,
    flexDirection: 'row',
    marginEnd: moderateScale(12),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  collapsibleContent: {
    borderTopWidth: moderateScale(1),
    paddingVertical: moderateScale(12),
    marginHorizontal: moderateScale(12),
    borderTopColor: colors.border,
  },
  collapsibleHeaderLabel: {
    fontFamily: fonts.medium,
    fontSize: moderateScale(16),
  },
  collapsibleHeaderValue: {
    fontFamily: fonts.regular,
    fontSize: moderateScale(16),
  },
});

export default CollapsibleView;
