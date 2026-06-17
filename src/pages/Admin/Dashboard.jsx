import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserInjured, FaCalendarCheck, FaUsers, FaCalendarDay, FaUserPlus, FaCalendarPlus, FaPlus } from 'react-icons/fa';
import StatCard from '../../components/StatCard';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../../config/api';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalAppointments: 0,
    totalStaff: 0,
    todaysAppointments: 0,
    recentAppointments: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/dashboard/stats`);
      setStats(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch dashboard statistics.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

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
    <div className="space-y-8 animate-fade-in-up">
      {/* Page Title & Refresh */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-slate-800">Dashboard Overview</h1>
          <p className="text-slate-500 text-xs mt-0.5">Welcome to Meeran Hospital Admin Panel. Real-time statistics.</p>
        </div>
        <div>
          <button
            onClick={fetchStats}
            id="refresh-stats-btn"
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-semibold transition-colors duration-200 border border-slate-200"
          >
            Refresh Data
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-rose-50 border border-rose-100 text-rose-600 px-4 py-3 rounded-xl text-sm font-semibold">
          {error}
        </div>
      )}

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total OP Patients"
          value={loading ? '...' : stats.totalPatients}
          icon={FaUserInjured}
          color="primary"
          description="Registered outpatients"
        />
        <StatCard
          title="Total Appointments"
          value={loading ? '...' : stats.totalAppointments}
          icon={FaCalendarCheck}
          color="secondary"
          description="All-time bookings"
        />
        <StatCard
          title="Total Staff"
          value={loading ? '...' : stats.totalStaff}
          icon={FaUsers}
          color="info"
          description="Medical & support staff"
        />
        <StatCard
          title="Today's Appointments"
          value={loading ? '...' : stats.todaysAppointments}
          icon={FaCalendarDay}
          color="danger"
          description="Scheduled for today"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Appointments Table */}
        <div className="lg:col-span-8 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-50 pb-4">
            <h3 className="font-display font-bold text-base text-slate-800">
              Recent Appointments
            </h3>
            <Link
              to="/admin/appointments"
              className="text-xs text-primary font-bold hover:text-primary-dark"
            >
              View All
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="text-slate-400 text-xs font-bold border-b border-slate-100 uppercase tracking-wide">
                  <th className="py-3 px-2">Patient</th>
                  <th className="py-3 px-2">Doctor</th>
                  <th className="py-3 px-2">Date</th>
                  <th className="py-3 px-2 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 font-medium text-slate-700">
                {loading ? (
                  <tr>
                    <td colSpan="4" className="py-8 text-center text-slate-400">Loading appointments...</td>
                  </tr>
                ) : stats.recentAppointments.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="py-8 text-center text-slate-400">No appointments scheduled.</td>
                  </tr>
                ) : (
                  stats.recentAppointments.map((app) => (
                    <tr key={app._id} className="hover:bg-slate-50/50 transition-colors duration-150">
                      <td className="py-3.5 px-2">
                        <span className="block font-bold text-slate-800">{app.patientName}</span>
                        <span className="text-[10px] text-slate-400">{app.mobile}</span>
                      </td>
                      <td className="py-3.5 px-2 text-xs text-slate-600">{app.doctor.split(' - ')[0]}</td>
                      <td className="py-3.5 px-2 text-xs">
                        <span className="block">{new Date(app.appointmentDate).toLocaleDateString()}</span>
                        <span className="text-[10px] text-primary">{app.appointmentTime}</span>
                      </td>
                      <td className="py-3.5 px-2 text-center">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusClass(app.status)}`}>
                          {app.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick actions panel */}
        <div className="lg:col-span-4 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-6">
          <h3 className="font-display font-bold text-base text-slate-800 border-b border-slate-50 pb-4">
            Quick Actions
          </h3>

          <div className="flex flex-col space-y-3">
            <Link
              to="/admin/patients"
              className="flex items-center justify-between p-4 bg-primary/5 hover:bg-primary/10 text-primary rounded-2xl transition-all-300 font-bold text-sm border border-primary/5 group"
            >
              <div className="flex items-center space-x-3">
                <FaUserPlus className="text-lg" />
                <span>Add OP Patient</span>
              </div>
              <FaPlus className="text-xs text-slate-400 group-hover:text-primary transition-colors" />
            </Link>

            <Link
              to="/admin/appointments"
              className="flex items-center justify-between p-4 bg-secondary/5 hover:bg-secondary/10 text-secondary-dark rounded-2xl transition-all-300 font-bold text-sm border border-secondary/5 group"
            >
              <div className="flex items-center space-x-3">
                <FaCalendarPlus className="text-lg" />
                <span>New Appointment</span>
              </div>
              <FaPlus className="text-xs text-slate-400 group-hover:text-secondary-dark transition-colors" />
            </Link>

            <Link
              to="/admin/staff"
              className="flex items-center justify-between p-4 bg-indigo-50 hover:bg-indigo-100/70 text-indigo-700 rounded-2xl transition-all-300 font-bold text-sm border border-indigo-100/20 group"
            >
              <div className="flex items-center space-x-3">
                <FaUsers className="text-lg" />
                <span>Add Staff Member</span>
              </div>
              <FaPlus className="text-xs text-slate-400 group-hover:text-indigo-700 transition-colors" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
