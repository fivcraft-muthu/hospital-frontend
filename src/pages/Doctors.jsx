import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserMd, FaCalendarCheck, FaClock, FaMedal } from 'react-icons/fa';

export default function Doctors() {
  const doctorsList = [
    {
      name: 'Dr. M. Abdul Azeez',
      role: 'Consultant Paediatrician',
      specialization: 'Paediatrics',
      qualifications: 'MBBS, MD (Paediatrics)',
      experience: '10+ Years',
      availability: 'Mon - Sat: 09:30 AM - 01:30 PM, 04:30 PM - 07:30 PM',
      initials: 'AA',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      name: 'Dr. M. Shakila Banu',
      role: 'Consultant OBGYN',
      specialization: 'Obstetrics & Gynecology',
      qualifications: 'MBBS, DGO, MS (OBGYN)',
      experience: '12+ Years',
      availability: 'Mon - Sat: 10:00 AM - 02:00 PM, 05:00 PM - 08:00 PM',
      initials: 'SB',
      color: 'from-rose-400 to-pink-600'
    },
    {
      name: 'Dr. A. Shafeeq',
      role: 'Consultant Gastroenterologist',
      specialization: 'Gastroenterology',
      qualifications: 'MBBS, MD, DM (Gastro)',
      experience: '9+ Years',
      availability: 'Mon - Sat: 09:00 AM - 01:00 PM, 04:00 PM - 07:00 PM',
      initials: 'AS',
      color: 'from-teal-400 to-emerald-600'
    },
    {
      name: 'Dr. A. Larif',
      role: 'Consultant Urologist',
      specialization: 'Urology',
      qualifications: 'M.S., DNB, M.ch.,(Uro)',
      experience: '11+ Years',
      availability: 'Mon - Sat: 10:00 AM - 01:00 PM, 04:00 PM - 07:30 PM',
      initials: 'AL',
      color: 'from-indigo-400 to-cyan-600'
    },
    {
      name: 'Dr. Christopher.S.K',
      role: 'Consultant Bariatric Surgeon',
      specialization: 'Bariatric Surgery',
      qualifications: 'M.B.B.S., DNB (Gen Surgery)',
      experience: '8+ Years',
      availability: 'Mon - Sat: 09:00 AM - 01:00 PM, 04:00 PM - 06:00 PM',
      initials: 'CK',
      color: 'from-amber-400 to-orange-600'
    },
    {
      name: 'Dr. Dinesh David',
      role: 'Consultant Cardiologist',
      specialization: 'Cardiology',
      qualifications: 'MD., DM (Cardio)',
      experience: '10+ Years',
      availability: 'Mon - Sat: 09:00 AM - 01:00 PM, 04:00 PM - 08:00 PM',
      initials: 'DD',
      color: 'from-sky-400 to-blue-600'
    },
    {
      name: 'Dr. S. Madhu',
      role: 'Consultant Orthopedic Surgeon',
      specialization: 'Orthopedics',
      qualifications: 'M.B.B.S., M.s., (Ortho)',
      experience: '14+ Years',
      availability: 'Mon - Sat: 09:00 AM - 01:00 PM, 04:00 PM - 08:00 PM',
      initials: 'SM',
      color: 'from-emerald-400 to-teal-600'
    },
    {
      name: 'Dr. Karthikeyan',
      role: 'Consultant Nephrologist',
      specialization: 'Nephrology',
      qualifications: 'MD., (Gen. Med)., DM (Nephro)',
      experience: '9+ Years',
      availability: 'Mon - Sat: 10:00 AM - 02:00 PM, 05:00 PM - 08:00 PM',
      initials: 'DK',
      color: 'from-blue-600 to-violet-600'
    },
    {
      name: 'Dr. Ashok',
      role: 'Consultant Neurologist',
      specialization: 'Neurology',
      qualifications: 'MD., DM., (Neuro)',
      experience: '12+ Years',
      availability: 'Mon - Sat: 09:30 AM - 01:30 PM, 04:30 PM - 08:00 PM',
      initials: 'DA',
      color: 'from-indigo-500 to-purple-600'
    },
    {
      name: 'Dr. Nirmal',
      role: 'Consultant Psychiatrist',
      specialization: 'Psychiatry',
      qualifications: 'MD., (PSY)',
      experience: '8+ Years',
      availability: 'Mon - Sat: 09:00 AM - 01:00 PM, 04:00 PM - 07:00 PM',
      initials: 'DN',
      color: 'from-violet-400 to-fuchsia-600'
    },
    {
      name: 'Dr. R. Santhosh Kumar',
      role: 'Consultant Orthopedic Surgeon',
      specialization: 'Orthopedics',
      qualifications: 'M.S., (Ortho) DNB (Ortho)',
      experience: '7+ Years',
      availability: 'Mon - Sat: 09:00 AM - 01:00 PM, 04:00 PM - 08:00 PM',
      initials: 'SK',
      color: 'from-emerald-500 to-green-600'
    },
    {
      name: 'Dr. G. Praveen Krishna',
      role: 'Consultant Pediatric Surgeon',
      specialization: 'Pediatric Surgery',
      qualifications: 'M.S (Gen Surg)., M.ch (Paed. Surg)',
      experience: '10+ Years',
      availability: 'Mon - Sat: 10:00 AM - 01:00 PM, 04:00 PM - 07:00 PM',
      initials: 'PK',
      color: 'from-blue-400 to-sky-600'
    },
    {
      name: 'Dr. M. Sivaram Gowtham',
      role: 'Consultant ENT Specialist',
      specialization: 'ENT',
      qualifications: 'DLO., DNB.,',
      experience: '8+ Years',
      availability: 'Mon - Sat: 09:00 AM - 01:00 PM, 04:00 PM - 08:00 PM',
      initials: 'SG',
      color: 'from-cyan-400 to-blue-500'
    },
    {
      name: 'Dr. V. Gowsalya',
      role: 'Consultant Physiotherapist',
      specialization: 'Physiotherapy',
      qualifications: 'B.P.T.,',
      experience: '6+ Years',
      availability: 'Mon - Sat: 09:00 AM - 01:00 PM, 04:00 PM - 07:00 PM',
      initials: 'VG',
      color: 'from-rose-400 to-orange-400'
    },
    {
      name: 'Dr. R. Krishna Kumar',
      role: 'Consultant General Surgeon',
      specialization: 'General Surgery',
      qualifications: 'MS (Gen Surgery)',
      experience: '11+ Years',
      availability: 'Mon - Sat: 09:00 AM - 01:00 PM, 04:00 PM - 08:00 PM',
      initials: 'KK',
      color: 'from-teal-500 to-indigo-500'
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
            Our qualified clinical experts bring years of medical experience to Meeran Hospital.
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
