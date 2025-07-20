import { formatDate, min } from "date-fns";

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


export function getTodayOrTommorow(date) {
  const today = new Date();
  const nextDate = new Date(date);
  console.log(today.getDate() , nextDate.getDate());
  if (today.getDate() === nextDate.getDate() && today.getMonth() === nextDate.getMonth() && today.getFullYear() === nextDate.getFullYear()) {
    return "Today";
  } else if (today.getDate() + 1 === nextDate.getDate() && today.getMonth() === nextDate.getMonth() && today.getFullYear() === nextDate.getFullYear()) { 
    return "Tommorow";
  }else{
    return formatDate(nextDate, "d MMMM");
  }
}


export function getReadyTime(date , time){
  const [hours, modifier] = time.split(" ");
  const [hour, minute] = hours.split(":");
  // time = addMinutesToTimeString(time, 30);
  const today = new Date();
  const currentModifier = today.getHours() >= 12 ? "PM" : "AM";
  const currentHour = today.getHours() >= 12 ? today.getHours() - 12 : today.getHours();
  const currentMinutes = today.getMinutes();
  
  // appointment 6:00PM - current time 5:55 PM  -> true
  if(hour === currentHour && modifier === currentModifier && minute <= currentMinutes ){
    console.log("true");
    
    return true;
  }else{
    return false;
  }
}

