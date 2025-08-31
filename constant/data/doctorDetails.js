import Cardiologist from "../../assets/icon/specialty/cardiologist.svg";
import Dentist from "../../assets/icon/specialty/dentist.svg";
import Dermatologist from "../../assets/icon/specialty/dermatologist.svg";
import GeneralPhysician from "../../assets/icon/specialty/general.svg";
import Pediatrician from "../../assets/icon/specialty/pediatrician.svg";
import Psychiatrist from "../../assets/icon/specialty/psychiatrist.svg";


const specialtyIconMap = {
  "General Physician": GeneralPhysician,
  "Dermatologist": Dermatologist,
  "Pediatrician": Pediatrician,
  "Cardiologist": Cardiologist,
  "Psychiatrist": Psychiatrist,
  "Dental": Dentist,
};

//export svg icons for doctor specialities
export { Cardiologist, Dentist, Dermatologist, GeneralPhysician, Pediatrician, Psychiatrist, specialtyIconMap };

export const specialtyRole = [
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
    specialty: "GeneralPhysician",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Dr. Irene",
    image: require("../../assets/profile/profile_f.png"),
    specialty: "Cardiologist",
    rating: 4.5,
  },
  {
    id: 3,
    name: "Dr. Irene",
    image: require("../../assets/profile/profile_f.png"),
    specialty: "Psychiatrist",
    rating: 4.5,
  },
  {
    id: 4,
    name: "Dr. Irene",
    image: require("../../assets/profile/profile_f.png"),
    specialty: "Psychiatrist",
    rating: 4.5,
  },
  {
    id: 5,
    name: "Dr. Irene",
    image: require("../../assets/profile/profile_f.png"),
    specialty: "Psychiatrist",
    rating: 4.5,
  },
  {
    id: 6,
    name: "Dr. Irene",
    image: require("../../assets/profile/profile_f.png"),
    specialty: "Psychiatrist",
    rating: 4.5,
  },
  {
    id: 7,
    name: "Dr. Irene",
    image: require("../../assets/profile/profile_f.png"),
    specialty: "Psychiatrist",
    rating: 4.5,
  },
  {
    id: 8,
    name: "Dr. Irene",
    image: require("../../assets/profile/profile_f.png"),
    specialty: "Psychiatrist",
    rating: 4.5,
  },
];