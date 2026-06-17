import React from 'react';
import { FaEye, FaBullseye, FaCheckCircle, FaHospitalSymbol, FaHandsHelping, FaUserShield } from 'react-icons/fa';

export default function About() {
  const facilities = [
    { title: '24/7 In-House Pharmacy', desc: 'Fully stocked with essential pharmaceuticals and pediatric medications for convenience.' },
    { title: 'Diagnostic Laboratory', desc: 'Capable of automated hematology, biochemistry, and general pathology testing.' },
    { title: 'Sterile Labor Rooms', desc: 'Specially maintained aseptic environment for safe, infection-free childbirth.' },
    { title: 'Neonatal Care Units', desc: 'Equipped with phototherapy and incubator systems for newborn observation.' },
    { title: 'General & Private Wards', desc: 'Well-ventilated wards with constant nursing supervision and private recovery suits.' },
    { title: 'Outpatient Consulting', desc: 'Multiple consultation chambers for general medicine, pediatrics, and gynecology.' }
  ];

  const infrastructureDetails = [
    { title: 'Hygienic Environment', desc: 'Strict daily sanitation schedules conforming to standard healthcare sterilization rules.', icon: FaHospitalSymbol },
    { title: 'Accessibility', desc: 'Wheelchair-friendly pathways, ramp entrances, and easily accessible washrooms for senior patients.', icon: FaHandsHelping },
    { title: 'Support Systems', desc: 'Continuous generator power backup, pure drinking water dispensers, and comfortable patient seating.', icon: FaUserShield }
  ];

  return (
    <div className="pt-20 space-y-20">
      {/* Page Header */}
      <section className="bg-slate-950 text-white py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/50 to-secondary/30 mix-blend-multiply"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-3">
          <span className="text-secondary font-bold text-xs uppercase tracking-widest block">Learn More</span>
          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight">
            About Our Hospital
          </h1>
          <p className="text-slate-400 text-sm max-w-xl">
            Meeran Hospital has been providing reliable healthcare services in Tenkasi, Tamil Nadu.
          </p>
        </div>
      </section>

      {/* Hospital Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="text-secondary font-bold text-xs uppercase tracking-widest block">Our Background</span>
          <h2 className="font-display font-bold text-3xl text-slate-800 tracking-tight leading-tight">
            A Trusted Healthcare Partner Committed to the Community
          </h2>
          <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
            Located in Courtallam Main Road, Tenkasi, Meeran Hospital has been a cornerstone of primary and secondary healthcare. We understand that medical consultations should be affordable without compromising on clinical diagnostics or care quality.
          </p>
          <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
            Our clinical team consists of qualified medical practitioners, caring nurses, reception desk staff, and technical specialists who work collaboratively. We focus on diagnosing illnesses accurately, treating with the correct medication protocols, and guiding patient rehabilitation.
          </p>
          <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl flex items-start space-x-3.5">
            <FaCheckCircle className="text-secondary text-xl mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-sm text-slate-800">Affordable Healthcare</h4>
              <p className="text-xs text-slate-500 leading-relaxed mt-0.5">We maintain clean billing ethics, ensuring diagnostic procedures, hospital room rents, and consulting rates are highly affordable for all families.</p>
            </div>
          </div>
        </div>
        <div className="bg-primary/5 rounded-3xl p-8 border border-primary/10 flex flex-col justify-center space-y-6">
          <h3 className="font-display font-bold text-xl text-primary border-b border-primary/10 pb-4">Our Values</h3>
          <ul className="space-y-4">
            <li className="flex items-start space-x-3">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 flex-shrink-0"></span>
              <p className="text-slate-700 text-sm"><strong className="text-slate-800 font-semibold">Integrity:</strong> Honesty in diagnosis and prescribing therapies with zero hidden charges.</p>
            </li>
            <li className="flex items-start space-x-3">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 flex-shrink-0"></span>
              <p className="text-slate-700 text-sm"><strong className="text-slate-800 font-semibold">Quality:</strong> Maintaining sterile standards across wards, surgical blocks, and diagnostic rooms.</p>
            </li>
            <li className="flex items-start space-x-3">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 flex-shrink-0"></span>
              <p className="text-slate-700 text-sm"><strong className="text-slate-800 font-semibold">Empathy:</strong> Offering support and warmth to patients to reduce clinical anxiety.</p>
            </li>
          </ul>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-slate-50 py-20 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vision */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-4 hover-card-effect">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center text-xl">
              <FaEye />
            </div>
            <h3 className="font-display font-bold text-xl text-slate-800">Our Vision</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              To deliver standard, high-quality patient care in rural and semi-urban sectors of Southern Tamil Nadu, ensuring accessibility, medical integrity, and advanced clinical diagnosis for every section of society.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-4 hover-card-effect">
            <div className="w-12 h-12 bg-secondary/15 text-secondary-dark rounded-xl flex items-center justify-center text-xl">
              <FaBullseye />
            </div>
            <h3 className="font-display font-bold text-xl text-slate-800">Our Mission</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Employing expert clinicians, standard sterilization protocols, compassionate nursing staff, and patient-first services to foster healthy communities, minimize clinical complications, and simplify outpatient consultation journeys.
            </p>
          </div>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-secondary font-bold text-xs uppercase tracking-widest block">Core Hospital Features</span>
          <h2 className="font-display font-bold text-3xl text-slate-800 tracking-tight">
            Our Medical Facilities
          </h2>
          <p className="text-slate-500 text-sm">
            We provide structured healthcare infrastructure supporting emergency interventions as well as planned checkups.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((f, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover-card-effect space-y-3">
              <h3 className="font-display font-bold text-base text-slate-800 flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                <span>{f.title}</span>
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed pl-4">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Infrastructure Details */}
      <section className="bg-slate-50 py-16 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-secondary font-bold text-xs uppercase tracking-widest block">Safe & Accessible</span>
            <h2 className="font-display font-bold text-3xl text-slate-800 tracking-tight">
              Hospital Infrastructure
            </h2>
            <p className="text-slate-500 text-sm">
              Making patient visits secure, comfortable, and stress-free.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {infrastructureDetails.map((infra, idx) => {
              const Icon = infra.icon;
              return (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover-card-effect text-center space-y-4">
                  <div className="w-12 h-12 bg-primary/5 text-primary rounded-full flex items-center justify-center text-lg mx-auto">
                    <Icon />
                  </div>
                  <h3 className="font-display font-bold text-base text-slate-800">{infra.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{infra.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Patient Care Information */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-sm space-y-6">
          <h2 className="font-display font-bold text-2xl text-slate-800 border-b border-slate-100 pb-4">
            Patient & Visitor Care Guidelines
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-primary uppercase tracking-wide">Outpatient Visits</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Outpatients are requested to report at the reception desk at least 15 minutes before their scheduled appointment slot. Bring previous medical history documents, prescription charts, and insurance tags if applicable.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-primary uppercase tracking-wide">Inpatient Regulations</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Visiting hours for inpatient units are from 4:00 PM to 7:00 PM daily. Only one helper/attendant pass will be issued per patient to maintain silence, space comfort, and clean clinical hygiene standards.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
