import GeneralPhysician from "../../assets/icon/speciality/general.svg";
import Dermatologist from "../../assets/icon/speciality/dermatologist.svg";
import Pediatrician from "../../assets/icon/speciality/pediatrician.svg";
import Cardiologist from "../../assets/icon/speciality/cardiologist.svg";
import Psychiatrist from "../../assets/icon/speciality/psychiatrist.svg";
import Dentist from "../../assets/icon/speciality/dentist.svg";


const specialtyIconMap = {
  "General Physician": GeneralPhysician,
  "Dermatology": Dermatologist,
  "Pediatrician": Pediatrician,
  "Cardiology": Cardiologist,
  "Psychiatry": Psychiatrist,
  "Dental": Dentist,
};

//export svg icons for doctor specialities
export {GeneralPhysician, Dermatologist, Pediatrician, Cardiologist, Psychiatrist, Dentist , specialtyIconMap};

export const specialityRole = [
  { label: "General Physician", value: "GeneralPhysician" },
  { label: "Dermatologist", value: "Dermatologist" },
  { label: "Pediatrician", value: "Pediatrician" },
  { label: "Cardiologist", value: "Cardiologist" },
  { label: "Psychiatrist", value: "Psychiatrist" },
  { label: "Dentist", value: "Dentist" },
];


export const experienceYears = [
  { label: "Less than 1 year", value: "0-1" },
  { label: "1-3 years", value: "1-3" },
  { label: "3-5 years", value: "3-5" },
  { label: "5-10 years", value: "5-10" },
  { label: "10-15 years", value: "10-15" },
  { label: "15-20 years", value: "15-20" },
  { label: "More than 20 years", value: "20+" },
];


export const popularDrs = [
  {
    id: 1,
    name: "Dr. John Doe",
    image: require("../../assets/profile/profile_m.png"),
    speciality: "GeneralPhysician",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Dr. Irene",
    image: require("../../assets/profile/profile_f.png"),
    speciality: "Cardiologist",
    rating: 4.5,
  },
  {
    id: 3,
    name: "Dr. Irene",
    image: require("../../assets/profile/profile_f.png"),
    speciality: "Psychiatrist",
    rating: 4.5,
  },
  {
    id: 4,
    name: "Dr. Irene",
    image: require("../../assets/profile/profile_f.png"),
    speciality: "Psychiatrist",
    rating: 4.5,
  },
  {
    id: 5,
    name: "Dr. Irene",
    image: require("../../assets/profile/profile_f.png"),
    speciality: "Psychiatrist",
    rating: 4.5,
  },
  {
    id: 6,
    name: "Dr. Irene",
    image: require("../../assets/profile/profile_f.png"),
    speciality: "Psychiatrist",
    rating: 4.5,
  },
  {
    id: 7,
    name: "Dr. Irene",
    image: require("../../assets/profile/profile_f.png"),
    speciality: "Psychiatrist",
    rating: 4.5,
  },
  {
    id: 8,
    name: "Dr. Irene",
    image: require("../../assets/profile/profile_f.png"),
    speciality: "Psychiatrist",
    rating: 4.5,
  },
];