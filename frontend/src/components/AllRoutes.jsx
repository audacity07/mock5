import { Routes, Route } from "react-router-dom";
import Contact from "../pages/Contact";
import Appointment from "../pages/Appointment";

export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Contact />} />
      <Route path="/appointment" element={<Appointment />} />
    </Routes>
  );
}
