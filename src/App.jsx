import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageWrapper from './components/PageWrapper';
import Home from './pages/Home';

import UPIPayouts from './pages/UPIPayouts';

import AboutUs from './pages/AboutUs';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
              <Route path="/upiPayouts" element={<PageWrapper><UPIPayouts /></PageWrapper>} />
              <Route path="/aboutus" element={<PageWrapper><AboutUs /></PageWrapper>} />
              <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
