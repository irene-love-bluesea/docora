// disable - doctor manually set up time slot
// available - patient can select
// selected - patient has selected

// morning  9 -12 PM
// export const morningTimeSlots = [
//   {
//     id: "m1",
//     value: "09:00 AM",
//     selected: false,
//     disabled: false,
//     available: false,
//   },
//   {
//     id: "m2",
//     value: "09:15 AM",
//     selected: false,
//     disabled: false,
//     available: false,
//   },
//   {
//     id: "m3",
//     value: "09:30 AM",
//     selected: false,
//     disabled: false,
//     available: true,
//   },
//   {
//     id: "m4",
//     value: "09:45 AM",
//     selected: false,
//     disabled: false,
//     available: true,
//   },
//   {
//     id: "m5",
//     value: "10:00 AM",
//     selected: false,
//     disabled: false,
//     available: true,
//   },
//   {
//     id: "m6",
//     value: "10:15 AM",
//     selected: false,
//     disabled: false,
//     available: true,
//   },
//   {
//     id: "m7",
//     value: "10:30 AM",
//     selected: false,
//     disabled: false,
//     available: true,
//   },
//   {
//     id: "m8",
//     value: "10:45 AM",
//     selected: false,
//     disabled: false,
//     available: true,
//   },
//   {
//     id: "m9",
//     value: "11:00 AM",
//     selected: false,
//     disabled: false,
//     available: true,
//   },
//   {
//     id: "m10",
//     value: "11:15 AM",
//     selected: false,
//     disabled: false,
//     available: true,
//   },
//   {
//     id: "m11",
//     value: "11:30 AM",
//     selected: false,
//     disabled: false,
//     available: true,
//   },
//   {
//     id: "m12",
//     value: "11:45 AM",
//     selected: false,
//     disabled: false,
//     available: true,
//   },
// ];
export const morningTimeSlots = [];
export const afternoonTimeSlots = [];
export const eveningTimeSlots = [];
// afternoon 1-4PM
// export const afternoonTimeSlots = [
//   {
//     id: "a1",
//     value: "01:00 PM",
//     selected: false,
//     disabled: false,
//     available: true,
//   },
//   {
//     id: "a2",
//     value: "01:15 PM",
//     selected: false,
//     disabled: false,
//     available: true,
//   },
//   {
//     id: "a3",
//     value: "01:30 PM",
//     selected: false,
//     disabled: false,
//     available: true,
//   },
//   {
//     id: "a4",
//     value: "01:45 PM",
//     selected: false,
//     disabled: false,
//     available: true,
//   },
//   {
//     id: "a5",
//     value: "02:00 PM",
//     selected: false,
//     disabled: false,
//     available: true,
//   },
//   {
//     id: "a6",
//     value: "02:15 PM",
//     selected: false,
//     disabled: false,
//     available: true,
//   },
//   {
//     id: "a7",
//     value: "02:30 PM",
//     selected: false,
//     disabled: false,
//     available: true,
//   },
//   {
//     id: "a8",
//     value: "02:45 PM",
//     selected: false,
//     disabled: false,
//     available: true,
//   },
//   {
//     id: "a9",
//     value: "03:00 PM",
//     selected: false,
//     disabled: false,
//     available: true,
//   },
//   {
//     id: "a10",
//     value: "03:15 PM",
//     selected: false,
//     disabled: false,
//     available: true,
//   },
//   {
//     id: "a11",
//     value: "03:30 PM",
//     selected: false,
//     disabled: false,
//     available: true,
//   },
//   {
//     id: "a12",
//     value: "03:45 PM",
//     selected: false,
//     disabled: false,
//     available: true,
//   },
// ];

//evening 5-8pm
// export const eveningTimeSlots = [
//   {
//     id: "e1",
//     value: "05:00 PM",
//     selected: false,
//     disabled: false,
//     available: true,
//   },
//   {
//     id: "e2",
//     value: "05:15 PM",
//     selected: false,
//     disabled: false,
//     available: true,
//   },
//   {
//     id: "e3",
//     value: "05:30 PM",
//     selected: false,
//     disabled: false,
//     available: true,
//   },
//   {
//     id: "e4",
//     value: "05:45 PM",
//     selected: false,
//     disabled: false,
//     available: true,
//   },
//   {
//     id: "e5",
//     value: "06:00 PM",
//     selected: false,
//     disabled: false,
//     available: true,
//   },
//   {
//     id: "e6",
//     value: "06:15 PM",
//     selected: false,
//     disabled: false,
//     available: true,
//   },
//   {
//     id: "e7",
//     value: "06:30 PM",
//     selected: false,
//     disabled: false,
//     available: true,
//   },
//   {
//     id: "e8",
//     value: "06:45 PM",
//     selected: false,
//     disabled: false,
//     available: true,
//   },
//   {
//     id: "e9",
//     value: "07:00 PM",
//     selected: false,
//     disabled: false,
//     available: true,
//   },
//   {
//     id: "e10",
//     value: "07:15 PM",
//     selected: false,
//     disabled: false,
//     available: true,
//   },
//   {
//     id: "e11",
//     value: "07:30 PM",
//     selected: false,
//     disabled: false,
//     available: true,
//   },
//   {
//     id: "e12",
//     value: "07:45 PM",
//     selected: false,
//     disabled: false,
//     available: true,
//   },
// ];

export const allTimeSlots = {
  Morning: morningTimeSlots,
  Afternoon: afternoonTimeSlots,
  Evening: eveningTimeSlots,
};

export const consultationChannels = [
  {
    id: 1,
    title: "Audio Call ",
    iconLibrary: "Ionicons",
    iconName: "call-outline",
    description: "Audio Call Consultation",
    iconColor: "#023E8A",
    cost: "Free",
    disabled: false,
  },
  {
    id: 2,
    title: "Video Call ",
    iconLibrary: "Ionicons",
    iconName: "videocam-outline",
    description: "Video Call Consultation",
    iconColor: "#023E8A",
    cost: "Free",
    disabled: false,
  },
  {
    id: 3,
    title: "Chat ",
    iconLibrary: "MaterialCommunityIcons",
    iconName: "message-text-outline",
    description: "Chat consultation",
    iconColor: "#023E8A",
    cost: "Free",
    disabled: false,
  },
];
