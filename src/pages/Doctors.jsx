import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserMd, FaCalendarCheck, FaClock, FaMedal } from 'react-icons/fa';

export default function Doctors() {
  const doctorsList = [
    {
      name: 'Dr. Rajesh Pillai',
      role: 'Chief Medical Officer',
      specialization: 'General Medicine & Diabetology',
      qualifications: 'MBBS, MD (General Medicine)',
      experience: '15+ Years',
      availability: 'Mon - Sat: 09:00 AM - 01:00 PM, 04:00 PM - 08:00 PM',
      initials: 'RP',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      name: 'Dr. Sneha Subramanian',
      role: 'Senior Consultant',
      specialization: 'Gynecology & Obstetrics',
      qualifications: 'MBBS, DGO (Obstetrics & Gynecology)',
      experience: '12+ Years',
      availability: 'Mon - Sat: 10:00 AM - 02:00 PM, 05:00 PM - 08:00 PM',
      initials: 'SS',
      color: 'from-rose-400 to-pink-600'
    },
    {
      name: 'Dr. Antony Joseph',
      role: 'Consulting Pediatrician',
      specialization: 'Pediatrics & Neonatal Care',
      qualifications: 'MBBS, DCH (Pediatrics)',
      experience: '10+ Years',
      availability: 'Mon - Sat: 09:30 AM - 01:30 PM, 04:30 PM - 07:30 PM',
      initials: 'AJ',
      color: 'from-amber-400 to-orange-600'
    },
    {
      name: 'Dr. Vikram Seth',
      role: 'Visiting Surgeon',
      specialization: 'Orthopedics & Joint Replacement',
      qualifications: 'MBBS, MS (Orthopedics)',
      experience: '8+ Years',
      availability: 'Planned Appointments & Emergencies Only',
      initials: 'VS',
      color: 'from-teal-400 to-emerald-600'
    }
  ];

  return (
    <div className="pt-20 space-y-20">
      {/* Header */}
      <section className="bg-slate-950 text-white py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/50 to-secondary/30 mix-blend-multiply"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-3">
          <span className="text-secondary font-bold text-xs uppercase tracking-widest block">Medical Team</span>
          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight">
            Meet Our Doctors
          </h1>
          <p className="text-slate-400 text-sm max-w-xl">
            Our qualified clinical experts bring years of medical experience to Shanthi Nikethan.
          </p>
        </div>
      </section>

      {/* Doctors Profiles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {doctorsList.map((doc, idx) => (
            <div key={idx} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden hover-card-effect flex flex-col sm:flex-row">
              {/* Initials Placeholder Image Box */}
              <div className={`w-full sm:w-48 bg-gradient-to-tr ${doc.color} flex items-center justify-center p-8 text-white flex-shrink-0 min-h-[12rem] sm:min-h-full`}>
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto shadow-inner">
                    <span className="font-display font-bold text-2xl tracking-wide">{doc.initials}</span>
                  </div>
                  <span className="text-[10px] font-bold tracking-widest uppercase bg-black/15 px-2 py-0.5 rounded-full block">
                    {doc.experience} Exp
                  </span>
                </div>
              </div>

              {/* Doctor Details */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div>
                    <span className="text-secondary font-semibold text-xs uppercase tracking-wider block">
                      {doc.role}
                    </span>
                    <h3 className="font-display font-bold text-xl text-slate-800">
                      {doc.name}
                    </h3>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-500">
                    <p className="flex items-center space-x-2">
                      <FaMedal className="text-slate-400" />
                      <span className="font-medium text-slate-700">{doc.qualifications}</span>
                    </p>
                    <p className="flex items-center space-x-2">
                      <FaUserMd className="text-slate-400" />
                      <span className="font-medium text-slate-700">{doc.specialization}</span>
                    </p>
                    <p className="flex items-start space-x-2 pt-1">
                      <FaClock className="text-slate-400 mt-0.5 flex-shrink-0" />
                      <span className="leading-relaxed font-semibold text-primary">{doc.availability}</span>
                    </p>
                  </div>
                </div>

                <div>
                  <Link
                    to="/book"
                    className="flex items-center justify-center space-x-2 bg-slate-100 hover:bg-primary hover:text-white text-slate-700 px-4 py-2.5 rounded-xl text-xs font-bold transition-all-300"
                  >
                    <FaCalendarCheck />
                    <span>Request Appointment</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
