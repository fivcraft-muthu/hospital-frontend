import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus, FaSearch, FaEdit, FaTrashAlt } from 'react-icons/fa';
import Modal from '../../components/Modal';
import { API_BASE_URL } from '../../config/api';

export default function StaffManagement() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedId, setSelectedId] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    role: 'Doctor',
    department: '',
    phone: '',
    joiningDate: '',
    salary: ''
  });

  const [error, setError] = useState('');

  const roles = ['Doctor', 'Nurse', 'Receptionist', 'Lab Technician', 'Admin Staff'];

  const fetchStaff = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/staff?search=${search}`);
      setStaff(response.data);
    } catch (err) {
      console.error('Failed to fetch staff list', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
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
      name: '',
      role: 'Doctor',
      department: '',
      phone: '',
      joiningDate: new Date().toISOString().split('T')[0],
      salary: ''
    });
    setError('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (member) => {
    setIsEditing(true);
    setSelectedId(member._id);
    setFormData({
      name: member.name,
      role: member.role,
      department: member.department,
      phone: member.phone,
      joiningDate: new Date(member.joiningDate).toISOString().split('T')[0],
      salary: member.salary || ''
    });
    setError('');
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to remove this staff member?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/staff/${id}`);
      fetchStaff();
    } catch (err) {
      console.error(err);
      alert('Failed to delete staff member.');
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) return 'Name is required';
    if (!formData.role) return 'Role is required';
    if (!formData.department.trim()) return 'Department is required';
    if (!formData.phone.trim()) return 'Phone number is required';
    if (!/^\d{10}$/.test(formData.phone.trim()) && !/^\d{5}\s\d{3}\s\d{3}$/.test(formData.phone.trim()) && !formData.phone.includes('04633')) {
      // Allow landline phone code for Meeran Hospital: '04633 233 103'
      if (formData.phone.length < 9) return 'Enter a valid phone number';
    }
    if (!formData.joiningDate) return 'Joining date is required';
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
      const payload = {
        ...formData,
        salary: formData.salary ? parseFloat(formData.salary) : undefined
      };
      
      if (isEditing) {
        await axios.put(`${API_BASE_URL}/api/staff/${selectedId}`, payload);
      } else {
        await axios.post(`${API_BASE_URL}/api/staff`, payload);
      }
      setIsModalOpen(false);
      fetchStaff();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save staff record.');
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'Doctor':
        return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'Nurse':
        return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Receptionist':
        return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'Lab Technician':
        return 'bg-purple-50 text-purple-600 border-purple-100';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-slate-800">Staff Management</h1>
          <p className="text-slate-500 text-xs mt-0.5">Manage details, departments, and records of nursing home staff.</p>
        </div>
        <div>
          <button
            onClick={handleOpenCreate}
            id="add-staff-btn"
            className="flex items-center space-x-2 bg-primary hover:bg-primary-dark text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 shadow-md shadow-primary/15 w-full sm:w-auto"
          >
            <FaPlus />
            <span>Add Staff Member</span>
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
          placeholder="Search staff by name, role, department, or phone..."
          className="bg-transparent border-0 outline-none text-sm w-full placeholder-slate-400"
        />
      </div>

      {/* Staff Table */}
      <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="text-slate-400 text-xs font-bold border-b border-slate-100 uppercase tracking-wide bg-slate-50/50">
                <th className="py-3.5 px-6">Name</th>
                <th className="py-3.5 px-6">Role</th>
                <th className="py-3.5 px-6">Department</th>
                <th className="py-3.5 px-6">Phone</th>
                <th className="py-3.5 px-6">Joining Date</th>
                <th className="py-3.5 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {loading ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-slate-400">Loading staff records...</td>
                </tr>
              ) : staff.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-slate-400">No staff members found.</td>
                </tr>
              ) : (
                staff.map((member) => (
                  <tr key={member._id} className="hover:bg-slate-50/50 transition-colors duration-150">
                    <td className="py-4 px-6 font-bold text-slate-800">{member.name}</td>
                    <td className="py-4 px-6 text-xs">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getRoleBadgeColor(member.role)}`}>
                        {member.role}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-600">{member.department}</td>
                    <td className="py-4 px-6 text-xs">{member.phone}</td>
                    <td className="py-4 px-6 text-xs">
                      {new Date(member.joiningDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex justify-center items-center space-x-2">
                        <button
                          onClick={() => handleOpenEdit(member)}
                          className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          title="Edit Staff Member"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(member._id)}
                          className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete Staff Member"
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
        title={isEditing ? 'Modify Staff Record' : 'Add New Staff Member'}
      >
        {error && (
          <div className="bg-rose-50 border border-rose-100 text-rose-600 px-4 py-2.5 rounded-xl text-xs font-semibold mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1">Staff Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Karthik Raja"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:border-primary focus:ring-1 focus:ring-primary text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1">Role *</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:border-primary focus:ring-1 focus:ring-primary text-xs cursor-pointer"
              >
                {roles.map((r, idx) => (
                  <option key={idx} value={r}>{r}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1">Department *</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="e.g. Front Desk"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:border-primary focus:ring-1 focus:ring-primary text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="10 digits or code"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:border-primary focus:ring-1 focus:ring-primary text-xs"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1">Salary (Optional)</label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                placeholder="Monthly in INR"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:border-primary focus:ring-1 focus:ring-primary text-xs"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1">Joining Date *</label>
            <input
              type="date"
              name="joiningDate"
              value={formData.joiningDate}
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
              {isEditing ? 'Save Changes' : 'Add Staff'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
