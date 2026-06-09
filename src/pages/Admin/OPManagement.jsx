import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus, FaSearch, FaEdit, FaTrashAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Modal from '../../components/Modal';
import { API_BASE_URL } from '../../config/api';

export default function OPManagement() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedId, setSelectedId] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    age: '',
    gender: 'Male',
    address: '',
    reason: '',
    visitDate: ''
  });

  const [error, setError] = useState('');

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/patients?page=${page}&limit=5&search=${search}`);
      setPatients(response.data.patients);
      setTotalPages(response.data.pages);
      setPage(response.data.page);
    } catch (err) {
      console.error('Failed to fetch patients', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, [page, search]);

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
      name: '',
      mobile: '',
      age: '',
      gender: 'Male',
      address: '',
      reason: '',
      visitDate: new Date().toISOString().split('T')[0]
    });
    setError('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (patient) => {
    setIsEditing(true);
    setSelectedId(patient._id);
    setFormData({
      name: patient.name,
      mobile: patient.mobile,
      age: patient.age,
      gender: patient.gender,
      address: patient.address,
      reason: patient.reason,
      visitDate: new Date(patient.visitDate).toISOString().split('T')[0]
    });
    setError('');
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this patient record?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/patients/${id}`);
      fetchPatients();
    } catch (err) {
      console.error(err);
      alert('Failed to delete patient record.');
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) return 'Name is required';
    if (!formData.mobile.trim()) return 'Mobile number is required';
    if (!/^\d{10}$/.test(formData.mobile.trim())) return 'Mobile number must be exactly 10 digits';
    if (!formData.age) return 'Age is required';
    if (parseInt(formData.age) <= 0) return 'Age must be positive';
    if (!formData.address.trim()) return 'Address is required';
    if (!formData.reason.trim()) return 'Reason/Disease is required';
    if (!formData.visitDate) return 'Visit date is required';
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
        await axios.put(`${API_BASE_URL}/api/patients/${selectedId}`, formData);
      } else {
        await axios.post(`${API_BASE_URL}/api/patients`, formData);
      }
      setIsModalOpen(false);
      fetchPatients();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save patient record.');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-slate-800">OP Patient Management</h1>
          <p className="text-slate-500 text-xs mt-0.5">Manage registered Outpatient records, visit notes, and logs.</p>
        </div>
        <div>
          <button
            onClick={handleOpenCreate}
            id="add-patient-btn"
            className="flex items-center space-x-2 bg-primary hover:bg-primary-dark text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 shadow-md shadow-primary/15 w-full sm:w-auto"
          >
            <FaPlus />
            <span>Add New Patient</span>
          </button>
        </div>
      </div>

      {/* Filter and search bar */}
      <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm flex items-center px-4 space-x-2">
        <FaSearch className="text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1); // Reset to page 1 on new search
          }}
          placeholder="Search by ID, name, mobile number, or symptoms..."
          className="bg-transparent border-0 outline-none text-sm w-full placeholder-slate-400"
        />
      </div>

      {/* Patients Table */}
      <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="text-slate-400 text-xs font-bold border-b border-slate-100 uppercase tracking-wide bg-slate-50/50">
                <th className="py-3.5 px-6">ID</th>
                <th className="py-3.5 px-6">Patient Info</th>
                <th className="py-3.5 px-6">Age / Gender</th>
                <th className="py-3.5 px-6">Reason / Symptoms</th>
                <th className="py-3.5 px-6">Visit Date</th>
                <th className="py-3.5 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {loading ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-slate-400">Loading patients records...</td>
                </tr>
              ) : patients.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-slate-400">No patient records found.</td>
                </tr>
              ) : (
                patients.map((pat) => (
                  <tr key={pat._id} className="hover:bg-slate-50/50 transition-colors duration-150">
                    <td className="py-4 px-6 font-bold text-primary">{pat.patientId}</td>
                    <td className="py-4 px-6">
                      <span className="block font-bold text-slate-800">{pat.name}</span>
                      <span className="text-xs text-slate-400 font-normal">{pat.mobile}</span>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-600">
                      {pat.age} Yrs / {pat.gender}
                    </td>
                    <td className="py-4 px-6 text-xs max-w-xs truncate" title={pat.reason}>
                      {pat.reason}
                    </td>
                    <td className="py-4 px-6 text-xs">
                      {new Date(pat.visitDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex justify-center items-center space-x-2">
                        <button
                          onClick={() => handleOpenEdit(pat)}
                          className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          title="Edit Patient"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(pat._id)}
                          className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete Patient"
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

        {/* Pagination Section */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4 bg-slate-50/30">
            <span className="text-xs text-slate-500 font-semibold">
              Page {page} of {totalPages}
            </span>
            <div className="flex space-x-2">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="flex items-center justify-center p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xs text-slate-600 font-bold"
              >
                <FaChevronLeft className="mr-1" />
                <span>Prev</span>
              </button>
              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="flex items-center justify-center p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xs text-slate-600 font-bold"
              >
                <span>Next</span>
                <FaChevronRight className="ml-1" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* CRUD Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isEditing ? 'Edit Patient Record' : 'Add New OP Patient'}
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
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Ramesh Kumar"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:border-primary focus:ring-1 focus:ring-primary text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
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
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1">Age *</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="e.g. 42"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:border-primary focus:ring-1 focus:ring-primary text-xs"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1">Gender *</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:border-primary focus:ring-1 focus:ring-primary text-xs cursor-pointer"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1">Address *</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Full address"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:border-primary focus:ring-1 focus:ring-primary text-xs"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1">Reason for Visit / Symptoms *</label>
            <input
              type="text"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="e.g. Fever, pain checkup"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:border-primary focus:ring-1 focus:ring-primary text-xs"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1">Visit Date *</label>
            <input
              type="date"
              name="visitDate"
              value={formData.visitDate}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:border-primary focus:ring-1 focus:ring-primary text-xs cursor-pointer"
            />
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
              {isEditing ? 'Save Changes' : 'Create Record'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
