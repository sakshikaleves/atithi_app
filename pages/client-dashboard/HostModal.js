import { useState } from 'react';
import axios from 'axios';

const HostModal = ({ isOpen, onClose, fetchHosts }) => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    phone: '',
    email: '',
    department: '',
    image: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    console.log('Token retrieved:', token); // Debugging line to check token

    if (!token) {
      alert('No token found. Please log in again.');
      return;
    }

    try {
      const response = await axios.post('/api/hosts', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Response:', response); // Debugging line to check response

      if (response.status === 201) {
        alert('Host added successfully');
        onClose();
        fetchHosts(token); // Refresh the hosts list
      } else {
        alert('Failed to add host');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(`Error submitting form: ${error.response ? error.response.data.message : error.message}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-2xl w-full max-h-screen overflow-y-auto">
        <h2 className="text-2xl mb-4">Add Host</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Mobile</label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Department</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
          </div>
          <div className="my-4">
            <label className="block mb-2">Image</label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white p-2 rounded"
            >
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HostModal;
