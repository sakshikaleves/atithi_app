// pages\add-client-form.js
"use client";
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function AddClientForm() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [licenseTo, setLicenseTo] = useState('');
  const [licenseFrom, setLicenseFrom] = useState('');
  const [generalInstructions, setGeneralInstructions] = useState('');
  const [isActive, setIsActive] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure dates are in the correct format
    const formattedLicenseTo = licenseTo ? new Date(licenseTo).toISOString().split('T')[0] : null;
    const formattedLicenseFrom = licenseFrom ? new Date(licenseFrom).toISOString().split('T')[0] : null;

    try {
      const response = await axios.post('/api/mail-clients', {
        name,
        address,
        email,
        licenseTo: formattedLicenseTo,
        licenseFrom: formattedLicenseFrom,
        generalInstructions,
        isActive,
      });
      alert(response.data.message);
      router.push('/add-client'); // Redirect after successful submission
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-blue-500 to-green-500">
      <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Add New Client</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-200"
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-200"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-200"
          />
          <input
            type="date"
            placeholder="License To"
            value={licenseTo}
            onChange={(e) => setLicenseTo(e.target.value)}
            className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-200"
          />
          <input
            type="date"
            placeholder="License From"
            value={licenseFrom}
            onChange={(e) => setLicenseFrom(e.target.value)}
            className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-200"
          />
          <textarea
            placeholder="General Instructions"
            value={generalInstructions}
            onChange={(e) => setGeneralInstructions(e.target.value)}
            required
            className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-200"
          />
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isActive}
              onChange={() => setIsActive(!isActive)}
              className="mr-2"
            />
            <span className="text-gray-700">Active</span>
          </label>
          <button type="submit" className="p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 transform hover:scale-105">
            Add Client
          </button>
        </form>
      </div>
    </div>
  );
}
