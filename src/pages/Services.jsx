import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaStethoscope,
  FaBaby,
  FaFemale,
  FaBone,
  FaAmbulance,
  FaHeartbeat,
  FaVial,
  FaPills,
  FaCalendarAlt,
  FaPhoneAlt
} from 'react-icons/fa';

export default function Services() {
  const services = [
    {
      title: 'General Medicine',
      desc: 'Expert diagnosis and therapeutic solutions for common adult medical conditions, chronic illnesses, and preventative health screenings.',
      icon: FaStethoscope,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'Pediatrics',
      desc: 'Dedicated clinical care for infants, toddlers, and children. Covering immunizations, general development tracking, and pediatric illness treatments.',
      icon: FaBaby,
      color: 'bg-amber-50 text-amber-600'
    },
    {
      title: 'Gynecology & Obstetrics',
      desc: 'Comprehensive pregnancy monitoring, sterile delivery units, prenatal classes, adolescent gynecology, and adult wellness consultations.',
      icon: FaFemale,
      color: 'bg-rose-50 text-rose-600'
    },
    {
      title: 'Orthopedics',
      desc: 'Clinical diagnosis for bone fractures, spine issues, chronic joint pain, and orthopedic rehabilitation programs under specialist guidance.',
      icon: FaBone,
      color: 'bg-emerald-50 text-emerald-600'
    },
    {
      title: 'Emergency Care',
      desc: '24/7 immediate trauma care and outpatient support equipped with monitoring systems and senior nurses on standby.',
      icon: FaAmbulance,
      color: 'bg-red-50 text-red-600'
    },
    {
      title: 'Diagnostic Services',
      desc: 'Electrocardiograms (ECG), ultrasound, and modern radiology procedures to assist clinicians in precise diagnoses.',
      icon: FaHeartbeat,
      color: 'bg-indigo-50 text-indigo-600'
    },
    {
      title: 'Clinical Laboratory',
      desc: 'In-house diagnostic testing for hematology, biochemistry, and microbiology, delivering quick and accurate results.',
      icon: FaVial,
      color: 'bg-purple-50 text-purple-600'
    },
    {
      title: '24/7 Pharmacy',
      desc: 'Fully stocked hospital pharmacy dispensing verified pharmaceuticals, baby care items, and emergency critical care medications.',
      icon: FaPills,
      color: 'bg-teal-50 text-teal-600'
    }
  ];

  return (
    <div className="pt-20 space-y-20">
      {/* Header */}
      <section className="bg-slate-950 text-white py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/50 to-secondary/30 mix-blend-multiply"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-3">
          <span className="text-secondary font-bold text-xs uppercase tracking-widest block">What We Offer</span>
          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight">
            Our Medical Services
          </h1>
          <p className="text-slate-400 text-sm max-w-xl">
            Providing comprehensive primary and secondary healthcare under one roof, backed by modern facilities.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover-card-effect flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${s.color}`}>
                    <Icon />
                  </div>
                  <h3 className="font-display font-bold text-lg text-slate-800">
                    {s.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {s.desc}
                  </p>
                </div>
                <div>
                  <Link
                    to="/book"
                    className="text-xs text-primary font-bold hover:text-primary-dark inline-flex items-center space-x-1"
                  >
                    <span>Schedule visit</span>
                    <span>&rarr;</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Booking Prompt */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 text-center space-y-6">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">Need Immediate Medical Assistance?</h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">
            For emergencies, please visit our nursing home immediately. Our general practitioner doctors are available on call 24 hours a day, 7 days a week.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              to="/book"
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-secondary hover:bg-secondary-dark text-white font-bold px-6 py-3.5 rounded-xl text-sm transition-all duration-200 shadow-md shadow-secondary/15"
            >
              <FaCalendarAlt />
              <span>Book Appointment Online</span>
            </Link>
            <a
              href="tel:+919042532040"
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white font-bold border border-white/20 px-6 py-3.5 rounded-xl text-sm transition-all duration-200"
            >
              <FaPhoneAlt />
              <span>Call: +91 90425 32040</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
