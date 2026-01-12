import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuthContext } from './contexts/useAuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ResponsiveContainer } from './components/layout/ResponsiveContainer';
import Home from './pages/Home';
import MentalHealth from './pages/MentalHealth';
import AIDiagnosis from './pages/AIDiagnosis';
import DietNutrition from './pages/DietNutrition';
import Fitness from './pages/Fitness';
import Articles from './pages/Articles';
import Donation from './pages/Donation';
import SOSSupport from './pages/SOSSupport';
import MedicalPortfolio from './pages/MedicalPortfolio';
import VideoConsultation from './pages/VideoConsultation';
import LandingPage from './pages/LandingPage';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';
import SignInModal from './components/Auth/SignInModal';
import SignUpModal from './components/Auth/SignUpModal';
import { useThemeStore } from './store/themeStore';

function App() {
  const [showSignIn, setShowSignIn] = React.useState(false);
  const [showSignUp, setShowSignUp] = React.useState(false);
  const { user, loading } = useAuthContext();
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  React.useEffect(() => {
    if (user) {
      setShowSignIn(false);
      setShowSignUp(false);
    }
  }, [user]);

  React.useEffect(() => {
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

  if (loading) {
    return <div className="min-h-screen bg-gray-900 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-teal-500"></div></div>;
  }

  // Strict Auth Gating: Show Landing Page if not logged in
  if (!user) {
    return (
      <div className={isDarkMode ? 'dark' : ''}>
        <LandingPage onAuth={handleAuthModal} />
        <SignInModal isOpen={showSignIn} onClose={() => setShowSignIn(false)} onSwitchToSignUp={() => handleAuthModal('signup')} />
        <SignUpModal isOpen={showSignUp} onClose={() => setShowSignUp(false)} onSwitchToSignIn={() => handleAuthModal('signin')} />
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark' : ''}`}>
      <Navbar onAuth={handleAuthModal} />
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
            <Route path="/consultation" element={<VideoConsultation />} />
            <Route path="/portfolio" element={<MedicalPortfolio />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ResponsiveContainer>
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