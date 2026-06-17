import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHospital, FaPhoneAlt, FaUserShield, FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Doctors', path: '/doctors' },
    { name: 'Book Appointment', path: '/book' },
    { name: 'Contact Us', path: '/contact' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="transition-all-300 group-hover:scale-110">
              <img src="/logo.png" alt="Meeran Hospital Logo" className="h-11 w-11 object-contain rounded-xl shadow-sm border border-slate-100 bg-white" />
            </div>
            <div>
              <span className="font-display font-bold text-xl sm:text-2xl text-primary tracking-tight block leading-none">
                Meeran
              </span>
              <span className="text-xs text-secondary font-medium tracking-widest uppercase block mt-0.5">
                Hospital
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-medium text-sm transition-colors duration-200 hover:text-secondary ${
                  isActive(link.path) ? 'text-secondary font-semibold border-b-2 border-secondary pb-1' : 'text-slate-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="tel:+919042532040"
              id="nav-call-btn"
              className="flex items-center space-x-2 bg-secondary/10 hover:bg-secondary/20 text-secondary-dark px-4 py-2 rounded-xl text-sm font-semibold transition-all-300"
            >
              <FaPhoneAlt />
              <span>+91 90425 32040</span>
            </a>
            <Link
              to="/admin"
              id="nav-admin-btn"
              className="flex items-center space-x-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-md shadow-primary/20 hover:shadow-lg transition-all-300"
            >
              <FaUserShield />
              <span>Admin Portal</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <a
              href="tel:+919042532040"
              id="mobile-nav-call-btn"
              className="p-2.5 rounded-xl bg-slate-100 text-secondary-dark hover:bg-slate-200"
              title="Call Emergency"
            >
              <FaPhoneAlt />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              id="mobile-menu-toggle"
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700"
              aria-label="Toggle Menu"
            >
              {isOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`lg:hidden fixed top-[72px] right-0 h-[calc(100vh-72px)] w-80 bg-white shadow-2xl transition-transform duration-300 ease-out z-40 p-6 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`py-3 px-4 rounded-xl text-base font-medium transition-all-300 hover:bg-slate-50 hover:text-secondary ${
                  isActive(link.path)
                    ? 'bg-primary/5 text-primary font-bold'
                    : 'text-slate-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <hr className="border-slate-100" />

          <div className="flex flex-col space-y-3">
            <a
              href="tel:+919042532040"
              id="drawer-call-btn"
              className="flex items-center justify-center space-x-2 bg-secondary/15 hover:bg-secondary/25 text-secondary-dark py-3 rounded-xl font-bold transition-all-300"
            >
              <FaPhoneAlt />
              <span>Call: +91 90425 32040</span>
            </a>
            <Link
              to="/admin"
              id="drawer-admin-btn"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center space-x-2 bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-bold shadow-md shadow-primary/10 transition-all-300"
            >
              <FaUserShield />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
