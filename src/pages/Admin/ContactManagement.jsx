import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrashAlt, FaSearch, FaEnvelopeOpen, FaPhoneAlt, FaCalendarAlt, FaUser } from 'react-icons/fa';
import { API_BASE_URL } from '../../config/api';

export default function ContactManagement() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/contacts?search=${search}`);
      setMessages(response.data);
    } catch (err) {
      console.error('Failed to fetch contact messages', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [search]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact message?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/contacts/${id}`);
      fetchMessages();
    } catch (err) {
      console.error(err);
      alert('Failed to delete message.');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Title */}
      <div>
        <h1 className="font-display font-bold text-2xl text-slate-800">Contact Message Management</h1>
        <p className="text-slate-500 text-xs mt-0.5">View and delete client questions, feedback, and support letters.</p>
      </div>

      {/* Filter and search bar */}
      <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm flex items-center px-4 space-x-2">
        <FaSearch className="text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search messages by name, phone number, or content..."
          className="bg-transparent border-0 outline-none text-sm w-full placeholder-slate-400"
        />
      </div>

      {/* Message Cards Grid */}
      {loading ? (
        <div className="text-center py-12 text-slate-400 font-medium text-sm">
          Loading contact messages...
        </div>
      ) : messages.length === 0 ? (
        <div className="text-center py-12 text-slate-400 border border-dashed border-slate-200 rounded-3xl bg-white font-medium text-sm">
          No contact messages found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {messages.map((msg) => (
            <div key={msg._id} className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4 hover:shadow-md transition-shadow duration-300 relative flex flex-col justify-between">
              
              {/* Card Main Info */}
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                      <FaUser />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-base text-slate-800">{msg.name}</h3>
                      <p className="text-xs text-slate-400 font-semibold flex items-center space-x-1 mt-0.5">
                        <FaPhoneAlt className="text-[9px]" />
                        <a href={`tel:${msg.phone}`} className="hover:text-primary">{msg.phone}</a>
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(msg._id)}
                    className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors self-start"
                    title="Delete Message"
                  >
                    <FaTrashAlt className="text-xs" />
                  </button>
                </div>

                <div className="bg-slate-50/70 border border-slate-100 rounded-2xl p-4 text-xs text-slate-600 leading-relaxed min-h-[5rem]">
                  <FaEnvelopeOpen className="text-slate-300 text-sm mb-1" />
                  <p>{msg.message}</p>
                </div>
              </div>

              {/* Message Date Footer */}
              <div className="border-t border-slate-50 pt-3 flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                <span className="flex items-center space-x-1.5">
                  <FaCalendarAlt />
                  <span>
                    {new Date(msg.createdAt || msg.updatedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </span>
                <span>
                  {new Date(msg.createdAt || msg.updatedAt).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
