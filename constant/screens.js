// screens.js
import AuthScreen from "../screens/auth/Auth";
import ForgotPasswordScreen from "../screens/auth/ForgotPassword";
import LoginScreen from "../screens/auth/Login";
import PatientInfo from "../screens/auth/PatientInfo";
import RoleSelector from "../screens/auth/RoleSelector";
import SignUpScreen from "../screens/auth/SignUp";
import VerifyScreen from "../screens/auth/Verify";
import VerifyIdentity from "../screens/auth/VerifyIdentity";
import DoctorChatScreen from "../screens/doctor/Chat";
import HomeScreen from "../screens/doctor/Home";
import PatientProfile from "../screens/doctor/PatientProfile";
import DoctorScheduleScreen from "../screens/doctor/Schedule";
import PatientHome from "../screens/patient/PatientHome";
import PatientOwnProfile from "../screens/patient/PatientOwnProfile";
import PatientSchedule from "../screens/patient/PatientSchedule";
import PatientChat from "../screens/patient/PatientChat";
import SearchDoctor from "../screens/patient/SearchDoctor";
import { CustomHeader } from "../components/Header";
import DoctorProfile from "../screens/patient/DoctorProfile";
import DoctorReview from "../screens/patient/DoctorReview";
import HealthConcern from "../screens/patient/HealthConcern";
import DoctorOwnProfile from "../screens/doctor/DoctorOwnProfile";
import TimeSlotSelector from "../screens/patient/TimeSlotSelector";
import RateDoctor from "../screens/patient/RateDoctor";
import ConsultationNotes from "../screens/doctor/ConsultationNotes";
import NotificationPatient from "../screens/patient/NotificationPatient";

// Tab screen configurations
export const doctorTabs = [
  { name: "Home", component: HomeScreen, icon: "home" },
  { name: "Schedule", component: DoctorScheduleScreen, icon: "calendar" },
  { name: "Chat", component: DoctorChatScreen, icon: "chatbox" },
  { name: "Profile", component: DoctorOwnProfile, icon: "person" },
];

export const patientTabs = [
  { name: "Home", component: PatientHome, icon: "home" },
  { name: "Schedule", component: PatientSchedule, icon: "calendar" },
  { name: "Chat", component: PatientChat, icon: "chatbox" },
  { name: "Profile", component: PatientOwnProfile, icon: "person" },
];

// Stack screen configurations
export const stackScreens = [
  {
    name: "Auth",
    component: AuthScreen,
    options: { headerShown: false },
  },
  {
    name: "SignUp",
    component: SignUpScreen,
    options: ({ navigation }) => ({
      header: () => (
        <CustomHeader
          title="Sign Up"
          navigation={navigation}
          backgroundColor="#E6F2FF"
        />
      ),
    }),
  },
  {
    name: "Login",
    component: LoginScreen,
    options: ({ navigation }) => ({
      header: () => (
        <CustomHeader
          title="Log In"
          navigation={navigation}
          backgroundColor="#E6F2FF"
        />
      ),
    }),
  },
  {
    name: "Verify",
    component: VerifyScreen,
    options: ({ navigation }) => ({
      header: () => (
        <CustomHeader
          title="Verification"
          navigation={navigation}
          backgroundColor="#E6F2FF"
        />
      ),
    }),
  },
  {
    name: "RoleSelector",
    component: RoleSelector,
    options: { headerShown: false },
  },
  {
    name: "PatientInfo",
    component: PatientInfo,
    options: ({ navigation }) => ({
      header: () => (
        <CustomHeader
          title="Detail Information"
          navigation={navigation}
          backgroundColor="#E6F2FF"
        />
      ),
    }),
  },
  {
    name: "ForgotPassword",
    component: ForgotPasswordScreen,
    options: ({ navigation }) => ({
      header: () => (
        <CustomHeader
          title="Verification"
          navigation={navigation}
          backgroundColor="#E6F2FF"
        />
      ),
    }),
  },
  {
    name: "PatientProfile",
    component: PatientProfile,
    options: ({ navigation }) => ({
      header: () => (
        <CustomHeader
          title="Patient Profile"
          navigation={navigation}
          backgroundColor="#E6F2FF"
        />
      ),
    }),
  },
  {
    name: "VerifyIdentity",
    component: VerifyIdentity,
    options: ({ navigation }) => ({
      header: () => (
        <CustomHeader
          title="Verify Identity"
          navigation={navigation}
          backgroundColor="#E6F2FF"
        />
      ),
    }),
  },
  {
    name: "SearchDoctor",
    component: SearchDoctor,
    options: ({ navigation }) => ({
      headerShown: false,
    }),
  },
  {
    name: "DoctorProfile",
    component: DoctorProfile,
    options: ({ navigation }) => ({
      header: () => (
        <CustomHeader
          title="Doctor Profile"
          navigation={navigation}
          backgroundColor="#E6F2FF"
        />
      ),
    }),
  },
  {
    name: "DoctorReview",
    component: DoctorReview,
    options: ({ navigation }) => ({
      header: () => (
        <CustomHeader
          title="Reviews"
          navigation={navigation}
          backgroundColor="#E6F2FF"
        />
      ),
    }),
  },
  {
    name: "HealthConcern",
    component: HealthConcern,
    options: ({ navigation }) => ({
      header: () => (
        <CustomHeader
          title="Your Health Concern"
          navigation={navigation}
          backgroundColor="#E6F2FF"
        />
      ),
    }),
  },
  {
    name: "TimeSlotSelector",
    component: TimeSlotSelector,
    options: ({ navigation }) => ({
      header: () => (
        <CustomHeader
          title="Available Time Slots"
          navigation={navigation}
          backgroundColor="#E6F2FF"
        />
      ),
    }),
  },
  {
    name: "RateDoctor",
    component: RateDoctor,
    options: ({ navigation }) => ({
      header: () => (
        <CustomHeader
          title="Share Your Feedback"
          navigation={navigation}
          backgroundColor="#E6F2FF"
        />
      ),
    }),
  },
  {
    name: "ConsultationNotes",
    component: ConsultationNotes,
    options: ({ navigation }) => ({
      header: () => (
        <CustomHeader
          title="Post Consultation Notes"
          navigation={navigation}
          backgroundColor="#E6F2FF"
        />
      ),
    }),
  },
  {
    name: "NotificationPatient",
    component: NotificationPatient,
    options: ({ navigation }) => ({
      headerShown: false,
      header: () => (
        <CustomHeader
          title="Notifications"
          navigation={navigation}
          backgroundColor="#E6F2FF"
        />
      ),
    }),
  },
];
