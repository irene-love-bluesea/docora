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
