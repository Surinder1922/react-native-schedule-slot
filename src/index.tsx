import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Text,
  FlatList,
  Platform,
  Dimensions,
} from 'react-native';
import { getDayOfWeek, getHoursAndMinutes, getMonthName } from './helper';

const SLOT_SIZE = 50;
const GAP = 1;
const defaultColors = {
  dateTimeBoxBackground: '#e8eaf6',
  backgroundColor: '#2196f3',
  availableSlotColor: '#90caf9',
  selectedSlotColor: '#0d47a1',
  todayColor: '#0d47a1',
  bookedSlotColor: '#4A4A4A',
  gapColor: '#eeeeee',
  notAvailableSlotColor: '#fff',
};
interface BookingData {
  slots: string[];
  bookedSlots: { date: string; slots: string[] }[];
  availableSlots: { date: string; slots: string[] }[];
}
interface RNBookingProps {
  onDateChange?: (date: Date) => void;
  onDayPress?: (date?: Date) => void;
  bookingData: BookingData;
  colors?: {
    dateTimeBoxBackground: string;
    backgroundColor: string;
    availableSlotColor: string;
    selectedSlotColor: string;
    todayColor: string;
    bookedSlotColor: string;
    gapColor: string;
    notAvailableSlotColor: string;
  };
  slotSize?: number;
  scrollToCurrentDate?: boolean;
  hideSlotInfoFooter?: boolean;
}

