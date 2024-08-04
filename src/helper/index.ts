export const getDayOfWeek = (month: number, day: number, year: number) => {
  const date = new Date(year, month, day); // JavaScript months are 0-based
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return daysOfWeek[date.getDay()];
};

const shortMonthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const getMonthName = (month: number) => {
  return shortMonthNames[month] || 'Invalid month';
};

export const getHoursAndMinutes = (
  time12h: string
): { hours: number; minutes: number } => {
  const [time, modifier] = time12h.split(' ');

  let hours = Number(time?.split(':')[0]);
  const minutes = Number(time?.split(':')[1]);

  if (modifier === 'PM' && hours !== 12) {
    hours += 12;
  }
  if (modifier === 'AM' && hours === 12) {
    hours = 0;
  }

  return {
    hours: hours,
    minutes: minutes,
  };
};

export const convertTo24HourFormat = (time12h: string) => {
  const [time, modifier] = time12h.split(' ');
  //@ts-ignore
  let [hours, minutes] = time?.split(':').map(Number);

  if (modifier?.toLowerCase() === 'pm' && hours !== 12) {
    hours += 12;
  }

  if (modifier?.toLowerCase() === 'am' && hours === 12) {
    hours = 0;
  }

  // Format hours and minutes to ensure they have two digits
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}`;
};
