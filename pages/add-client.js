// // pages/add-client.js
// import { useRouter } from 'next/router';

// export default function AddClient() {
//   const router = useRouter();

//   const handleAddClient = () => {
//     router.push('/add-client-form');
//   };

//   return (
//     <div className="flex h-screen items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg text-center">
//         <h1 className="text-2xl font-bold mb-6">Client Management</h1>
//         <button
//           onClick={handleAddClient}
//           className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
//         >
//           Add New Client
//         </button>
//       </div>
//     </div>
//   );
// }
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/router';

// export default function AddClient() {
//   const [clients, setClients] = useState([]);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchClients = async () => {
//       try {
//         const response = await axios.get('/api/add-clients-backend');
//         setClients(response.data);
//       } catch (error) {
//         console.error('Error fetching clients:', error);
//       }
//     };

//     fetchClients();
//   }, []);

//   const handleAddClient = () => {
//     router.push('/add-client-form');
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`/api/clients/${id}`);
//       setClients(clients.filter(client => client.id !== id));
//       alert('Client deleted successfully');
//     } catch (error) {
//       console.error('Error deleting client:', error);
//       alert('Error deleting client');
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gray-100">
//       <header className="bg-blue-500 text-white text-center py-4 shadow-md">
//         <h1 className="text-3xl font-bold">Client Management</h1>
//       </header>
//       <main className="flex flex-col items-center justify-center flex-grow p-8">
//         <button
//           onClick={handleAddClient}
//           className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 mb-6"
//         >
//           Add New Client
//         </button>
//         <h2 className="text-2xl font-bold mb-4">Clients</h2>
//         <div className="w-full overflow-x-auto">
//           <table className="min-w-full bg-white">
//             <thead>
//               <tr>
//                 <th className="py-2 px-4 border-b border-gray-200">Name</th>
//                 <th className="py-2 px-4 border-b border-gray-200">Address</th>
//                 <th className="py-2 px-4 border-b border-gray-200">Email</th>
//                 <th className="py-2 px-4 border-b border-gray-200">License To</th>
//                 <th className="py-2 px-4 border-b border-gray-200">License From</th>
//                 <th className="py-2 px-4 border-b border-gray-200">Active</th>
//                 <th className="py-2 px-4 border-b border-gray-200">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {clients.map((client) => (
//                 <tr key={client.id}>
//                   <td className="py-2 px-4 border-b border-gray-200">{client.name}</td>
//                   <td className="py-2 px-4 border-b border-gray-200">{client.address}</td>
//                   <td className="py-2 px-4 border-b border-gray-200">{client.email}</td>
//                   <td className="py-2 px-4 border-b border-gray-200">{client.license_to}</td>
//                   <td className="py-2 px-4 border-b border-gray-200">{client.license_from}</td>
//                   <td className="py-2 px-4 border-b border-gray-200">{client.is_active ? 'Yes' : 'No'}</td>
//                   <td className="py-2 px-4 border-b border-gray-200">
//                     <div className="flex space-x-2">
//                       <button
//                         onClick={() => handleDelete(client.id)}
//                         className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </main>
//     </div>
//   );
// }


// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/router';

// export default function AddClient() {
//   const [clients, setClients] = useState([]);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchClients = async () => {
//       try {
//         const response = await axios.get('/api/add-clients-backend');
//         setClients(response.data);
//       } catch (error) {
//         console.error('Error fetching clients:', error);
//       }
//     };

//     fetchClients();
//   }, []);

//   const handleAddClient = () => {
//     router.push('/add-client-form');
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`/api/clients/${id}`);
//       setClients(clients.filter(client => client.id !== id));
//       alert('Client deleted successfully');
//     } catch (error) {
//       console.error('Error deleting client:', error);
//       alert('Error deleting client');
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gray-100">
//       <header className="bg-blue-500 text-white text-center py-4 shadow-md">
//         <h1 className="text-3xl font-bold">Client Management</h1>
//       </header>
//       <main className="flex flex-col items-center justify-center flex-grow p-8 fade-in">
//         <button
//           onClick={handleAddClient}
//           className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 mb-6"
//         >
//           Add New Client
//         </button>
//         <h2 className="text-2xl font-bold mb-4">Clients</h2>
//         <div className="w-full overflow-x-auto">
//           <table className="min-w-full bg-white">
//             <thead>
//               <tr>
//                 <th className="py-2 px-4 border-b border-gray-200">Name</th>
//                 <th className="py-2 px-4 border-b border-gray-200">Address</th>
//                 <th className="py-2 px-4 border-b border-gray-200">Email</th>
//                 <th className="py-2 px-4 border-b border-gray-200">License To</th>
//                 <th className="py-2 px-4 border-b border-gray-200">License From</th>
//                 <th className="py-2 px-4 border-b border-gray-200">Active</th>
//                 <th className="py-2 px-4 border-b border-gray-200">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {clients.map((client) => (
//                 <tr key={client.id} className="hover:bg-gray-100 transition duration-300">
//                   <td className="py-2 px-4 border-b border-gray-200">{client.name}</td>
//                   <td className="py-2 px-4 border-b border-gray-200">{client.address}</td>
//                   <td className="py-2 px-4 border-b border-gray-200">{client.email}</td>
//                   <td className="py-2 px-4 border-b border-gray-200">{client.license_to}</td>
//                   <td className="py-2 px-4 border-b border-gray-200">{client.license_from}</td>
//                   <td className="py-2 px-4 border-b border-gray-200">{client.is_active ? 'Yes' : 'No'}</td>
//                   <td className="py-2 px-4 border-b border-gray-200">
//                     <div className="flex space-x-2">
//                       <button
//                         onClick={() => handleDelete(client.id)}
//                         className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </main>
//     </div>
//   );
// }









import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default function AddClient() {
  const [clients, setClients] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('/api/add-clients-backend');
        setClients(response.data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, []);

  const handleAddClient = () => {
    router.push('/add-client-form');
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/clients/${id}`);
      setClients(clients.filter(client => client.id !== id));
      alert('Client deleted successfully');
    } catch (error) {
      console.error('Error deleting client:', error);
      alert('Error deleting client');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-blue-600 text-white flex justify-between items-center py-6 px-10 shadow-lg">
        <h1 className="text-4xl font-extrabold">Client Management</h1>
        <button
          onClick={handleAddClient}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105 flex items-center space-x-2"
        >
          <FontAwesomeIcon icon={faPlus} />
          <span>Add New Client</span>
        </button>
      </header>
      <main className="flex flex-col items-center justify-center flex-grow p-10 fade-in">
        <h2 className="text-3xl font-semibold mb-6">Clients</h2>
        <div className="w-full overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Address</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">License To</th>
                <th className="py-3 px-6 text-left">License From</th>
                <th className="py-3 px-6 text-left">Active</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {clients.map((client) => (
                <tr key={client.id} className="border-b border-gray-200 hover:bg-gray-100 transition duration-300">
                  <td className="py-3 px-6 text-left">{client.name}</td>
                  <td className="py-3 px-6 text-left">{client.address}</td>
                  <td className="py-3 px-6 text-left">{client.email}</td>
                  <td className="py-3 px-6 text-left">{client.license_to}</td>
                  <td className="py-3 px-6 text-left">{client.license_from}</td>
                  <td className="py-3 px-6 text-left">{client.is_active ? 'Yes' : 'No'}</td>
                  <td className="py-3 px-6 text-left">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleDelete(client.id)}
                        className="px-3 py-2 bg-red-500 text-white rounded shadow hover:bg-red-700 transition duration-300 transform hover:scale-105"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
