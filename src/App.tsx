import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import MentalHealth from './pages/MentalHealth';
import AIDiagnosis from './pages/AIDiagnosis';
import DietNutrition from './pages/DietNutrition';
import Fitness from './pages/Fitness';
import Articles from './pages/Articles';
import Donation from './pages/Donation';
import SOSSupport from './pages/SOSSupport';
import MedicalPortfolio from './pages/MedicalPortfolio';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mental-health" element={<MentalHealth />} />
          <Route path="/ai-diagnosis" element={<AIDiagnosis />} />
          <Route path="/diet-nutrition" element={<DietNutrition />} />
          <Route path="/fitness" element={<Fitness />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/donation" element={<Donation />} />
          <Route path="/sos" element={<SOSSupport />} />
          <Route path="/portfolio" element={<MedicalPortfolio />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;