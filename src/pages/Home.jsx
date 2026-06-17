import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaUserMd,
  FaClock,
  FaHeartbeat,
  FaProcedures,
  FaCalendarAlt,
  FaPhoneAlt,
  FaArrowRight,
  FaChevronRight,
  FaQuoteLeft,
  FaShieldAlt
} from 'react-icons/fa';

export default function Home() {
  const whyChooseUs = [
    {
      title: 'Expert Doctors',
      desc: 'Highly experienced and qualified physicians and medical specialists dedicated to your recovery.',
      icon: FaUserMd,
      color: 'text-primary bg-primary/10'
    },
    {
      title: '24/7 Availability',
      desc: 'Our emergency ward, pharmacy, and laboratory are fully operational 24 hours a day, 7 days a week.',
      icon: FaClock,
      color: 'text-secondary-dark bg-secondary/10'
    },
    {
      title: 'Compassionate Care',
      desc: 'We treat every patient like family, prioritizing emotional support alongside scientific treatment.',
      icon: FaHeartbeat,
      color: 'text-rose-600 bg-rose-50'
    },
    {
      title: 'Modern Infrastructure',
      desc: 'Equipped with contemporary diagnostics, sterile labor rooms, and structured intensive care units.',
      icon: FaProcedures,
      color: 'text-indigo-600 bg-indigo-50'
    }
  ];

  const featuredServices = [
    { title: 'General Medicine', desc: 'Comprehensive diagnosis and non-surgical treatment for adults and children.' },
    { title: 'Gynecology & Obstetrics', desc: 'Expert prenatal, delivery, and post-natal care, alongside female health guidance.' },
    { title: 'Pediatric Care', desc: 'Specialized healthcare services, immunizations, and developmental tracking for kids.' }
  ];

  const testimonials = [
    {
      quote: "The doctors and nurses at Meeran Hospital are exceptional. They treated my mother with so much care and patience during her recovery from viral fever. Highly recommended!",
      author: "Sundar Rajan",
      location: "Tenkasi"
    },
    {
      quote: "We had a wonderful experience for our child's delivery. Dr. Sneha was extremely reassuring, and the facilities were clean and affordable. The staff is very responsive.",
      author: "Priya Krishna",
      location: "Tenkasi"
    }
  ];

  return (
    <div className="pt-20 space-y-24">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-primary-dark text-white overflow-hidden py-24 lg:py-32 flex items-center">
        {/* Background Decorative Circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/20 rounded-full blur-3xl -ml-20 -mb-20"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 animate-fade-in-up">
            <div className="inline-flex items-center space-x-2 bg-secondary/20 border border-secondary/30 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-secondary-light">
              <FaShieldAlt className="text-secondary" />
              <span>Certified Healthcare Excellence</span>
            </div>
            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1]">
              Compassionate Care, <br />
              <span className="text-secondary">Exceptional Healing</span>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed">
              Meeran Hospital has been a trusted healthcare partner in Tenkasi. We combine professional expertise with state-of-the-art facilities to bring you the best in medical care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                to="/book"
                id="hero-book-btn"
                className="flex items-center justify-center space-x-2 bg-secondary hover:bg-secondary-dark text-white px-8 py-3.5 rounded-xl font-bold transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-secondary/25"
              >
                <FaCalendarAlt />
                <span>Book Appointment</span>
              </Link>
              <a
                href="tel:+919042532040"
                id="hero-call-btn"
                className="flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-3.5 rounded-xl font-bold transition-all duration-300"
              >
                <FaPhoneAlt />
                <span>Call: +91 90425 32040</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 hidden lg:block animate-pulse-slow">
            <div className="relative">
              {/* Abstract decorative frame */}
              <div className="absolute inset-0 bg-gradient-to-tr from-secondary to-primary rounded-3xl rotate-3 scale-102 opacity-20"></div>
              <div className="relative bg-slate-800/80 border border-slate-700/60 p-8 rounded-3xl shadow-2xl backdrop-blur-md space-y-6">
                <h3 className="font-display font-bold text-xl text-white">Emergency Center</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Our emergency services are available round the clock with dedicated nursing staff and senior doctors on call.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-slate-300">
                    <div className="bg-red-500/20 text-red-400 p-2 rounded-xl">
                      <FaPhoneAlt />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 block font-semibold">24/7 Hotline</span>
                      <span className="text-base text-white font-bold">+91 90425 32040</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 text-slate-300">
                    <div className="bg-secondary/25 text-secondary p-2 rounded-xl">
                      <FaClock />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 block font-semibold">Location</span>
                      <span className="text-sm text-white font-bold">Courtallam Main Rd, Tenkasi</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-secondary font-bold text-xs uppercase tracking-widest block">About Our Hospital</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-800 tracking-tight leading-tight">
              Serving Tenkasi with Integrity and Care Since Inception
            </h2>
            <p className="text-slate-600 leading-relaxed">
              At Meeran Hospital, we believe in providing accessible, high-quality, and ethical healthcare. We provide a full range of medical services from preventative screening and diagnostics to specialized consultations and inpatient therapies.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Our hospital infrastructure is designed keeping patient comfort and recovery in mind. With clean patient wards, state-of-the-art diagnostic facilities, and a 24-hour pharmacy, we make sure that all patient needs are handled seamlessly under one roof.
            </p>
            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center space-x-1 text-primary hover:text-primary-dark font-bold transition-all-300"
              >
                <span>Read More About Us</span>
                <FaArrowRight className="text-sm" />
              </Link>
            </div>
          </div>
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm space-y-2 text-center hover-card-effect">
              <span className="text-3xl font-bold font-display text-primary">15+</span>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Years of Service</p>
            </div>
            <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm space-y-2 text-center hover-card-effect">
              <span className="text-3xl font-bold font-display text-secondary-dark">10K+</span>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Patients Treated</p>
            </div>
            <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm space-y-2 text-center hover-card-effect col-span-2">
              <span className="text-3xl font-bold font-display text-rose-500">24/7</span>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Emergency Services & Pharmacy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-slate-50 py-20 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-secondary font-bold text-xs uppercase tracking-widest block">Why Choose Us</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-800 tracking-tight">
              A Higher Standard of Medical Services
            </h2>
            <p className="text-slate-500 text-sm">
              We strive to create an outstanding hospital experience for patients by ensuring maximum efficacy, safety, and comfort.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover-card-effect space-y-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${item.color}`}>
                    <Icon />
                  </div>
                  <h3 className="font-display font-bold text-lg text-slate-800">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-3 max-w-xl">
            <span className="text-secondary font-bold text-xs uppercase tracking-widest block">Our Departments</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-800 tracking-tight">
              Specialized Medical Services
            </h2>
            <p className="text-slate-500 text-sm">
              We offer advanced clinical consultations and complete inpatient and outpatient therapies.
            </p>
          </div>
          <div>
            <Link
              to="/services"
              className="inline-flex items-center space-x-1.5 bg-primary text-white font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-primary-dark transition-all duration-200 shadow-md shadow-primary/15"
            >
              <span>View All Services</span>
              <FaChevronRight className="text-xs" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredServices.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover-card-effect space-y-4">
              <div className="h-2 w-16 bg-secondary rounded-full"></div>
              <h3 className="font-display font-bold text-lg text-slate-800">{service.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-slate-900 text-white py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-secondary font-bold text-xs uppercase tracking-widest block">Patient Testimonials</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
              What Our Patients Say
            </h2>
            <p className="text-slate-400 text-sm">
              Real feedback from people who trusted us with their families.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-slate-800/80 border border-slate-700/50 p-8 rounded-2xl backdrop-blur-sm relative space-y-6">
                <FaQuoteLeft className="text-4xl text-secondary opacity-30 absolute top-6 right-6" />
                <p className="text-slate-300 italic text-sm leading-relaxed">"{t.quote}"</p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center font-bold text-white uppercase text-sm">
                    {t.author.substring(0, 2)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">{t.author}</h4>
                    <span className="text-xs text-slate-400">{t.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment Booking CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-gradient-to-r from-primary to-primary-light text-white rounded-3xl p-8 sm:p-12 shadow-xl shadow-primary/10 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-white/5 rounded-full blur-2xl"></div>
          
          <div className="space-y-4 max-w-2xl text-center md:text-left">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">Need a Quick Health Consultation?</h2>
            <p className="text-primary-100 text-sm sm:text-base leading-relaxed">
              Schedule your outpatient visit online or contact our reception. We prioritize pre-booked consults to reduce patient wait times.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0 w-full sm:w-auto">
            <Link
              to="/book"
              className="flex items-center justify-center space-x-2 bg-secondary hover:bg-secondary-dark text-white font-bold px-6 py-3.5 rounded-xl text-sm transition-all duration-200 shadow-md shadow-secondary/15"
            >
              <FaCalendarAlt />
              <span>Book Appointment</span>
            </Link>
            <a
              href="tel:+919042532040"
              className="flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white font-bold border border-white/20 px-6 py-3.5 rounded-xl text-sm transition-all duration-200"
            >
              <FaPhoneAlt />
              <span>+91 90425 32040</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
