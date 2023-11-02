import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Words from "./pages/Words";
import Centered from "./components/Centered";

export default function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<Centered>About</Centered>} />
      <Route path="/words" element={<Words />} />
      <Route path="*" element={<Centered>Not found</Centered>} />
    </Routes>
  );
}
