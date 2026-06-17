import React, { useState } from 'react';
import axios from 'axios';
import { FaCalendarAlt, FaCheckCircle, FaUser, FaPhoneAlt, FaHospital, FaNotesMedical, FaStethoscope } from 'react-icons/fa';
import { API_BASE_URL } from '../config/api';

export default function AppointmentBooking() {
  const [formData, setFormData] = useState({
    patientName: '',
    mobile: '',
    age: '',
    gender: 'Male',
    doctor: '',
    appointmentDate: '',
    appointmentTime: '',
    symptoms: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bookedDetails, setBookedDetails] = useState(null);

  const doctors = [
    'Dr. M. Abdul Azeez - Paediatrics',
    'Dr. M. Shakila Banu - Obstetrics & Gynecology',
    'Dr. A. Shafeeq - Gastroenterology',
    'Dr. A. Larif - Urology',
    'Dr. Christopher.S.K - Bariatric Surgery',
    'Dr. Dinesh David - Cardiology',
    'Dr. S. Madhu - Orthopedics',
    'Dr. Karthikeyan - Nephrology',
    'Dr. Ashok - Neurology',
    'Dr. Nirmal - Psychiatry',
    'Dr. R. Santhosh Kumar - Orthopedics',
    'Dr. G. Praveen Krishna - Pediatric Surgery',
    'Dr. M. Sivaram Gowtham - ENT',
    'Dr. V. Gowsalya - Physiotherapy',
    'Dr. R. Krishna Kumar - General Surgery'
  ];

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM',
    '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.patientName.trim()) return 'Patient name is required';
    if (!formData.mobile.trim()) return 'Mobile number is required';
    if (!/^\d{10}$/.test(formData.mobile.trim())) return 'Mobile number must be exactly 10 digits';
    if (!formData.age) return 'Age is required';
    if (parseInt(formData.age) <= 0 || parseInt(formData.age) > 125) return 'Please enter a valid age';
    if (!formData.doctor) return 'Please select a doctor';
    if (!formData.appointmentDate) return 'Please select a date';
    
    // Ensure date is not in the past
    const selectedDate = new Date(formData.appointmentDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) return 'Appointment date cannot be in the past';

    if (!formData.appointmentTime) return 'Please select a time slot';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API_BASE_URL}/api/appointments`, formData);
      setBookedDetails(response.data);
      setSuccess(true);
      // Reset form
      setFormData({
        patientName: '',
        mobile: '',
        age: '',
        gender: 'Male',
        doctor: '',
        appointmentDate: '',
        appointmentTime: '',
        symptoms: ''
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to book appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 space-y-12">
      {/* Header */}
      <section className="bg-slate-950 text-white py-12 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/50 to-secondary/30 mix-blend-multiply"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-2">
          <span className="text-secondary font-bold text-xs uppercase tracking-widest block">Outpatient Form</span>
          <h1 className="font-display font-bold text-3xl sm:text-4xl tracking-tight">
            Schedule Appointment
          </h1>
        </div>
      </section>

      {/* Main Booking Container */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-20">
        {success ? (
          /* Success Message Overlay Card */
          <div className="bg-white rounded-3xl border border-slate-100 p-8 sm:p-12 shadow-xl text-center space-y-6 animate-fade-in-up">
            <div className="w-16 h-16 bg-secondary/15 text-secondary flex items-center justify-center rounded-full mx-auto text-3xl">
              <FaCheckCircle />
            </div>
            <div className="space-y-2">
              <h2 className="font-display font-bold text-2xl text-slate-800">Booking Confirmed!</h2>
              <p className="text-slate-500 text-sm">
                Your appointment has been registered in our database. Please save the details below:
              </p>
            </div>

            {bookedDetails && (
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 text-left space-y-3 max-w-md mx-auto text-sm">
                <p className="flex justify-between">
                  <span className="text-slate-400">Patient:</span>
                  <span className="font-bold text-slate-700">{bookedDetails.patientName}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-slate-400">Doctor:</span>
                  <span className="font-bold text-slate-700">{bookedDetails.doctor}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-slate-400">Date:</span>
                  <span className="font-bold text-primary">
                    {new Date(bookedDetails.appointmentDate).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </p>
                <p className="flex justify-between">
                  <span className="text-slate-400">Time:</span>
                  <span className="font-bold text-primary">{bookedDetails.appointmentTime}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-slate-400">Status:</span>
                  <span className="font-bold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full text-xs">
                    {bookedDetails.status}
                  </span>
                </p>
              </div>
            )}

            <div className="pt-4">
              <button
                onClick={() => setSuccess(false)}
                id="book-another-btn"
                className="bg-primary hover:bg-primary-dark text-white font-bold px-8 py-3 rounded-xl text-sm transition-all duration-300 shadow-md shadow-primary/15"
              >
                Book Another Appointment
              </button>
            </div>
          </div>
        ) : (
          /* Interactive Booking Form */
          <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-10 shadow-lg space-y-8">
            <div className="space-y-2">
              <h2 className="font-display font-bold text-xl text-slate-800">Enter Details</h2>
              <p className="text-slate-400 text-xs">
                All fields marked with an asterisk (*) are required.
              </p>
            </div>

            {error && (
              <div className="bg-rose-50 border border-rose-100 text-rose-600 px-4 py-3 rounded-xl text-sm font-semibold">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6" id="appointment-form">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Patient Name */}
                <div className="space-y-2">
                  <label htmlFor="patientName" className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center space-x-1">
                    <FaUser className="text-[10px]" />
                    <span>Patient Name *</span>
                  </label>
                  <input
                    type="text"
                    id="patientName"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleChange}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-200 text-sm"
                  />
                </div>

                {/* Mobile Number */}
                <div className="space-y-2">
                  <label htmlFor="mobile" className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center space-x-1">
                    <FaPhoneAlt className="text-[10px]" />
                    <span>Mobile Number *</span>
                  </label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="e.g. 9876543210"
                    maxLength="10"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-200 text-sm"
                  />
                </div>

                {/* Age */}
                <div className="space-y-2">
                  <label htmlFor="age" className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center space-x-1">
                    <FaHospital className="text-[10px]" />
                    <span>Patient Age *</span>
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="e.g. 32"
                    min="1"
                    max="120"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-200 text-sm"
                  />
                </div>

                {/* Gender */}
                <div className="space-y-2">
                  <label htmlFor="gender" className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                    Gender *
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-200 text-sm cursor-pointer"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Doctor Selection */}
                <div className="space-y-2 sm:col-span-2">
                  <label htmlFor="doctor" className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center space-x-1">
                    <FaStethoscope className="text-[10px]" />
                    <span>Select Doctor *</span>
                  </label>
                  <select
                    id="doctor"
                    name="doctor"
                    value={formData.doctor}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-200 text-sm cursor-pointer"
                  >
                    <option value="">-- Choose Specialization Doctor --</option>
                    {doctors.map((doc, idx) => (
                      <option key={idx} value={doc}>{doc}</option>
                    ))}
                  </select>
                </div>

                {/* Appointment Date */}
                <div className="space-y-2">
                  <label htmlFor="appointmentDate" className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center space-x-1">
                    <FaCalendarAlt className="text-[10px]" />
                    <span>Date *</span>
                  </label>
                  <input
                    type="date"
                    id="appointmentDate"
                    name="appointmentDate"
                    value={formData.appointmentDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-200 text-sm cursor-pointer"
                  />
                </div>

                {/* Appointment Time */}
                <div className="space-y-2">
                  <label htmlFor="appointmentTime" className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center space-x-1">
                    <FaCalendarAlt className="text-[10px]" />
                    <span>Preferred Time Slot *</span>
                  </label>
                  <select
                    id="appointmentTime"
                    name="appointmentTime"
                    value={formData.appointmentTime}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-200 text-sm cursor-pointer"
                  >
                    <option value="">-- Choose Slot --</option>
                    {timeSlots.map((slot, idx) => (
                      <option key={idx} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>

                {/* Symptoms / Notes */}
                <div className="space-y-2 sm:col-span-2">
                  <label htmlFor="symptoms" className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center space-x-1">
                    <FaNotesMedical className="text-[10px]" />
                    <span>Symptoms / Reason / Medical History (Optional)</span>
                  </label>
                  <textarea
                    id="symptoms"
                    name="symptoms"
                    rows="3"
                    value={formData.symptoms}
                    onChange={handleChange}
                    placeholder="Brief description of complaints (e.g. fever, headache since 2 days)"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-200 text-sm"
                  ></textarea>
                </div>

              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  id="submit-booking-btn"
                  className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3.5 rounded-xl transition-all duration-200 shadow-md shadow-primary/15 disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <span>Registering...</span>
                  ) : (
                    <>
                      <FaCalendarAlt />
                      <span>Confirm & Book Appointment</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </section>
    </div>
  );
}
