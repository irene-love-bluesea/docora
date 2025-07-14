import { formatDate } from "date-fns";

export const getUpcomingDays = () => {
  const today = new Date();
  const nextSevenDays = [];

  for (let i = 0; i < 7; i++) {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + i);
    // console.log(formatDate(nextDate, "d MMMM"));

    const dayArr = {
      id: i,
      value: formatDate(nextDate, "E"),
      dateFormat: formatDate(nextDate, "d MMMM yyyy"),
      selected: false,
      disabled: false,
      available: true,
    };
    nextSevenDays.push(dayArr);
  }
  return nextSevenDays;
};

export function addMinutesToTimeString(timeString, minutesToAdd) {
  // 1. Parse the string
  const [time, modifier] = timeString.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (modifier === "PM" && hours < 12) {
    hours += 12;
  }
  if (modifier === "AM" && hours === 12) {
    hours = 0;
  }

  // 2. Create a date object and add minutes
  const today = new Date();
  const dateObject = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    hours,
    minutes
  );
  dateObject.setMinutes(dateObject.getMinutes() + minutesToAdd);

  // 3. Format it back into a string
  let newHours = dateObject.getHours();
  const newMinutes = dateObject.getMinutes();
  const newModifier = newHours >= 12 ? "PM" : "AM";

  if (newHours > 12) {
    newHours -= 12;
  }
  if (newHours === 0) {
    newHours = 12;
  }

  // Pad minutes with a leading zero if needed
  const paddedMinutes = String(newMinutes).padStart(2, "0");

  return `${newHours}:${paddedMinutes} ${newModifier}`;
}
