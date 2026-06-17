import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  FaChartPie,
  FaUserInjured,
  FaCalendarCheck,
  FaUsers,
  FaEnvelopeOpenText,
  FaArrowLeft,
  FaHospital
} from 'react-icons/fa';

export default function Sidebar({ isOpen, toggleSidebar }) {
  const adminLinks = [
    { name: 'Dashboard', path: '/admin', icon: FaChartPie, end: true },
    { name: 'OP Patients', path: '/admin/patients', icon: FaUserInjured, end: false },
    { name: 'Appointments', path: '/admin/appointments', icon: FaCalendarCheck, end: false },
    { name: 'Staff Members', path: '/admin/staff', icon: FaUsers, end: false },
    { name: 'Contact Messages', path: '/admin/contacts', icon: FaEnvelopeOpenText, end: false }
  ];

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 flex flex-col w-64 bg-slate-900 border-r border-slate-800 text-slate-400 transition-transform duration-300 ease-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header Branding */}
        <div className="flex items-center space-x-2 px-6 py-5 border-b border-slate-800">
          <img src="/logo.png" alt="Meeran Hospital Logo" className="h-9 w-9 object-contain rounded-lg bg-white p-0.5 border border-slate-800" />
          <div>
            <span className="font-display font-bold text-base text-white tracking-tight leading-none block">
              Meeran Hospital
            </span>
            <span className="text-[9px] text-secondary tracking-widest uppercase block mt-0.5 font-bold">
              Admin Portal
            </span>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {adminLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              end={link.end}
              onClick={() => {
                if (window.innerWidth < 1024) toggleSidebar();
              }}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all-300 ${
                  isActive
                    ? 'bg-primary text-white font-semibold shadow-lg shadow-primary/20'
                    : 'hover:bg-slate-800/60 hover:text-white'
                }`
              }
            >
              {({ isActive }) => {
                const IconComponent = link.icon;
                return (
                  <>
                    <IconComponent className={`text-lg ${isActive ? 'text-white' : 'text-slate-500'}`} />
                    <span>{link.name}</span>
                  </>
                );
              }}
            </NavLink>
          ))}
        </nav>

        {/* Footer actions */}
        <div className="p-4 border-t border-slate-800">
          <Link
            to="/"
            className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-slate-800/80 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold border border-slate-700/50 transition-colors duration-200"
          >
            <FaArrowLeft className="text-[10px]" />
            <span>Back to Public Website</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
