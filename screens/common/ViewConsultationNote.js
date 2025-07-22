import { View, ScrollView } from "react-native";
import ConsultationSummaryCard from "../../components/Card/ConsultationSummaryCard";

export default function ViewConsultationNote() {
  const consultationData = {
    patient: {
      name: "Sarah James",
      details: "28 years old, Female",
      profile: require("../../assets/profile/patient_f.png"),
    },
    date: "July 22, 2025",
    notes: "Patient presents with a persistent cough and mild fever. Lungs are clear upon auscultation. Suspected viral infection.",
    advice: "Rest, stay hydrated, and monitor temperature. Follow up if symptoms worsen or do not improve in 3 days.",
    medications: [
      { name: "Ibuprofen", amount: "200mg", times: "As needed for fever" },
      { name: "Cough Syrup", amount: "10ml", times: "3 times a day" },
    ],
  };
  return (
  <ScrollView className="flex-1 bg-background py-3">
    <ConsultationSummaryCard consultationData={consultationData} />
  </ScrollView>
  )
}
