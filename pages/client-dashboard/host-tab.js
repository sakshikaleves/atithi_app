import { useState } from 'react';
import axios from 'axios';

const HostTab = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    phone: '',
    email: '',
    department: '',
    image: '',
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      await axios.post('/api/hosts', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Host added successfully');
      closeModal();
    } catch (error) {
      console.error('Error adding host:', error);
      alert('Error adding host');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Host Tab</h1>
      <div className="flex justify-center mb-8">
        <button
          onClick={openModal}
          className="bg-blue-500 text-white p-4 rounded-lg shadow-lg"
        >
          Add Host
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-2xl mb-4">Add Host</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
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
              <div>
                <label className="block mb-2">Image</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                  className="p-2 border border-gray-300 rounded w-full"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={closeModal}
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
      )}
    </div>
  );
};

export default HostTab;
