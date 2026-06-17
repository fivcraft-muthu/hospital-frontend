import React from 'react';
import { Link } from 'react-router-dom';
import { FaHospital, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaHeart } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1.4fr_1.4fr] gap-10">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <img src="/logo.png" alt="Meeran Hospital Logo" className="h-9 w-auto object-contain rounded-lg bg-white p-0.5" />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Providing compassionate and professional healthcare services to Tenkasi and surrounding regions since inception. Your well-being is our ultimate commitment.
            </p>
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
              <span className="text-xs text-secondary font-bold uppercase tracking-wider block mb-1">Emergency Service</span>
              <a href="tel:+919042532040" className="flex items-center space-x-2 text-white hover:text-secondary font-bold text-lg">
                <FaPhoneAlt className="text-secondary" />
                <span>+91 90425 32040</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:mx-auto">
            <h3 className="text-white font-semibold text-lg mb-6 border-l-4 border-secondary pl-3">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '/about' },
                { name: 'Services', path: '/services' },
                { name: 'Doctors', path: '/doctors' },
                { name: 'Book Appointment', path: '/book' },
                { name: 'Contact Us', path: '/contact' }
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="hover:text-white transition-colors duration-200 text-slate-400 text-sm flex items-center space-x-1.5"
                  >
                    <span>&rsaquo;</span>
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Working Hours */}
          <div className="lg:mx-auto w-full max-w-[320px]">
            <h3 className="text-white font-semibold text-lg mb-6 border-l-4 border-secondary pl-3">Working Hours</h3>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li className="flex justify-between border-b border-slate-800 pb-2 gap-4">
                <span className="whitespace-nowrap">OPD Consultations:</span>
                <span className="text-white font-medium whitespace-nowrap">09:00 AM - 08:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-slate-800 pb-2 gap-4">
                <span className="whitespace-nowrap">Laboratory & Pharmacy:</span>
                <span className="text-secondary font-medium whitespace-nowrap">24 / 7 Available</span>
              </li>
              <li className="flex justify-between border-b border-slate-800 pb-2 gap-4">
                <span className="whitespace-nowrap">Emergency Ward:</span>
                <span className="text-red-400 font-medium whitespace-nowrap">24 Hours Open</span>
              </li>
              <li className="flex justify-between gap-4">
                <span className="whitespace-nowrap">Visiting Hours (IP):</span>
                <span className="text-white font-medium whitespace-nowrap">04:00 PM - 07:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:ml-auto w-full max-w-[320px]">
            <h3 className="text-white font-semibold text-lg mb-6 border-l-4 border-secondary pl-3">Contact Details</h3>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-secondary mt-1 flex-shrink-0" />
                <span className="leading-relaxed">
                  Courtallam Main Road,<br />
                  Tenkasi 627 811.
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhoneAlt className="text-secondary flex-shrink-0" />
                <a href="tel:+919042532040" className="hover:text-white transition-colors duration-200">
                  +91 90425 32040
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-secondary flex-shrink-0" />
                <a href="mailto:meeranhospital@gmail.com" className="hover:text-white transition-colors duration-200">
                  meeranhospital@gmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-slate-800 text-center flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>&copy; {currentYear} Meeran Hospital. All rights reserved.</p>
          <p className="flex items-center space-x-1 mt-2 sm:mt-0">
            <span>Designed with</span>
            <FaHeart className="text-secondary" />
            <span>for Demonstration Purposes</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
