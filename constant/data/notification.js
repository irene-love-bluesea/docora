export const notifications = {
  pagination: {
    currentPage: 1,
    totalPages: 5,
    totalCount: 98,
  },
  notifications: [
    {
      id: "notif_j1k2l3",
      type: "APPOINTMENT_CANCELED",
      title: "Appointment Canceled",
      body: "Your appointment with Dr. Ben Carter for tomorrow at 11:00 AM has been canceled. Please reschedule.",
      isRead: false,
      createdAt: "2025-07-20T14:00:00Z",
      data: {
        appointmentId: "appt_pqr456",
        doctorId: "doc_ben_carter",
      },
    },
    {
      id: "notif_1a2b3c",
      type: "CALL_STARTED",
      title: "It's Time! Join Your Call",
      body: "Dr. Evelyn Reed is ready for you. Tap here to join the video call now.",
      isRead: false,
      createdAt: "2025-07-21T08:30:00Z",
      data: {
        appointmentId: "appt_xyz789",
      },
    },
    {
      id: "notif_4d5e6f",
      type: "APPOINTMENT_REMINDER_1H",
      title: "Appointment in 1 Hour",
      body: "Your session with Dr. Evelyn Reed starts soon at 4:30 PM. Please prepare a quiet space.",
      isRead: false,
      createdAt: "2025-07-21T08:15:00Z",
      data: {
        appointmentId: "appt_xyz789",
      },
    },
    {
      id: "notif_7g8h9i",
      type: "APPOINTMENT_CONFIRMED",
      title: "Appointment Confirmed!",
      body: "You're all set with Dr. Reed for today at 4:30 PM. Your 15-minute session is free.",
      isRead: true,
      createdAt: "2025-07-21T06:45:10Z",
      data: {
        appointmentId: "appt_xyz789",
      },
    },
  ],
};
