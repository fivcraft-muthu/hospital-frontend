import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import { FaBars } from 'react-icons/fa';

// Public pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Doctors from './pages/Doctors';
import AppointmentBooking from './pages/AppointmentBooking';
import ContactUs from './pages/ContactUs';

// Admin pages
import Dashboard from './pages/Admin/Dashboard';
import OPManagement from './pages/Admin/OPManagement';
import AppointmentManagement from './pages/Admin/AppointmentManagement';
import StaffManagement from './pages/Admin/StaffManagement';
import ContactManagement from './pages/Admin/ContactManagement';

// Public Website Layout
function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

// Admin Panel Layout
function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Sidebar Navigation */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Panel Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden lg:pl-64">
        {/* Header Top Bar on Mobile */}
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-100 lg:hidden">
          <div className="flex items-center space-x-3">
            <span className="font-display font-bold text-lg text-primary tracking-tight">Meeran Hospital</span>
            <span className="text-[10px] bg-secondary/15 text-secondary-dark px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
              Admin
            </span>
          </div>
          <button
            onClick={toggleSidebar}
            id="mobile-sidebar-toggle"
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-xl"
            aria-label="Open Sidebar"
          >
            <FaBars className="text-xl" />
          </button>
        </header>

        {/* Dynamic Nested Content */}
        <main className="flex-1 overflow-y-auto px-4 py-8 sm:p-8 lg:p-10">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="doctors" element={<Doctors />} />
          <Route path="book" element={<AppointmentBooking />} />
          <Route path="contact" element={<ContactUs />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="patients" element={<OPManagement />} />
          <Route path="appointments" element={<AppointmentManagement />} />
          <Route path="staff" element={<StaffManagement />} />
          <Route path="contacts" element={<ContactManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
