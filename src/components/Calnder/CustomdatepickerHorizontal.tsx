import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Alert,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import moment, {Moment} from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Images from '../../constants/Images';
import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';
import {moderateScale, width} from '../../constants/Utils';

interface CustomMonthPickerProps {
  SelectedDate: (date: Moment) => void;
  selectedDate1?: Moment;
  leficon?: any;
  LeftPress?: () => void;
}

export const CustomMonthPicker: React.FC<CustomMonthPickerProps> = ({
  SelectedDate,
  selectedDate1,
  leficon,
  LeftPress,
}) => {
  const currentDate = moment();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Moment>(
    selectedDate1 || currentDate,
  );
  const [weekDates, setWeekDates] = useState<Moment[]>(
    getWeekDates(selectedDate),
  );
  const scrollViewRef = useRef<ScrollView>(null);

  function getWeekDates(date: Moment): Moment[] {
    const weekStart = date.clone().startOf('month');
    const weekDates = Array.from({length: date.daysInMonth()}, (_, i) =>
      weekStart.clone().add(i, 'days'),
    );
    return weekDates;
  }

  useEffect(() => {
    setWeekDates(getWeekDates(selectedDate));
    // Scroll to the selected date position
    const selectedIndex = weekDates.findIndex(date =>
      date.isSame(selectedDate, 'day'),
    );
    if (selectedIndex >= 0 && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: selectedIndex * 35 - 35, // Adjust as needed for proper alignment
        animated: true,
      });
    }
  }, [selectedDate]);

  return (
    <View
      style={{
        borderRadius: 10,
        borderWidth: 1,
        paddingBottom: 10,
        borderColor: Colors.green,
      }}>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        minimumDate={new Date()}
        onConfirm={(date: Date) => {
          const momentDate = moment(date);
          setSelectedDate(momentDate);
          setWeekDates(getWeekDates(momentDate));
          setDatePickerVisibility(false);
          SelectedDate(momentDate);
        }}
        onCancel={() => {
          setDatePickerVisibility(false);
        }}
      />

      <View style={styles.headerContainer}>
        <View style={styles.headerRow}>
          <Text
            onPress={() => {
              setDatePickerVisibility(!isDatePickerVisible);
            }}
            allowFontScaling={false}
            style={styles.headerText}>
            {moment(selectedDate).format('MMMM , YYYY')}
          </Text>
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.dateContainer}
        ref={scrollViewRef}>
        {weekDates.map((date, index) => (
          <Pressable
            onPress={() => {
              setSelectedDate(date);
              SelectedDate(date);
            }}
            key={index}
            style={[
              styles.dateItem,
              date.isSame(selectedDate, 'day') && styles.highlightedDate,
            ]}>
            <Text
              style={[
                styles.dayText,
                date.isSame(selectedDate, 'day') && styles.highlightedDay,
              ]}>
              {date.format('ddd')}
            </Text>
            <View
              style={[
                styles.mainViewOfText,
                date.isSame(selectedDate, 'day') && styles.highmainViewOfText,
              ]}>
              <Text
                style={[
                  styles.dateText,
                  date.isSame(selectedDate, 'day') &&
                    styles.highlightedDateText,
                ]}>
                {date.format('D')}
              </Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
  headerRow: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  headerText: {
    fontSize: moderateScale(18),
    fontFamily: Fonts.THICCCBOIBold,
    color: '#1C202F',
  },
  dateContainer: {
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    marginTop: 20,
  },
  dateItem: {
    marginHorizontal: 5,
    backgroundColor: '#EFF4F0',
    height: 58,
    width: 35,
    alignItems: 'center',
    borderRadius: 24,
    justifyContent: 'center',
  },
  dateText: {
    fontFamily: Fonts.THICCCBOIBold,
    color: '#828282',
    fontSize: 14,
  },
  dayText: {
    color: '#828282',
    fontSize: 10,
    marginTop: 4,
    fontFamily: Fonts.THICCCBORegular,
  },
  highlightedDate: {
    backgroundColor: Colors.green,
    height: 58,
    width: 35,
    borderRadius: 24,
  },
  highlightedDateText: {
    color: Colors.white,
  },
  highlightedDay: {
    color: Colors.white,
    fontSize: 10,
    marginTop: 4,
    fontFamily: Fonts.THICCCBORegular,
  },
  highmainViewOfText: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainViewOfText: {
    width: 30,
    height: 30,
    alignItems: 'center',
    borderRadius: 30,
    justifyContent: 'center',
  },
});
