import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../config/api';
import { FaPlus, FaSearch, FaEdit, FaTrashAlt, FaCalendarCheck } from 'react-icons/fa';
import Modal from '../../components/Modal';

export default function AppointmentManagement() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedId, setSelectedId] = useState('');

  const [formData, setFormData] = useState({
    patientName: '',
    mobile: '',
    doctor: '',
    appointmentDate: '',
    appointmentTime: '',
    status: 'Pending'
  });

  const [error, setError] = useState('');

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

  const statuses = ['Pending', 'Confirmed', 'Completed', 'Cancelled'];

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM',
    '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM'
  ];

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/appointments?search=${search}`);
      setAppointments(response.data);
    } catch (err) {
      console.error('Failed to fetch appointments', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [search]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleOpenCreate = () => {
    setIsEditing(false);
    setSelectedId('');
    setFormData({
      patientName: '',
      mobile: '',
      doctor: '',
      appointmentDate: new Date().toISOString().split('T')[0],
      appointmentTime: '',
      status: 'Pending'
    });
    setError('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (app) => {
    setIsEditing(true);
    setSelectedId(app._id);
    setFormData({
      patientName: app.patientName,
      mobile: app.mobile,
      doctor: app.doctor,
      appointmentDate: new Date(app.appointmentDate).toISOString().split('T')[0],
      appointmentTime: app.appointmentTime,
      status: app.status
    });
    setError('');
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to cancel/delete this appointment?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/appointments/${id}`);
      fetchAppointments();
    } catch (err) {
      console.error(err);
      alert('Failed to delete appointment.');
    }
  };

  const validateForm = () => {
    if (!formData.patientName.trim()) return 'Patient name is required';
    if (!formData.mobile.trim()) return 'Mobile number is required';
    if (!/^\d{10}$/.test(formData.mobile.trim())) return 'Mobile number must be exactly 10 digits';
    if (!formData.doctor) return 'Please select a doctor';
    if (!formData.appointmentDate) return 'Please select a date';
    if (!formData.appointmentTime) return 'Please select a time slot';
    if (!formData.status) return 'Please select a status';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      if (isEditing) {
        await axios.put(`${API_BASE_URL}/api/appointments/${selectedId}`, formData);
      } else {
        await axios.post(`${API_BASE_URL}/api/appointments`, formData);
      }
      setIsModalOpen(false);
      fetchAppointments();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save appointment.');
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Completed':
        return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'Cancelled':
        return 'bg-rose-50 text-rose-600 border-rose-100';
      default:
        return 'bg-amber-50 text-amber-600 border-amber-100';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-slate-800">Appointment Management</h1>
          <p className="text-slate-500 text-xs mt-0.5">Track, schedule, and change status of patient appointments.</p>
        </div>
        <div>
          <button
            onClick={handleOpenCreate}
            id="add-appointment-btn"
            className="flex items-center space-x-2 bg-primary hover:bg-primary-dark text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 shadow-md shadow-primary/15 w-full sm:w-auto"
          >
            <FaPlus />
            <span>Schedule Appointment</span>
          </button>
        </div>
      </div>

      {/* Filter and search bar */}
      <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm flex items-center px-4 space-x-2">
        <FaSearch className="text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search appointments by patient, mobile, or doctor..."
          className="bg-transparent border-0 outline-none text-sm w-full placeholder-slate-400"
        />
      </div>

      {/* Appointments List */}
      <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="text-slate-400 text-xs font-bold border-b border-slate-100 uppercase tracking-wide bg-slate-50/50">
                <th className="py-3.5 px-6">Patient Name</th>
                <th className="py-3.5 px-6">Mobile</th>
                <th className="py-3.5 px-6">Doctor Selection</th>
                <th className="py-3.5 px-6">Date & Time</th>
                <th className="py-3.5 px-6 text-center">Status</th>
                <th className="py-3.5 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {loading ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-slate-400">Loading appointments...</td>
                </tr>
              ) : appointments.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-slate-400">No appointments found.</td>
                </tr>
              ) : (
                appointments.map((app) => (
                  <tr key={app._id} className="hover:bg-slate-50/50 transition-colors duration-150">
                    <td className="py-4 px-6 font-bold text-slate-800">{app.patientName}</td>
                    <td className="py-4 px-6 text-xs">{app.mobile}</td>
                    <td className="py-4 px-6 text-xs text-slate-600">{app.doctor}</td>
                    <td className="py-4 px-6 text-xs">
                      <span className="block font-semibold">
                        {new Date(app.appointmentDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                      <span className="text-[10px] text-slate-400">{app.appointmentTime}</span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusClass(app.status)}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex justify-center items-center space-x-2">
                        <button
                          onClick={() => handleOpenEdit(app)}
                          className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          title="Edit Appointment"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(app._id)}
                          className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Cancel/Delete Appointment"
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CRUD Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isEditing ? 'Modify Appointment' : 'Schedule New Appointment'}
      >
        {error && (
          <div className="bg-rose-50 border border-rose-100 text-rose-600 px-4 py-2.5 rounded-xl text-xs font-semibold mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1">Patient Name *</label>
            <input
              type="text"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              placeholder="e.g. Ramesh Kumar"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:border-primary focus:ring-1 focus:ring-primary text-xs"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1">Mobile Number *</label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="10 digits"
              maxLength="10"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:border-primary focus:ring-1 focus:ring-primary text-xs"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1">Doctor *</label>
            <select
              name="doctor"
              value={formData.doctor}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:border-primary focus:ring-1 focus:ring-primary text-xs cursor-pointer"
            >
              <option value="">-- Choose Doctor --</option>
              {doctors.map((doc, idx) => (
                <option key={idx} value={doc}>{doc}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1">Date *</label>
              <input
                type="date"
                name="appointmentDate"
                value={formData.appointmentDate}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:border-primary focus:ring-1 focus:ring-primary text-xs cursor-pointer"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1">Time Slot *</label>
              <select
                name="appointmentTime"
                value={formData.appointmentTime}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:border-primary focus:ring-1 focus:ring-primary text-xs cursor-pointer"
              >
                <option value="">-- Choose Slot --</option>
                {timeSlots.map((slot, idx) => (
                  <option key={idx} value={slot}>{slot}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1">Status *</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:border-primary focus:ring-1 focus:ring-primary text-xs cursor-pointer"
            >
              {statuses.map((st, idx) => (
                <option key={idx} value={st}>{st}</option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50 text-xs font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-xs font-bold shadow-md shadow-primary/10"
            >
              {isEditing ? 'Save Changes' : 'Schedule'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
