import { Platform, View } from 'react-native';
import RNBooking from 'react-native-schedule-slot';
export default function App() {
  const slots = [
    '11:00 AM',
    '12:00 PM',
    '1:00 PM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
    '5:00 PM',
    '6:00 PM',
    '7:00 PM',
    '8:00 PM',
    '9:00 PM',
    '10:00 PM',
  ];

  const availableSlots = [
    {
      date: '1722710400000',
      slots: ['11:00 AM', '1:00 PM', '4:00 PM', '7:00 PM', '9:00 PM'],
    },
    {
      date: '1722796800000',
      slots: [
        '12:00 PM',
        '2:00 PM',
        '5:00 PM',
        '6:00 PM',
        '8:00 PM',
        '10:00 PM',
      ],
    },
    {
      date: '1722883200000',
      slots: [
        '11:00 AM',
        '1:00 PM',
        '3:00 PM',
        '4:00 PM',
        '7:00 PM',
        '8:00 PM',
      ],
    },
    {
      date: '1722969600000',
      slots: [
        '12:00 PM',
        '2:00 PM',
        '5:00 PM',
        '6:00 PM',
        '9:00 PM',
        '10:00 PM',
      ],
    },
    {
      date: '1723056000000',
      slots: [
        '11:00 AM',
        '1:00 PM',
        '3:00 PM',
        '4:00 PM',
        '7:00 PM',
        '8:00 PM',
      ],
    },
    {
      date: '1723142400000',
      slots: [
        '12:00 PM',
        '2:00 PM',
        '5:00 PM',
        '6:00 PM',
        '9:00 PM',
        '10:00 PM',
      ],
    },
    {
      date: '1723228800000',
      slots: [
        '11:00 AM',
        '1:00 PM',
        '3:00 PM',
        '4:00 PM',
        '7:00 PM',
        '8:00 PM',
      ],
    },
    {
      date: '1723315200000',
      slots: [
        '12:00 PM',
        '2:00 PM',
        '5:00 PM',
        '6:00 PM',
        '9:00 PM',
        '10:00 PM',
      ],
    },
    {
      date: '1723401600000',
      slots: [
        '11:00 AM',
        '1:00 PM',
        '3:00 PM',
        '4:00 PM',
        '7:00 PM',
        '8:00 PM',
      ],
    },
    {
      date: '1723488000000',
      slots: [
        '12:00 PM',
        '2:00 PM',
        '5:00 PM',
        '6:00 PM',
        '9:00 PM',
        '10:00 PM',
      ],
    },
    {
      date: '1723574400000',
      slots: [
        '11:00 AM',
        '1:00 PM',
        '3:00 PM',
        '4:00 PM',
        '7:00 PM',
        '8:00 PM',
      ],
    },
    {
      date: '1723660800000',
      slots: [
        '12:00 PM',
        '2:00 PM',
        '5:00 PM',
        '6:00 PM',
        '9:00 PM',
        '10:00 PM',
      ],
    },
    {
      date: '1723747200000',
      slots: [
        '11:00 AM',
        '1:00 PM',
        '3:00 PM',
        '4:00 PM',
        '7:00 PM',
        '8:00 PM',
      ],
    },
    {
      date: '1723833600000',
      slots: [
        '12:00 PM',
        '2:00 PM',
        '5:00 PM',
        '6:00 PM',
        '9:00 PM',
        '10:00 PM',
      ],
    },
    {
      date: '1723920000000',
      slots: [
        '11:00 AM',
        '1:00 PM',
        '3:00 PM',
        '4:00 PM',
        '7:00 PM',
        '8:00 PM',
      ],
    },
  ];

  const bookedSlots = [
    {
      date: '1722710400000',
      slots: ['9:00 AM', '10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM'],
    },
    {
      date: '1722796800000',
      slots: [
        '8:00 AM',
        '11:00 AM',
        '1:00 PM',
        '3:00 PM',
        '5:00 PM',
        '7:00 PM',
      ],
    },
    {
      date: '1722883200000',
      slots: [
        '9:00 AM',
        '10:00 AM',
        '12:00 PM',
        '2:00 PM',
        '4:00 PM',
        '6:00 PM',
      ],
    },
    {
      date: '1722969600000',
      slots: [
        '8:00 AM',
        '11:00 AM',
        '1:00 PM',
        '3:00 PM',
        '5:00 PM',
        '7:00 PM',
      ],
    },
    {
      date: '1723056000000',
      slots: [
        '9:00 AM',
        '10:00 AM',
        '12:00 PM',
        '2:00 PM',
        '4:00 PM',
        '6:00 PM',
      ],
    },
    {
      date: '1723142400000',
      slots: [
        '8:00 AM',
        '11:00 AM',
        '1:00 PM',
        '3:00 PM',
        '5:00 PM',
        '7:00 PM',
      ],
    },
    {
      date: '1723228800000',
      slots: [
        '9:00 AM',
        '10:00 AM',
        '12:00 PM',
        '2:00 PM',
        '4:00 PM',
        '6:00 PM',
      ],
    },
    {
      date: '1723315200000',
      slots: [
        '8:00 AM',
        '11:00 AM',
        '1:00 PM',
        '3:00 PM',
        '5:00 PM',
        '7:00 PM',
      ],
    },
    {
      date: '1723401600000',
      slots: [
        '9:00 AM',
        '10:00 AM',
        '12:00 PM',
        '2:00 PM',
        '4:00 PM',
        '6:00 PM',
      ],
    },
    {
      date: '1723488000000',
      slots: [
        '8:00 AM',
        '11:00 AM',
        '1:00 PM',
        '3:00 PM',
        '5:00 PM',
        '7:00 PM',
      ],
    },
    {
      date: '1723574400000',
      slots: [
        '9:00 AM',
        '10:00 AM',
        '12:00 PM',
        '2:00 PM',
        '4:00 PM',
        '6:00 PM',
      ],
    },
    {
      date: '1723660800000',
      slots: [
        '8:00 AM',
        '11:00 AM',
        '1:00 PM',
        '3:00 PM',
        '5:00 PM',
        '7:00 PM',
      ],
    },
    {
      date: '1723747200000',
      slots: [
        '9:00 AM',
        '10:00 AM',
        '12:00 PM',
        '2:00 PM',
        '4:00 PM',
        '6:00 PM',
      ],
    },
    {
      date: '1723833600000',
      slots: [
        '8:00 AM',
        '11:00 AM',
        '1:00 PM',
        '3:00 PM',
        '5:00 PM',
        '7:00 PM',
      ],
    },
    {
      date: '1723920000000',
      slots: [
        '9:00 AM',
        '10:00 AM',
        '12:00 PM',
        '2:00 PM',
        '4:00 PM',
        '6:00 PM',
      ],
    },
  ];

  const bookingData = {
    slots: slots,
    availableSlots: availableSlots,
    bookedSlots: bookedSlots,
  };

  return (
    <View style={{ paddingTop: Platform.OS === 'android' ? 40 : 0 }}>
      <RNBooking bookingData={bookingData} />
    </View>
  );
}
