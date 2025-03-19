import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PlatformContests from "./pages/PlatformContests";
import Particles from "./components/Particles";

function App() {
  return (
    <Router>
      <Navbar  />
      <div style={{
        backgroundColor:"rgb(6,6,6)",
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        zIndex: -1
      }}>
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={500}
          particleSpread={10}
          speed={0.3}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/platform/:platform" element={<PlatformContests />} />
      </Routes>
    </Router>
  );
}

export default App;