const RNBooking: React.FC<RNBookingProps> = ({
  onDateChange,
  onDayPress,
  bookingData,
  colors = defaultColors,
  slotSize = SLOT_SIZE,
  scrollToCurrentDate = true,
  hideSlotInfoFooter = false,
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<
    { day: number; time: string } | undefined
  >();
  const currentMonth = selectedDate.getMonth();
  const currentYear = selectedDate.getFullYear();
  const flatListRef = useRef<FlatList>(null);
  const getDaysInMonth = useCallback((month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  }, []);

  const slotBoxSize = useMemo(
    () => ({ height: slotSize, width: slotSize }),
    [slotSize]
  );

  const generateCalendar = useCallback(
    (month: number, year: number) => {
      const daysInMonth = getDaysInMonth(month, year);
      const days = [];
      for (let i = 1; i <= daysInMonth; i++) {
        days.push(i);
      }
      return days;
    },
    [getDaysInMonth]
  );

  const currentMonthName = useMemo(() => {
    return getMonthName(currentMonth);
  }, [currentMonth]);

  const allSlots = useMemo(
    () => [currentMonthName, ...bookingData.slots],
    [currentMonthName, bookingData.slots]
  );

  const calendar = useMemo(
    () => generateCalendar(currentMonth + 1, currentYear),
    [currentMonth, currentYear, generateCalendar]
  );

  const handleMonthChange = useCallback(
    (direction: number) => {
      const newDate = new Date(selectedDate);
      newDate.setMonth(newDate.getMonth() + direction);
      setSelectedDate(newDate);
      onDateChange?.(newDate);
    },
    [selectedDate, onDateChange]
  );

  const getDay = useMemo(
    () => (day: number) => {
      return getDayOfWeek(currentMonth, day, currentYear);
    },
    [currentMonth, currentYear]
  );

  const handleDayPress = useCallback(
    (day: number, time: string) => {
      const date = new Date(selectedDate);
      const { hours, minutes } = getHoursAndMinutes(time);
      date.setDate(day);
      date.setHours(hours, minutes, 0, 0);
      setSelectedDay({ day, time });
      onDayPress?.(date);
    },
    [selectedDate, onDayPress]
  );

  const checkIfToday = useMemo(
    () => (day: number) => {
      const calendarDate = new Date(selectedDate);
      calendarDate.setDate(day);
      const todayDate = new Date();
      return (
        todayDate.setHours(0, 0, 0, 0) === calendarDate.setHours(0, 0, 0, 0)
      );
    },
    [selectedDate]
  );

  const getDayWiseBookingInfo = useMemo(
    () => (day: number) => {
      const date = new Date();
      date.setDate(day);
      date.setMonth(currentMonth);
      date.setFullYear(currentYear);
      date.setHours(0, 0, 0, 0);
      const dayWiseBookedSlots =
        bookingData?.bookedSlots?.find((b) => {
          const bookingDate = new Date(parseInt(b.date, 10));
          bookingDate.setHours(0, 0, 0, 0);

          return bookingDate.toDateString() === date.toDateString();
        })?.slots ?? [];
      const dayWiseAvailableSlots =
        bookingData?.availableSlots?.find((b) => {
          const bookingDate = new Date(parseInt(b.date, 10));
          bookingDate.setHours(0, 0, 0, 0);

          return bookingDate.toDateString() === date.toDateString();
        })?.slots ?? [];

      return {
        availableSlots: dayWiseAvailableSlots,
        bookedSlots: dayWiseBookedSlots,
      };
    },
    [
      bookingData?.availableSlots,
      bookingData?.bookedSlots,
      currentMonth,
      currentYear,
    ]
  );

  const scrollToToday = useCallback(() => {
    if (flatListRef?.current) {
      const today = new Date();
      if (
        currentMonth === today.getMonth() &&
        currentYear === today.getFullYear()
      ) {
        setTimeout(() => {
          flatListRef?.current?.scrollToItem({
            item: today.getDate(),
            animated: true,
          });
        }, 300);
      }
    }
  }, [currentMonth, currentYear]);

  useEffect(() => {
    if (scrollToCurrentDate) {
      scrollToToday();
    }
  }, [scrollToToday, scrollToCurrentDate]);

  const renderItem = useCallback(
    ({ item }: { item: number; index: number }) => {
      const isToday = checkIfToday(item);
      const { availableSlots, bookedSlots } = getDayWiseBookingInfo(item);
      return (
        <View style={[styles.dayContainer, slotBoxSize]}>
          <View
            style={{
              height: slotSize,
              width: slotSize,
              backgroundColor: colors.gapColor,
            }}
          >
            <View
              style={[
                styles.slotDayBox,
                {
                  backgroundColor: isToday
                    ? colors.todayColor
                    : colors.dateTimeBoxBackground,
                },
              ]}
            >
              <Text style={isToday ? styles.today : styles.day}>
                {getDay(item)}
              </Text>
              <Text style={isToday ? styles.today : styles.day}>
                {item.toString()}
              </Text>
            </View>
          </View>
          {allSlots.map((time, idx) => {
            if (idx === 0) {
              return null;
            }
            const isSelectedSlot =
              selectedDay?.day === item && selectedDay?.time === time;
            const isSlotAvailable = availableSlots?.includes(time);
            if (!isSlotAvailable) {
              const isBooked = bookedSlots?.includes(time) ?? false;
              if (isBooked) {
                return (
                  <View
                    key={`booked_${item}_${time}`}
                    style={{
                      height: slotSize,
                      width: slotSize,
                      backgroundColor: colors.gapColor,
                    }}
                  >
                    <View
                      key={`${item}_${time}`}
                      style={[
                        styles.slotBox,
                        slotBoxSize,
                        { backgroundColor: colors.bookedSlotColor },
                      ]}
                    />
                  </View>
                );
              }
              return (
                <View
                  key={`available_${item}_${time}`}
                  style={{
                    height: slotSize,
                    width: slotSize,
                    backgroundColor: colors.gapColor,
                  }}
                >
                  <View
                    style={[
                      styles.slotBox,
                      slotBoxSize,
                      { backgroundColor: colors.notAvailableSlotColor },
                    ]}
                  />
                </View>
              );
            }
            return (
              <TouchableOpacity
                onPress={() => handleDayPress(item, time)}
                key={`${item}_${time}`}
                style={{
                  height: slotSize,
                  width: slotSize,
                  backgroundColor: colors.gapColor,
                }}
              >
                <View
                  style={[
                    {
                      backgroundColor: isSelectedSlot
                        ? colors.selectedSlotColor
                        : colors.availableSlotColor,
                    },
                    styles.availableSlot,
                  ]}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      );
    },
    [
      allSlots,
      checkIfToday,
      colors.availableSlotColor,
      colors.bookedSlotColor,
      colors.dateTimeBoxBackground,
      colors.gapColor,
      colors.notAvailableSlotColor,
      colors.selectedSlotColor,
      colors.todayColor,
      getDay,
      getDayWiseBookingInfo,
      handleDayPress,
      selectedDay?.day,
      selectedDay?.time,
      slotBoxSize,
      slotSize,
    ]
  );

  const renderFooter = useCallback(() => {
    if (hideSlotInfoFooter) {
      return null;
    }
    return (
      <View style={styles.footerWrapper}>
        <View style={styles.slotInfoTile}>
          <Text style={styles.label}>Not Available</Text>
          <View
            style={[
              {
                backgroundColor: colors.notAvailableSlotColor,
              },
              styles.slotInfoBox,
            ]}
          />
        </View>
        <View style={styles.slotInfoTile}>
          <Text style={styles.label}>Booked</Text>
          <View
            style={[
              {
                backgroundColor: colors.bookedSlotColor,
              },
              styles.slotInfoBox,
            ]}
          />
        </View>
        <View style={styles.slotInfoTile}>
          <Text style={styles.label}>Available</Text>
          <View
            style={[
              {
                backgroundColor: colors.availableSlotColor,
              },
              styles.slotInfoBox,
            ]}
          />
        </View>
      </View>
    );
  }, [
    colors.availableSlotColor,
    colors.bookedSlotColor,
    colors.notAvailableSlotColor,
    hideSlotInfoFooter,
  ]);
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.backgroundColor }]}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => handleMonthChange(-1)}>
          <Text style={styles.label}>Prev</Text>
        </TouchableOpacity>
        <Text style={styles.label}>
          {`${selectedDate.toLocaleString('default', {
            month: 'long',
          })}, ${currentYear}`}
        </Text>
        <TouchableOpacity onPress={() => handleMonthChange(1)}>
          <Text style={styles.label}>Next</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View
          style={[
            styles.timeSlotCol,
            { backgroundColor: colors.backgroundColor },
          ]}
        >
          <View style={{ width: slotSize }}>
            {allSlots.map((time, index) => (
              <View key={time} style={[styles.row, slotBoxSize]}>
                <View
                  style={[slotBoxSize, { backgroundColor: colors.gapColor }]}
                >
                  <View
                    style={[
                      styles.timeSlotBox,
                      { backgroundColor: colors.dateTimeBoxBackground },
                    ]}
                  >
                    <Text
                      style={index === 0 ? styles.labelBold : styles.timeLabel}
                    >
                      {time}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
          <View
            style={
              Platform.OS === 'web' && {
                width: Dimensions.get('window').width - SLOT_SIZE,
                flex: 1,
                marginRight: 'auto',
                marginLeft: 'auto',
              }
            }
          >
            <FlatList
              data={calendar}
              ref={flatListRef}
              horizontal
              renderItem={renderItem}
              keyExtractor={(item) => item.toString()}
            />
          </View>
        </View>
        {renderFooter()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingHorizontal: 20,
    gap: 20,
    paddingBottom: 18,
  },
  label: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
  today: {
    fontSize: 12,
    color: 'white',
    fontWeight: '500',
  },
  day: {
    color: '#6D6D6D',
    fontSize: 9,
  },
  labelBold: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6A6A6A',
  },
  timeLabel: {
    fontSize: 9,
    color: '#6A6A6A',
  },
  slotDayBox: {
    flex: 1,
    margin: GAP,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeSlotBox: {
    margin: GAP,
    flex: 1,
    backgroundColor: '#e8eaf6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeSlotCol: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  dayContainer: {
    alignItems: 'center',
  },
  row: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  slotBox: {
    margin: GAP,
  },
  availableSlot: {
    flex: 1,
    margin: GAP,
  },
  footerWrapper: {
    padding: 18,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  slotInfoTile: {
    flexDirection: 'row-reverse',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slotInfoBox: {
    height: 20,
    width: 20,
  },
});

export default RNBooking;
