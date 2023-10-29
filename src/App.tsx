import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Words from "./pages/Words";

export default function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<div>About</div>} />
      <Route path="/words" element={<Words />} />
      <Route path="*" element={<div>Not found</div>} />
    </Routes>
  );
}
