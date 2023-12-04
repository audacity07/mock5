import { HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      style={{
        textAlign: "center",
        fontSize: "20px",
        display: "flex",
        gap: "10px",
        justifyContent: "center",
        margin: "10px auto",
        border: "1px solid gray",
        borderRadius: "10px",
        padding: "10px",
        widows: "30%",
      }}
    >
      <Link to="/">Contact</Link>
      <Link to="/appointment">Appointment</Link>
    </nav>
  );
}
