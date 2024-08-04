export declare const getDayOfWeek: (
  month: number,
  day: number,
  year: number
) => string;

export declare const getMonthName: (month: number) => string;

export declare const getHoursAndMinutes: (time12h: string) => {
  hours: number;
  minutes: number;
};

export declare const convertTo24HourFormat: (time12h: string) => string;
