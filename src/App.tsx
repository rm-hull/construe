import { Routes, Route } from "react-router-dom";
import Centered from "./components/Centered";
import Home from "./pages/Home";
import Words from "./pages/Words";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<Centered>About</Centered>} />
      <Route path="/words" element={<Words />} />
      <Route path="*" element={<Centered>Not found</Centered>} />
    </Routes>
  );
}
