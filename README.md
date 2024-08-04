

# react-native-schedule-slot

This package is designed to manage daily booking slots for each month with easy-to-use props and components. It doesn't require any third-party libraries or native configuration. Additionally, it displays booked slots on the calendar grid in different colors and offers fully customizable UI options.

## Installation

```sh
npm install react-native-schedule-slot
```
## Features ✨

- No Native code required
- Easy to use
- Dynamic colors for booked slot | available slot | not available slot
- example and screenshot added for Android | iOS | web 
- Auto scroll to current date (Customizable)
- Footer information based on colors props
- Supports both react-native-cli and expo.


## Usage


### Importing the `RNBooking` component

```js
import RNBooking from 'react-native-schedule-slot'
```

```js
const bookingData = {slots: [
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
  ],
  availableSlots: [
    {
      date: '1722710400000',
      slots: ['11:00 AM', '1:00 PM', '4:00 PM', '7:00 PM', '9:00 PM'],
    }],
    bookedSlots: []
  }

<RNBooking bookingData={bookingData} />
```

## Examples

###  iOS

  <img src="https://github.com/Surinder1922/react-native-schedule-slot/blob/main/example/assets/ios.gif?raw=true">


###  Android

  <img src="https://github.com/Surinder1922/react-native-schedule-slot/blob/main/example/assets/android.gif?raw=true">


###  Web

  <img src="https://github.com/Surinder1922/react-native-schedule-slot/blob/main/example/assets/web.png?raw=true">


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
