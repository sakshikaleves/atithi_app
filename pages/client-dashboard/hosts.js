
import HostModal from './HostModal';

import { useState, useEffect } from 'react';
import axios from 'axios';

import { useRouter } from 'next/router';

export default function Hosts() {
  const [hosts, setHosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      fetchHosts(token);
    }
  }, []);

  const fetchHosts = async (token) => {
    try {
      const response = await axios.get('/api/hosts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setHosts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching hosts:', error);
      setLoading(false);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Host Management</h1>
      <button onClick={openModal} className="bg-blue-500 text-white p-2 rounded mb-4">Add Host</button>
      <HostModal isOpen={isModalOpen} onClose={closeModal} fetchHosts={fetchHosts} />
      <h2 className="text-xl font-bold mb-4">Hosts List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-300">ID</th>
              <th className="py-2 px-4 border-b border-gray-300">Name</th>
              <th className="py-2 px-4 border-b border-gray-300">Mobile</th>
              <th className="py-2 px-4 border-b border-gray-300">Phone</th>
              <th className="py-2 px-4 border-b border-gray-300">Email</th>
              <th className="py-2 px-4 border-b border-gray-300">Department</th>
              <th className="py-2 px-4 border-b border-gray-300">Image</th>
              <th className="py-2 px-4 border-b border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {hosts.map((host, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b border-gray-300">{host.id}</td>
                <td className="py-2 px-4 border-b border-gray-300">{host.name}</td>
                <td className="py-2 px-4 border-b border-gray-300">{host.mobile}</td>
                <td className="py-2 px-4 border-b border-gray-300">{host.phone}</td>
                <td className="py-2 px-4 border-b border-gray-300">{host.email}</td>
                <td className="py-2 px-4 border-b border-gray-300">{host.department}</td>
                <td className="py-2 px-4 border-b border-gray-300">
                  {host.image && <img src={host.image} alt="Host" width={50} />}
                </td>
                <td className="py-2 px-4 border-b border-gray-300">
                  <button className="bg-green-500 text-white p-1 rounded mr-2">Edit</button>
                  <button className="bg-red-500 text-white p-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
