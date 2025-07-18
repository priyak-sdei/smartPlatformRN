import { Text } from '@shared/index';
import { Month, Week } from '@src/assets/svg';
import {
  colors,
  fonts,
  horizontalScale,
  moderateScale,
  spacing,
  verticalScale,
} from '@shared/theme';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import MonthView from '../components/monthView';
import WeekView from '../components/weekView';
import { useSchedule } from '../hooks/useSchedule';

const Schedule = () => {
  const { events, calendarMode, setCalendarMode } = useSchedule();
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{t('schedule.title')}</Text>
      <View style={styles.headerContent}>
        <View>
          <Text style={styles.contentHeaderText}>{t('schedule.subTitle')}</Text>

          <Text style={styles.contentSubText}>
            {t('schedule.subTitleContent')}
          </Text>
        </View>

        <View style={styles.toggleContent}>
          <TouchableOpacity
            style={[
              styles.iconWrapperWeek,
              calendarMode === 'week' && styles.selectedIconWrapper,
            ]}
            onPress={() => setCalendarMode('week')}
          >
            <Week height={20} width={20} style={styles.icons} />
          </TouchableOpacity>

          <View style={styles.verticalLine} />

          <TouchableOpacity
            style={[
              styles.iconWrapperMonth,
              calendarMode === 'month' && styles.selectedIconWrapper,
            ]}
            onPress={() => setCalendarMode('month')}
          >
            <Month height={20} width={20} style={styles.icons} />
          </TouchableOpacity>
        </View>
      </View>
      {calendarMode === 'month' ? <MonthView /> : <WeekView events={events} />}
    </View>
  );
};

export default Schedule;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: verticalScale(12),
    paddingHorizontal: horizontalScale(12),
    backgroundColor: colors.background,
  },
  headerText: {
    fontFamily: fonts.medium,
    fontSize: moderateScale(spacing.m),
  },
  contentHeaderText: {
    marginTop: verticalScale(5),
    fontFamily: fonts.medium,
    fontSize: moderateScale(spacing.s),
  },
  contentSubText: {
    fontFamily: fonts.medium,
    fontSize: moderateScale(spacing.xs),
    color: colors.placeholder,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  toggleContent: {
    marginTop: verticalScale(5),
    alignContent: 'center',
    borderWidth: 1,
    borderRadius: moderateScale(50),
    borderColor: colors.inputBorder,
    flexDirection: 'row',
    height: '80%',
  },
  icons: {
    marginHorizontal: horizontalScale(10),
    borderRadius: moderateScale(20),
    padding: moderateScale(6),
  },
  verticalLine: {
    borderWidth: 1,
    height: verticalScale(35),
    borderColor: colors.inputBorder,
  },
  monthYearHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: verticalScale(10),
  },

  selectedIconWrapper: {
    backgroundColor: colors.primary,
  },
  calendarContent: {
    marginTop: verticalScale(20),
  },
  iconWrapperMonth: {
    borderTopRightRadius: moderateScale(20),
    borderBottomRightRadius: moderateScale(20),
    padding: moderateScale(6),
  },
  iconWrapperWeek: {
    borderTopLeftRadius: moderateScale(20),
    borderBottomLeftRadius: moderateScale(20),
    padding: moderateScale(6),
  },
});
