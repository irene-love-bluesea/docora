import { addMinutes, formatDate, format, isWithinInterval, min, parse, subMinutes, isAfter } from "date-fns";


function formatDateTime(date) {
  // Convert input to Date object if it's not already
  const dateObj = new Date(date);
  
  // Check if date is valid
  if (isNaN(dateObj.getTime())) {
    throw new Error('Invalid date provided');
  }
  
  // Options for formatting the date part
  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  
  // Options for formatting the time part
  const timeOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };
  
  // Format date and time parts
  const datePart = dateObj.toLocaleDateString('en-US', dateOptions);
  const timePart = dateObj.toLocaleTimeString('en-US', timeOptions);
  
  // Combine with the desired format
  return `${datePart} - ${timePart}`;
}

function formatCurrentDateTime() {
  return formatDateTime(new Date());
}

// Export functions for Expo/React Native
export { formatDateTime, formatCurrentDateTime };



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
  if (today.getDate() === nextDate.getDate() && today.getMonth() === nextDate.getMonth() && today.getFullYear() === nextDate.getFullYear()) {
    return "Today";
  } else if (today.getDate() + 1 === nextDate.getDate() && today.getMonth() === nextDate.getMonth() && today.getFullYear() === nextDate.getFullYear()) { 
    return "Tommorow";
  }else{
    return formatDate(nextDate, "d MMMM");
  }
}


 // appointment 6:00 PM - current time 5:55 PM  -> true
export function getReadyTime(dateString, timeString , minutesToSubtract) {
  const dateTimeString = `${dateString} ${timeString}`;
  const formatString = 'yyyy-MM-dd h:mm a';

  const appointmentDate = parse(dateTimeString, formatString, new Date());

  //start session before 5 minutes of appointment date
  const readySession = subMinutes(appointmentDate, minutesToSubtract);
  //end session after 15 minutes of appointment date
  const endSession = addMinutes(appointmentDate, 15);
  
  const now = new Date();
  const isReadyTime = isWithinInterval(now, {
    start: readySession,
    end: endSession,
  });

  
  return isReadyTime;
}


export function isSessionEnd(dateString, timeString) {
  const now = new Date();
  const dateTimeString = `${dateString} ${timeString}`;
  const formatString = 'yyyy-MM-dd h:mm a';

  // Parse the appointment start time
  const appointmentDate = parse(
    dateTimeString,
    formatString,
    new Date()
  );
  
  const sessionEnd = addMinutes(appointmentDate, 15);
  
  return isAfter(now, sessionEnd);
}

export function timeSortingAscending(appointments){
  const now = new Date();
  const sortedAppointments = appointments.sort((a, b) => {
    const dateA = parse(`${a.date} ${a.time}`, 'yyyy-MM-dd h:mm a', now);
    const dateB = parse(`${b.date} ${b.time}`, 'yyyy-MM-dd h:mm a', now);
    return dateA - dateB;
  })
  return sortedAppointments;
}