import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PlatformContests from "./pages/PlatformContests";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/platform/:platform" element={<PlatformContests />} />
            </Routes>
        </Router>
    );
}

export default App;
