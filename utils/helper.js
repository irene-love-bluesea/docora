import {
  addMinutes,
  formatDate,
  isWithinInterval,
  parse,
  subMinutes,
  isAfter,
  parseISO,
  formatDistanceToNow,
  differenceInSeconds,
  format,
} from "date-fns";
import { morningTimeSlots, afternoonTimeSlots, eveningTimeSlots, allTimeSlots } from "../constant/data/timeSlot";

function formatDateTime(date) {
  // Convert input to Date object if it's not already
  const dateObj = new Date(date);

  // Check if date is valid
  if (isNaN(dateObj.getTime())) {
    throw new Error("Invalid date provided");
  }

  // Options for formatting the date part
  const dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // Options for formatting the time part
  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  // Format date and time parts
  const datePart = dateObj.toLocaleDateString("en-US", dateOptions);
  const timePart = dateObj.toLocaleTimeString("en-US", timeOptions);

  // Combine with the desired format
  return `${datePart} - ${timePart}`;
}

function formatCurrentDateTime() {
  return formatDateTime(new Date());
}

// Export functions for Expo/React Native
export { formatDateTime, formatCurrentDateTime };

export const getUpcomingDays = (apiDateArr) => {
  const nextSevenDays = [];
  apiDateArr?.map((item) => {
    const date = new Date(item);
    const dayArr = {
      id: apiDateArr.indexOf(item),
      value: formatDate(date, "E"),
      dateFormat: formatDate(date, "d MMMM yyyy"),
      selected: false,
      disabled: false,
      available: true,
    }
    nextSevenDays.push(dayArr);
  });
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
  if (
    today.getDate() === nextDate.getDate() &&
    today.getMonth() === nextDate.getMonth() &&
    today.getFullYear() === nextDate.getFullYear()
  ) {
    return "Today";
  } else if (
    today.getDate() + 1 === nextDate.getDate() &&
    today.getMonth() === nextDate.getMonth() &&
    today.getFullYear() === nextDate.getFullYear()
  ) {
    return "Tommorow";
  } else {
    return formatDate(nextDate, "d MMMM");
  }
}

// appointment 6:00 PM - current time 5:55 PM  -> true
export function getReadyTime(dateString, timeString, minutesToSubtract) {
  const dateTimeString = `${dateString} ${timeString}`;
  const formatString = "yyyy-MM-dd h:mm a";

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
  const formatString = "yyyy-MM-dd h:mm a";

  // Parse the appointment start time
  const appointmentDate = parse(dateTimeString, formatString, new Date());

  const sessionEnd = addMinutes(appointmentDate, 15);

  return isAfter(now, sessionEnd);
}

export function timeSortingAscending(appointments) {
  const now = new Date();
  const sortedAppointments = appointments.sort((a, b) => {
    const dateA = parse(`${a.date} ${a.time}`, "yyyy-MM-dd h:mm a", now);
    const dateB = parse(`${b.date} ${b.time}`, "yyyy-MM-dd h:mm a", now);
    return dateA - dateB;
  });
  return sortedAppointments;
}


//notification format funcitons
export function notiSorting(noti) {
  const sortedNoti = noti?.slice().sort((a, b) => {
    const dateA = parseISO(a.createdAt);
    const dateB = parseISO(b.createdAt);
    return dateB - dateA;
  });
  
  return sortedNoti;
}

export function notiDateFormat(dateString) {
  const date = parseISO(dateString);
  const now = new Date();
  if (differenceInSeconds(now, date) < 30) {
    return "Just now";
  }
  return formatDistanceToNow(date, { addSuffix: true });
}

// full time slots
export function convertApiTimeToDisplayTime(apiTimeString) {
  // Parse the time part directly without timezone conversion
  const timePart = apiTimeString.split('T')[1].split('.')[0]; // "13:30:00"
  const [hours, minutes] = timePart.split(':');
  
  // Convert to 12-hour format
  let hour12 = parseInt(hours);
  const ampm = hour12 >= 12 ? 'PM' : 'AM';
  hour12 = hour12 % 12 || 12;
  
  const result = `${hour12}:${minutes} ${ampm}`;
  return result;
}

function getTimePeriod(timeString) {
  const hour = parseInt(timeString.split(':')[0]);
  const isPM = timeString.includes('PM');
  const hour24 = isPM && hour !== 12 ? hour + 12 : (!isPM && hour === 12 ? 0 : hour);
  if (hour24 >= 9 && hour24 < 13) return 'Morning';
  if (hour24 >= 13 && hour24 < 17) return 'Afternoon';
  if (hour24 >= 17 && hour24 <= 20) return 'Evening';
  return null;
}

// Main function to process API time slots
export const getTimeSlots = (fullTimeSlotArr) => {
  if (!fullTimeSlotArr || !Array.isArray(fullTimeSlotArr)) {
    return allTimeSlots; // Return default slots if no API data
  }
  // console.log("fullTimeSlotArr", fullTimeSlotArr);

  // Create a deep copy of the default time slots
  const processedSlots = {
    Morning: [...morningTimeSlots],
    Afternoon: [...afternoonTimeSlots],
    Evening: [...eveningTimeSlots]
  };

  // Create a map of API slots by time for easy lookup
  // const apiSlotMap = {};
  const apiSlotMap = new Map();
  
  fullTimeSlotArr.forEach((apiSlot) => {
    const displayTime = convertApiTimeToDisplayTime(apiSlot?.startTime);
    // console.log("apiSlot", displayTime);
    apiSlotMap.set(displayTime, apiSlot);
    const period = getTimePeriod(displayTime);
    // console.log("processedSlots", period);
    // apiSlot?.startTime = displayTime;

    if (period) {
      // add object to processedSlots
      processedSlots[period].push(apiSlot);
    }
  });

  // Update each time slot based on API data
  // console.log("processedSlots >>", processedSlots);
  return processedSlots;
};

// Alternative function to get slots for a specific date
export const getTimeSlotsForDate = (scheduleData, selectedDate) => {
  if (!scheduleData || !selectedDate) {
    return allTimeSlots;
  }

  // Find the schedule for the selected date
  const dateSchedule = scheduleData.find(schedule => {
      const scheduleDate = new Date(schedule.date);
      const selectedDateObj = parse(selectedDate.dateFormat, 'dd MMMM yyyy', new Date());
    
      const scheduleFormatted = format(scheduleDate, 'yyyy-MM-dd');
      const selectedFormatted = format(selectedDateObj, 'yyyy-MM-dd');
      return scheduleFormatted === selectedFormatted;
  });
  // console.log("dateSchedule", dateSchedule?.fullTimeSlots);

  if (!dateSchedule || !dateSchedule?.fullTimeSlots) {
    return allTimeSlots; // Return default if no schedule found
  }

  return getTimeSlots(dateSchedule?.fullTimeSlots);
};

// Function to get only available slots
export const getAvailableTimeSlots = (fullTimeSlotArr) => {
  const processedSlots = getTimeSlots(fullTimeSlotArr);
  
  Object.keys(processedSlots).forEach(period => {
    processedSlots[period] = processedSlots[period].filter(slot => 
      slot.available && !slot.disabled && !slot.isBooked
    );
  });

  return processedSlots;
};

// Helper function to find slot by API ID
export const findSlotByApiId = (processedSlots, apiId) => {
  for (const period in processedSlots) {
    const slot = processedSlots[period].find(slot => slot.apiId === apiId);
    if (slot) {
      return { slot, period };
    }
  }
  return null;
};