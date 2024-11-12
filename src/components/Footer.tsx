import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#219B9D] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Global CareNest</h3>
            <p className="text-sm">
              Empowering health and care for all, with a special focus on deaf and non-verbal individuals.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm hover:text-[#B9E5E8] transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-sm hover:text-[#B9E5E8] transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="text-sm hover:text-[#B9E5E8] transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm hover:text-[#B9E5E8] transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link to="/mental-health" className="text-sm hover:text-[#B9E5E8] transition-colors">Mental Health</Link></li>
              <li><Link to="/ai-diagnosis" className="text-sm hover:text-[#B9E5E8] transition-colors">AI Diagnosis</Link></li>
              <li><Link to="/diet-nutrition" className="text-sm hover:text-[#B9E5E8] transition-colors">Diet & Nutrition</Link></li>
              <li><Link to="/fitness" className="text-sm hover:text-[#B9E5E8] transition-colors">Fitness</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-[#B9E5E8] transition-colors" aria-label="Facebook">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-[#B9E5E8] transition-colors" aria-label="Twitter">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-[#B9E5E8] transition-colors" aria-label="Instagram">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-[#B9E5E8] transition-colors" aria-label="YouTube">
                <Youtube className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-[#B9E5E8] transition-colors" aria-label="Email">
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-[#B9E5E8]">
          <p className="text-center text-sm">
            © {new Date().getFullYear()} Global CareNest. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;