import React, { useState } from 'react';
import axios from 'axios';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';
import { API_BASE_URL } from '../config/api';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.name.trim()) return 'Name is required';
    if (!formData.phone.trim()) return 'Phone number is required';
    if (!/^\d{10}$/.test(formData.phone.trim())) return 'Phone number must be a valid 10-digit number';
    if (!formData.message.trim()) return 'Message is required';
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
      await axios.post(`${API_BASE_URL}/api/contacts`, formData);
      setSuccess(true);
      setFormData({
        name: '',
        phone: '',
        message: ''
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 space-y-16">
      {/* Header */}
      <section className="bg-slate-950 text-white py-12 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/50 to-secondary/30 mix-blend-multiply"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-2">
          <span className="text-secondary font-bold text-xs uppercase tracking-widest block">Get In Touch</span>
          <h1 className="font-display font-bold text-3xl sm:text-4xl tracking-tight">
            Contact Us
          </h1>
        </div>
      </section>

      {/* Main Info + Form Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact Coordinates */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-3">
            <h2 className="font-display font-bold text-2xl text-slate-800">Hospital Details</h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              If you have queries regarding OPD hours, doctor availability, clinical charges, or lab reports, feel free to visit or call.
            </p>
          </div>

          <div className="space-y-6">
            {/* Address */}
            <div className="flex items-start space-x-4 bg-white border border-slate-100 p-5 rounded-2xl shadow-sm hover-card-effect">
              <div className="w-11 h-11 bg-primary/10 text-primary flex items-center justify-center rounded-xl text-lg flex-shrink-0">
                <FaMapMarkerAlt />
              </div>
              <div className="space-y-1 text-sm">
                <h4 className="font-bold text-slate-800">Hospital Address</h4>
                <p className="text-slate-600 leading-relaxed">
                  180, KC Rd, Shenkottai,<br />
                  Tamil Nadu - 627809
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start space-x-4 bg-white border border-slate-100 p-5 rounded-2xl shadow-sm hover-card-effect">
              <div className="w-11 h-11 bg-secondary/15 text-secondary-dark flex items-center justify-center rounded-xl text-lg flex-shrink-0">
                <FaPhoneAlt />
              </div>
              <div className="space-y-1 text-sm">
                <h4 className="font-bold text-slate-800">Phone Directory</h4>
                <p className="text-slate-600 font-bold text-base mt-0.5">
                  <a href="tel:04633233103" className="hover:text-primary">
                    04633 233 103
                  </a>
                </p>
                <p className="text-xs text-slate-400">Available during consulting hours</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start space-x-4 bg-white border border-slate-100 p-5 rounded-2xl shadow-sm hover-card-effect">
              <div className="w-11 h-11 bg-indigo-50 text-indigo-600 flex items-center justify-center rounded-xl text-lg flex-shrink-0">
                <FaEnvelope />
              </div>
              <div className="space-y-1 text-sm">
                <h4 className="font-bold text-slate-800">Email Correspondence</h4>
                <p className="text-slate-600">
                  <a href="mailto:info@shanthinikethan.com" className="hover:text-primary font-medium">
                    info@shanthinikethannursinghome.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-sm">
          {success ? (
            <div className="text-center py-10 space-y-4 animate-fade-in-up">
              <div className="w-14 h-14 bg-secondary/15 text-secondary flex items-center justify-center rounded-full mx-auto text-2xl">
                <FaCheckCircle />
              </div>
              <h3 className="font-display font-bold text-xl text-slate-800">Message Submitted!</h3>
              <p className="text-slate-500 text-sm max-w-sm mx-auto">
                Thank you for contacting us. We have received your query and will get back to you shortly.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setSuccess(false)}
                  id="send-another-btn"
                  className="bg-primary hover:bg-primary-dark text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-colors duration-200"
                >
                  Send Another Message
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="font-display font-bold text-lg text-slate-800">Send an Online Message</h3>
                <p className="text-slate-400 text-xs mt-0.5">We review messages daily.</p>
              </div>

              {error && (
                <div className="bg-rose-50 border border-rose-100 text-rose-600 px-4 py-3 rounded-xl text-sm font-semibold">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5" id="contact-form">
                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Rajesh Chandran"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-200 text-sm"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. 9012345678"
                    maxLength="10"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-200 text-sm"
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Type your questions or comments here..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-200 text-sm"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    id="submit-contact-btn"
                    className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl transition-all duration-200 shadow-md shadow-primary/10 disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <FaPaperPlane className="text-xs" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* Embedded Map Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden p-4">
          <div className="space-y-1 mb-4">
            <h3 className="font-display font-bold text-lg text-slate-800 px-2">Location Map</h3>
            <p className="text-xs text-slate-400 px-2">180, KC Rd, Shenkottai, Tamil Nadu 627809</p>
          </div>
          <div className="relative w-full h-96 rounded-2xl overflow-hidden border border-slate-100">
            <iframe
              src="https://maps.google.com/maps?q=Shanthi%20Nikethan%20Nursing%20Home%20Shenkottai&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="absolute top-0 left-0 w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
              title="Shanthi Nikethan Nursing Home Location Map"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
