<<<<<<< HEAD
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuthContext } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ResponsiveContainer } from './components/layout/ResponsiveContainer';
=======
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
>>>>>>> 6571257e407549ebbfc7d359a6c37fe2b741ae70
import Home from './pages/Home';
import MentalHealth from './pages/MentalHealth';
import AIDiagnosis from './pages/AIDiagnosis';
import DietNutrition from './pages/DietNutrition';
import Fitness from './pages/Fitness';
import Articles from './pages/Articles';
import Donation from './pages/Donation';
import SOSSupport from './pages/SOSSupport';
import MedicalPortfolio from './pages/MedicalPortfolio';
import SignInModal from './components/Auth/SignInModal';
import SignUpModal from './components/Auth/SignUpModal';
import { useThemeStore } from './store/themeStore';
<<<<<<< HEAD

function App() {
  const [showSignIn, setShowSignIn] = React.useState(false);
  const [showSignUp, setShowSignUp] = React.useState(false);
  const { user } = useAuthContext();
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  React.useEffect(() => {
=======
import { useAuthStore } from './store/authStore';

function App() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
>>>>>>> 6571257e407549ebbfc7d359a6c37fe2b741ae70
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleAuthModal = (type: 'signin' | 'signup') => {
    if (type === 'signin') {
      setShowSignIn(true);
      setShowSignUp(false);
    } else {
      setShowSignUp(true);
      setShowSignIn(false);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark' : ''}`}>
      <Navbar onAuth={handleAuthModal} />
<<<<<<< HEAD
      <main className="flex-grow">
        <ResponsiveContainer>
          <Routes>
            <Route path="/" element={<Home onAuth={handleAuthModal} />} />
            <Route path="/mental-health" element={<MentalHealth />} />
            <Route path="/ai-diagnosis" element={<AIDiagnosis />} />
            <Route path="/diet-nutrition" element={<DietNutrition />} />
            <Route path="/fitness" element={<Fitness />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/donation" element={<Donation />} />
            <Route path="/sos" element={<SOSSupport />} />
            <Route 
              path="/portfolio" 
              element={
                <MedicalPortfolio 
                  userId={user?.uid} 
                  userEmail={user?.email} 
                />
              } 
            />
          </Routes>
        </ResponsiveContainer>
=======
      <main className="flex-grow pt-16"> {/* Added padding-top to account for fixed navbar */}
        <Routes>
          <Route path="/" element={<Home onAuth={handleAuthModal} />} />
          <Route 
            path="/mental-health" 
            element={
              isAuthenticated ? <MentalHealth /> : <Home onAuth={() => handleAuthModal('signin')} />
            } 
          />
          <Route 
            path="/ai-diagnosis" 
            element={
              isAuthenticated ? <AIDiagnosis /> : <Home onAuth={() => handleAuthModal('signin')} />
            } 
          />
          <Route path="/diet-nutrition" element={<DietNutrition />} />
          <Route path="/fitness" element={<Fitness />} />
          <Route path="/articles" element={<Articles />} />
          <Route 
            path="/donation" 
            element={
              isAuthenticated ? <Donation /> : <Home onAuth={() => handleAuthModal('signin')} />
            } 
          />
          <Route path="/sos" element={<SOSSupport />} />
          <Route 
            path="/portfolio" 
            element={
              isAuthenticated ? <MedicalPortfolio /> : <Home onAuth={() => handleAuthModal('signin')} />
            } 
          />
        </Routes>
>>>>>>> 6571257e407549ebbfc7d359a6c37fe2b741ae70
      </main>
      <Footer />

      <SignInModal
        isOpen={showSignIn}
        onClose={() => setShowSignIn(false)}
        onSwitchToSignUp={() => handleAuthModal('signup')}
      />
      <SignUpModal
        isOpen={showSignUp}
        onClose={() => setShowSignUp(false)}
        onSwitchToSignIn={() => handleAuthModal('signin')}
      />
    </div>
  );
}

export default App;