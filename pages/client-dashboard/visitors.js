// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import VisitorModal from '../VisitorModal';
// import { jsPDF } from 'jspdf';
// import { useRouter } from 'next/router';

// export default function Visitors() {
//   const [visitors, setVisitors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       router.push('/login');
//     } else {
//       fetchVisitors(token);
//     }
//   }, []);

//   const fetchVisitors = async (token) => {
//     try {
//       const response = await axios.get('/api/visitors', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setVisitors(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching visitors:', error);
//       setLoading(false);
//     }
//   };

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const printVisitorInfo = (visitor) => {
//     const doc = new jsPDF();
//     doc.text('Visitor Info', 10, 10);
//     doc.text(`Name: ${visitor.name}`, 10, 20);
//     doc.text(`Email: ${visitor.email}`, 10, 30);
//     doc.text(`Phone: ${visitor.phone}`, 10, 40);
//     doc.text(`Purpose: ${visitor.purpose}`, 10, 50);
//     doc.text(`Coming From: ${visitor.coming_from}`, 10, 60);
//     doc.text(`ID Type: ${visitor.id_type}`, 10, 70);
//     doc.text(`Visitor ID: ${visitor.visitor_id}`, 10, 80);
//     doc.text(`Check-In Time: ${visitor.check_in_time}`, 10, 90);
//     doc.text(`Check-Out Time: ${visitor.check_out_time}`, 10, 100);
//     doc.save('visitor-info.pdf');
//   };

//   const markCheckoutTime = async (visitorId) => {
//     const token = localStorage.getItem('token');
//     try {
//       const response = await axios.put(`/api/visitors/${visitorId}`, { checkOutTime: new Date().toISOString() }, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (response.status === 200) {
//         setVisitors(visitors.map(visitor => visitor.id === visitorId ? { ...visitor, check_out_time: new Date().toISOString() } : visitor));
//         alert('Check-out time marked successfully');
//       } else {
//         alert('Failed to mark check-out time');
//       }
//     } catch (error) {
//       console.error('Error marking check-out time:', error);
//       alert('Error marking check-out time');
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Visitor Registration</h1>
//       <button onClick={openModal} className="bg-blue-500 text-white p-2 rounded mb-4">Add Visitor</button>
//       <VisitorModal isOpen={isModalOpen} onClose={closeModal} />
//       <h2 className="text-xl font-bold mb-4">Visitors List</h2>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <table className="min-w-full bg-white border border-gray-200">
//           <thead>
//             <tr>
//               <th className="py-2 px-4 border-b border-gray-300">ID</th>
//               <th className="py-2 px-4 border-b border-gray-300">Name</th>
//               <th className="py-2 px-4 border-b border-gray-300">Email</th>
//               <th className="py-2 px-4 border-b border-gray-300">Phone</th>
//               <th className="py-2 px-4 border-b border-gray-300">Purpose</th>
//               <th className="py-2 px-4 border-b border-gray-300">Coming From</th>
//               <th className="py-2 px-4 border-b border-gray-300">ID Type</th>
//               <th className="py-2 px-4 border-b border-gray-300">Visitor ID</th>
//               <th className="py-2 px-4 border-b border-gray-300">Check-In Time</th>
//               <th className="py-2 px-4 border-b border-gray-300">Check-Out Time</th>
//               <th className="py-2 px-4 border-b border-gray-300">Photo</th>
//               <th className="py-2 px-4 border-b border-gray-300">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {visitors.map((visitor, index) => (
//               <tr key={index}>
//                 <td className="py-2 px-4 border-b border-gray-300">{visitor.id}</td>
//                 <td className="py-2 px-4 border-b border-gray-300">{visitor.name}</td>
//                 <td className="py-2 px-4 border-b border-gray-300">{visitor.email}</td>
//                 <td className="py-2 px-4 border-b border-gray-300">{visitor.phone}</td>
//                 <td className="py-2 px-4 border-b border-gray-300">{visitor.purpose}</td>
//                 <td className="py-2 px-4 border-b border-gray-300">{visitor.coming_from}</td>
//                 <td className="py-2 px-4 border-b border-gray-300">{visitor.id_type}</td>
//                 <td className="py-2 px-4 border-b border-gray-300">{visitor.visitor_id}</td>
//                 <td className="py-2 px-4 border-b border-gray-300">{visitor.check_in_time}</td>
//                 <td className="py-2 px-4 border-b border-gray-300">{visitor.check_out_time}</td>
//                 <td className="py-2 px-4 border-b border-gray-300">
//                   {visitor.photo && <img src={visitor.photo} alt="Visitor" width={50} />}
//                 </td>
//                 <td className="py-2 px-4 border-b border-gray-300">
//                   <button onClick={() => printVisitorInfo(visitor)} className="bg-green-500 text-white p-1 rounded mr-2">Print PDF</button>
//                   <button onClick={() => markCheckoutTime(visitor.id)} className="bg-red-500 text-white p-1 rounded">Mark Check-Out</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import VisitorModal from '../VisitorModal';
// import { jsPDF } from 'jspdf';
// import { useRouter } from 'next/router';

// export default function Visitors() {
//   const [visitors, setVisitors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       router.push('/login');
//     } else {
//       fetchVisitors(token);
//     }
//   }, []);

//   const fetchVisitors = async (token) => {
//     try {
//       const response = await axios.get('/api/visitors', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setVisitors(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching visitors:', error);
//       setLoading(false);
//     }
//   };

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const printVisitorInfo = (visitor) => {
//     const doc = new jsPDF();
//     doc.text('Visitor Info', 10, 10);
//     doc.text(`Name: ${visitor.name}`, 10, 20);
//     doc.text(`Email: ${visitor.email}`, 10, 30);
//     doc.text(`Phone: ${visitor.phone}`, 10, 40);
//     doc.text(`Purpose: ${visitor.purpose}`, 10, 50);
//     doc.text(`Coming From: ${visitor.coming_from}`, 10, 60);
//     doc.text(`ID Type: ${visitor.id_type}`, 10, 70);
//     doc.text(`Visitor ID: ${visitor.visitor_id}`, 10, 80);
//     doc.text(`Check-In Time: ${visitor.check_in_time}`, 10, 90);
//     doc.text(`Check-Out Time: ${visitor.check_out_time}`, 10, 100);
//     doc.save('visitor-info.pdf');
//   };

//   const markCheckoutTime = async (visitorId) => {
//     const token = localStorage.getItem('token');
//     try {
//       const response = await axios.put(`/api/visitors/${visitorId}`, { checkOutTime: new Date().toISOString() }, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (response.status === 200) {
//         setVisitors(visitors.map(visitor => visitor.id === visitorId ? { ...visitor, check_out_time: new Date().toISOString() } : visitor));
//         alert('Check-out time marked successfully');
//       } else {
//         alert('Failed to mark check-out time');
//       }
//     } catch (error) {
//       console.error('Error marking check-out time:', error);
//       alert('Error marking check-out time');
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Visitor Registration</h1>
//       <button onClick={openModal} className="bg-blue-500 text-white p-2 rounded mb-4">Add Visitor</button>
//       <VisitorModal isOpen={isModalOpen} onClose={closeModal} fetchVisitors={fetchVisitors} />
//       <h2 className="text-xl font-bold mb-4">Visitors List</h2>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <table className="min-w-full bg-white border border-gray-200">
//           <thead>
//             <tr>
//               <th className="py-2 px-4 border-b border-gray-300">ID</th>
//               <th className="py-2 px-4 border-b border-gray-300">Name</th>
//               <th className="py-2 px-4 border-b border-gray-300">Email</th>
//               <th className="py-2 px-4 border-b border-gray-300">Phone</th>
//               <th className="py-2 px-4 border-b border-gray-300">Purpose</th>
//               <th className="py-2 px-4 border-b border-gray-300">Coming From</th>
//               <th className="py-2 px-4 border-b border-gray-300">ID Type</th>
//               <th className="py-2 px-4 border-b border-gray-300">Visitor ID</th>
//               <th className="py-2 px-4 border-b border-gray-300">Check-In Time</th>
//               <th className="py-2 px-4 border-b border-gray-300">Check-Out Time</th>
//               <th className="py-2 px-4 border-b border-gray-300">Photo</th>
//               <th className="py-2 px-4 border-b border-gray-300">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {visitors.map((visitor, index) => (
//               <tr key={index}>
//                 <td className="py-2 px-4 border-b border-gray-300">{visitor.id}</td>
//                 <td className="py-2 px-4 border-b border-gray-300">{visitor.name}</td>
//                 <td className="py-2 px-4 border-b border-gray-300">{visitor.email}</td>
//                 <td className="py-2 px-4 border-b border-gray-300">{visitor.phone}</td>
//                 <td className="py-2 px-4 border-b border-gray-300">{visitor.purpose}</td>
//                 <td className="py-2 px-4 border-b border-gray-300">{visitor.coming_from}</td>
//                 <td className="py-2 px-4 border-b border-gray-300">{visitor.id_type}</td>
//                 <td className="py-2 px-4 border-b border-gray-300">{visitor.visitor_id}</td>
//                 <td className="py-2 px-4 border-b border-gray-300">{visitor.check_in_time}</td>
//                 <td className="py-2 px-4 border-b border-gray-300">{visitor.check_out_time}</td>
//                 <td className="py-2 px-4 border-b border-gray-300">
//                   {visitor.photo && <img src={visitor.photo} alt="Visitor" width={50} />}
//                 </td>
//                 <td className="py-2 px-4 border-b border-gray-300">
//                   <button onClick={() => printVisitorInfo(visitor)} className="bg-green-500 text-white p-1 rounded mr-2">Print PDF</button>
//                   <button onClick={() => markCheckoutTime(visitor.id)} className="bg-red-500 text-white p-1 rounded">Mark Check-Out</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import VisitorModal from '../VisitorModal';
// import { jsPDF } from 'jspdf';
// import { useRouter } from 'next/router';

// export default function Visitors() {
//   const [visitors, setVisitors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       router.push('/login');
//     } else {
//       fetchVisitors(token);
//     }
//   }, []);

//   const fetchVisitors = async (token) => {
//     try {
//       const response = await axios.get('/api/visitors', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setVisitors(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching visitors:', error);
//       setLoading(false);
//     }
//   };

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const printVisitorInfo = (visitor) => {
//     const doc = new jsPDF();
//     doc.text('Visitor Info', 10, 10);
//     doc.text(`Name: ${visitor.name}`, 10, 20);
//     doc.text(`Email: ${visitor.email}`, 10, 30);
//     doc.text(`Phone: ${visitor.phone}`, 10, 40);
//     doc.text(`Purpose: ${visitor.purpose}`, 10, 50);
//     doc.text(`Coming From: ${visitor.coming_from}`, 10, 60);
//     doc.text(`ID Type: ${visitor.id_type}`, 10, 70);
//     doc.text(`Visitor ID: ${visitor.visitor_id}`, 10, 80);
//     doc.text(`Check-In Time: ${visitor.check_in_time}`, 10, 90);
//     doc.text(`Check-Out Time: ${visitor.check_out_time}`, 10, 100);
//     const fileName = `${visitor.name.replace(/ /g, '_')}_${visitor.visitor_id}.pdf`;
//     doc.save(fileName);
//   };

//   const markCheckoutTime = async (visitorId) => {
//     const token = localStorage.getItem('token');
//     try {
//       const response = await axios.put(`/api/visitors/${visitorId}`, { checkOutTime: new Date().toISOString() }, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (response.status === 200) {
//         setVisitors(visitors.map(visitor => visitor.id === visitorId ? { ...visitor, check_out_time: new Date().toISOString() } : visitor));
//         alert('Check-out time marked successfully');
//       } else {
//         alert('Failed to mark check-out time');
//       }
//     } catch (error) {
//       console.error('Error marking check-out time:', error);
//       alert('Error marking check-out time');
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">Visitor Registration</h1>
//         <button onClick={openModal} className="bg-blue-500 text-white p-2 rounded">Add Visitor</button>
//       </div>
//       <VisitorModal isOpen={isModalOpen} onClose={closeModal} fetchVisitors={fetchVisitors} />
//       <h2 className="text-xl font-bold mb-4">Visitors List</h2>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div className="space-y-4">
//           {visitors.map((visitor, index) => (
//             <div key={index} className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center border border-gray-200">
//               <div className="flex items-center space-x-4">
//                 {visitor.photo && <img src={visitor.photo} alt="Visitor" className="w-16 h-16 rounded-full" />}
//                 <div>
//                   <h3 className="text-lg font-bold">{visitor.name}</h3>
//                   <p className="text-sm text-gray-600">Email: {visitor.email}</p>
//                   <p className="text-sm text-gray-600">Phone: {visitor.phone}</p>
//                   <p className="text-sm text-gray-600">Purpose: {visitor.purpose}</p>
//                   <p className="text-sm text-gray-600">Coming From: {visitor.coming_from}</p>
//                   <p className="text-sm text-gray-600">ID Type: {visitor.id_type}</p>
//                   <p className="text-sm text-gray-600">Visitor ID: {visitor.visitor_id}</p>
//                   <p className="text-sm text-gray-600">Check-In: {visitor.check_in_time}</p>
//                   <p className="text-sm text-gray-600">Check-Out: {visitor.check_out_time}</p>
//                 </div>
//               </div>
//               <div className="flex space-x-2">
//                 <button onClick={() => printVisitorInfo(visitor)} className="border border-gray-500 text-gray-500 p-2 rounded">Print PDF</button>
//                 <button onClick={() => markCheckoutTime(visitor.id)} className="border border-gray-500 text-gray-500 p-2 rounded">Mark Check-Out</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import VisitorModal from '../VisitorModal';
// import { jsPDF } from 'jspdf';
// import { useRouter } from 'next/router';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus } from '@fortawesome/free-solid-svg-icons';

// const Spinner = () => {
//   return (
//     <div className="flex justify-center items-center">
//       <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
//     </div>
//   );
// };

// export default function Visitors() {
//   const [visitors, setVisitors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       router.push('/login');
//     } else {
//       fetchVisitors(token);
//     }
//   }, []);

//   const fetchVisitors = async (token) => {
//     try {
//       const response = await axios.get('/api/visitors', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setVisitors(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching visitors:', error);
//       setLoading(false);
//     }
//   };

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const printVisitorInfo = (visitor) => {
//     const doc = new jsPDF();
//     doc.text('Visitor Info', 10, 10);
//     doc.text(`Name: ${visitor.name}`, 10, 20);
//     doc.text(`Email: ${visitor.email}`, 10, 30);
//     doc.text(`Phone: ${visitor.phone}`, 10, 40);
//     doc.text(`Purpose: ${visitor.purpose}`, 10, 50);
//     doc.text(`Coming From: ${visitor.coming_from}`, 10, 60);
//     doc.text(`ID Type: ${visitor.id_type}`, 10, 70);
//     doc.text(`Visitor ID: ${visitor.visitor_id}`, 10, 80);
//     doc.text(`Check-In Time: ${visitor.check_in_time}`, 10, 90);
//     doc.text(`Check-Out Time: ${visitor.check_out_time}`, 10, 100);
//     const fileName = `${visitor.name.replace(/ /g, '_')}_${visitor.visitor_id}.pdf`;
//     doc.save(fileName);
//   };

//   const markCheckoutTime = async (visitorId) => {
//     const token = localStorage.getItem('token');
//     try {
//       const response = await axios.put(`/api/visitors/${visitorId}`, { checkOutTime: new Date().toISOString() }, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (response.status === 200) {
//         setVisitors(visitors.map(visitor => visitor.id === visitorId ? { ...visitor, check_out_time: new Date().toISOString() } : visitor));
//         alert('Check-out time marked successfully');
//       } else {
//         alert('Failed to mark check-out time');
//       }
//     } catch (error) {
//       console.error('Error marking check-out time:', error);
//       alert('Error marking check-out time');
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <nav className="bg-gray-800 p-4 rounded mb-4 flex justify-between items-center">
//         <h1 className="text-white text-2xl font-bold">Visitor Registration</h1>
//         <button onClick={openModal} className="bg-blue-500 text-white p-2 rounded flex items-center">
//           <FontAwesomeIcon icon={faPlus} className="mr-2" />
//           Add Visitor
//         </button>
//       </nav>
//       <VisitorModal isOpen={isModalOpen} onClose={closeModal} fetchVisitors={fetchVisitors} />
//       <h2 className="text-xl font-bold mb-4">Visitors List</h2>
//       {loading ? (
//         <Spinner />
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white">
//             <thead>
//               <tr className="w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
//                 <th className="py-3 px-4 text-left">ID</th>
//                 <th className="py-3 px-4 text-left">Visitor Details</th>
//                 <th className="py-3 px-4 text-left">Coming From</th>
//                 <th className="py-3 px-4 text-left">ID Type</th>
//                 <th className="py-3 px-4 text-left">Visitor ID</th>
//                 <th className="py-3 px-4 text-left">Purpose</th>
//                 <th className="py-3 px-4 text-left">Checked-In</th>
//                 <th className="py-3 px-4 text-left">Checked-Out</th>
//                 <th className="py-3 px-4 text-left">Action</th>
//               </tr>
//             </thead>
//             <tbody className="text-gray-600 text-sm font-light">
//               {visitors.map((visitor, index) => (
//                 <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
//                   <td className="py-3 px-4 text-left">{visitor.id}</td>
//                   <td className="py-3 px-4 text-left">
//                     <div className="flex items-center">
//                       {visitor.photo && <img src={visitor.photo} alt="Visitor" className="w-12 h-12 rounded-md mr-4" />}
//                       <div>
//                         <h3 className="text-lg font-bold">{visitor.name}</h3>
//                         <p className="text-sm text-gray-600">{visitor.phone}</p>
//                         <p className="text-sm text-gray-600">{visitor.purpose}</p>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="py-3 px-4 text-left">{visitor.coming_from}</td>
//                   <td className="py-3 px-4 text-left">{visitor.id_type}</td>
//                   <td className="py-3 px-4 text-left">{visitor.visitor_id}</td>
//                   <td className="py-3 px-4 text-left">{visitor.purpose}</td>
//                   <td className="py-3 px-4 text-left">{new Date(visitor.check_in_time).toLocaleString()}</td>
//                   <td className="py-3 px-4 text-left">{visitor.check_out_time ? new Date(visitor.check_out_time).toLocaleString() : 'N/A'}</td>
//                   <td className="py-3 px-4 text-left">
//                     <div className="flex space-x-2">
//                       <button onClick={() => markCheckoutTime(visitor.id)} className="bg-blue-500 text-white p-2 rounded">Check Out</button>
//                       <button onClick={() => printVisitorInfo(visitor)} className="bg-gray-500 text-white p-2 rounded">Print</button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }
// 23july. 2024

//E:\super_admin\new_pro\pages\client-dashboard\visitors.js
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import VisitorModal from '../VisitorModal';
// import { jsPDF } from 'jspdf';
// import { useRouter } from 'next/router';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus } from '@fortawesome/free-solid-svg-icons';

// const Spinner = () => {
//   return (
//     <div className="flex justify-center items-center">
//       <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
//     </div>
//   );
// };

// export default function Visitors() {
//   const [visitors, setVisitors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       router.push('/login');
//     } else {
//       fetchVisitors(token);
//     }
//   }, []);

//   const fetchVisitors = async (token) => {
//     try {
//       const response = await axios.get('/api/visitors', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setVisitors(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching visitors:', error);
//       setLoading(false);
//     }
//   };

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const printVisitorInfo = (visitor) => {
//     const doc = new jsPDF();
//     doc.text('Visitor Info', 10, 10);
//     doc.text(`Name: ${visitor.name}`, 10, 20);
//     doc.text(`Email: ${visitor.email}`, 10, 30);
//     doc.text(`Phone: ${visitor.phone}`, 10, 40);
//     doc.text(`Purpose: ${visitor.purpose}`, 10, 50);
//     doc.text(`Coming From: ${visitor.coming_from}`, 10, 60);
//     doc.text(`ID Type: ${visitor.id_type}`, 10, 70);
//     doc.text(`Visitor ID: ${visitor.visitor_id}`, 10, 80);
//     doc.text(`Check-In Time: ${visitor.check_in_time}`, 10, 90);
//     doc.text(`Check-Out Time: ${visitor.check_out_time}`, 10, 100);
//     const fileName = `${visitor.name.replace(/ /g, '_')}_${visitor.visitor_id}.pdf`;
//     doc.save(fileName);
//   };

//   const markCheckoutTime = async (visitorId) => {
//     const token = localStorage.getItem('token');
//     try {
//       const response = await axios.put(`/api/visitors/${visitorId}`, { checkOutTime: new Date().toISOString() }, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (response.status === 200) {
//         setVisitors(visitors.map(visitor => visitor.id === visitorId ? { ...visitor, check_out_time: new Date().toISOString() } : visitor));
//         alert('Check-out time marked successfully');
//       } else {
//         alert('Failed to mark check-out time');
//       }
//     } catch (error) {
//       console.error('Error marking check-out time:', error);
//       alert('Error marking check-out time');
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <nav className="bg-gray-800 p-4 rounded mb-4 flex justify-between items-center">
//         <h1 className="text-white text-2xl font-bold">Visitor Registration</h1>
//         <button onClick={openModal} className="bg-blue-500 text-white p-2 rounded flex items-center">
//           <FontAwesomeIcon icon={faPlus} className="mr-2" />
//           Add Visitor
//         </button>
//       </nav>
//       <VisitorModal isOpen={isModalOpen} onClose={closeModal} fetchVisitors={fetchVisitors} />
//       <h2 className="text-xl font-bold mb-4">Visitors List</h2>
//       {loading ? (
//         <Spinner />
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white">
//             <thead>
//               <tr className="w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
//                 <th className="py-3 px-4 text-left">ID</th>
//                 <th className="py-3 px-4 text-left">Visitor Details</th>
//                 <th className="py-3 px-4 text-left">Coming From</th>
//                 <th className="py-3 px-4 text-left">ID Type</th>
//                 <th className="py-3 px-4 text-left">Visitor ID</th>
//                 <th className="py-3 px-4 text-left">Purpose</th>
//                 <th className="py-3 px-4 text-left">Checked-In</th>
//                 <th className="py-3 px-4 text-left">Checked-Out</th>
//                 <th className="py-3 px-4 text-left">Action</th>
//               </tr>
//             </thead>
//             <tbody className="text-gray-600 text-sm font-light">
//               {visitors.map((visitor, index) => (
//                 <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
//                   <td className="py-3 px-4 text-left">{visitor.id}</td>
//                   <td className="py-3 px-4 text-left">
//                     <div className="flex items-center">
//                       {visitor.photo && <img src={visitor.photo} alt="Visitor" className="w-12 h-12 rounded-md mr-4" />}
//                       <div>
//                         <h3 className="text-lg font-bold">{visitor.name}</h3>
//                         <p className="text-sm text-gray-600">{visitor.phone}</p>
//                         <p className="text-sm text-gray-600">{visitor.purpose}</p>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="py-3 px-4 text-left">{visitor.coming_from}</td>
//                   <td className="py-3 px-4 text-left">{visitor.id_type}</td>
//                   <td className="py-3 px-4 text-left">{visitor.visitor_id}</td>
//                   <td className="py-3 px-4 text-left">{visitor.purpose}</td>
//                   <td className="py-3 px-4 text-left">{new Date(visitor.check_in_time).toLocaleString()}</td>
//                   <td className="py-3 px-4 text-left">{visitor.check_out_time ? new Date(visitor.check_out_time).toLocaleString() : 'N/A'}</td>
//                   <td className="py-3 px-4 text-left">
//                     <div className="flex space-x-2">
//                       <button onClick={() => markCheckoutTime(visitor.id)} className="bg-blue-500 text-white p-2 rounded">Check Out</button>
//                       <button onClick={() => printVisitorInfo(visitor)} className="bg-gray-500 text-white p-2 rounded">Print</button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }


import { useState, useEffect } from 'react';
import axios from 'axios';
import VisitorModal from '../VisitorModal';
import { jsPDF } from 'jspdf';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faWhatsapp } from '@fortawesome/free-solid-svg-icons';

const Spinner = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
};

export default function Visitors() {
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      fetchVisitors(token);
    }
  }, []);

  const fetchVisitors = async (token) => {
    try {
      const response = await axios.get('/api/visitors', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setVisitors(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching visitors:', error);
      setLoading(false);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const printVisitorInfo = (visitor) => {
    const doc = new jsPDF();
    doc.text('Visitor Info', 10, 10);
    doc.text(`Name: ${visitor.name}`, 10, 20);
    doc.text(`Email: ${visitor.email}`, 10, 30);
    doc.text(`Phone: ${visitor.phone}`, 10, 40);
    doc.text(`Purpose: ${visitor.purpose}`, 10, 50);
    doc.text(`Coming From: ${visitor.coming_from}`, 10, 60);
    doc.text(`ID Type: ${visitor.id_type}`, 10, 70);
    doc.text(`Visitor ID: ${visitor.visitor_id}`, 10, 80);
    doc.text(`Check-In Time: ${visitor.check_in_time}`, 10, 90);
    doc.text(`Check-Out Time: ${visitor.check_out_time}`, 10, 100);
    const fileName = `${visitor.name.replace(/ /g, '_')}_${visitor.visitor_id}.pdf`;
    doc.save(fileName);
  };

  const markCheckoutTime = async (visitorId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(`/api/visitors/${visitorId}`, { checkOutTime: new Date().toISOString() }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setVisitors(visitors.map(visitor => visitor.id === visitorId ? { ...visitor, check_out_time: new Date().toISOString() } : visitor));
        alert('Check-out time marked successfully');
      } else {
        alert('Failed to mark check-out time');
      }
    } catch (error) {
      console.error('Error marking check-out time:', error);
      alert('Error marking check-out time');
    }
  };

  const sendWhatsAppMessage = (visitor) => {
    const visitorId = visitor.id;
    const visitorName = visitor.name;
    const visitorMobile = "+91" + visitor.phone;

    // Construct the absolute URL for the Visitor's Pass PDF
    const root = location.protocol + "//" + location.host;
    const passUrl = `${root}/api/generate-pdf?id=${visitorId}`; // Update to the correct URL path

    // Construct the WhatsApp message
    const message = `Hello ${visitorName},\nYour Visitor Pass is ready. Please click the link below to view your pass:\n${passUrl}`;

    // Construct the WhatsApp URL
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${visitorMobile}&text=${encodeURIComponent(message)}`;

    // Open the WhatsApp URL in a new tab
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="container mx-auto p-4">
      <nav className="bg-gray-800 p-4 rounded mb-4 flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Visitor Registration</h1>
        <button onClick={openModal} className="bg-blue-500 text-white p-2 rounded flex items-center">
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Add Visitor
        </button>
      </nav>
      <VisitorModal isOpen={isModalOpen} onClose={closeModal} fetchVisitors={fetchVisitors} />
      <h2 className="text-xl font-bold mb-4">Visitors List</h2>
      {loading ? (
        <Spinner />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Visitor Details</th>
                <th className="py-3 px-4 text-left">Coming From</th>
                <th className="py-3 px-4 text-left">ID Type</th>
                <th className="py-3 px-4 text-left">Visitor ID</th>
                <th className="py-3 px-4 text-left">Purpose</th>
                <th className="py-3 px-4 text-left">Checked-In</th>
                <th className="py-3 px-4 text-left">Checked-Out</th>
                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {visitors.map((visitor, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-4 text-left">{visitor.id}</td>
                  <td className="py-3 px-4 text-left">
                    <div className="flex items-center">
                      {visitor.photo && <img src={visitor.photo} alt="Visitor" className="w-12 h-12 rounded-md mr-4" />}
                      <div>
                        <h3 className="text-lg font-bold">{visitor.name}</h3>
                        <p className="text-sm text-gray-600">{visitor.phone}</p>
                        <p className="text-sm text-gray-600">{visitor.purpose}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-left">{visitor.coming_from}</td>
                  <td className="py-3 px-4 text-left">{visitor.id_type}</td>
                  <td className="py-3 px-4 text-left">{visitor.visitor_id}</td>
                  <td className="py-3 px-4 text-left">{visitor.purpose}</td>
                  <td className="py-3 px-4 text-left">{new Date(visitor.check_in_time).toLocaleString()}</td>
                  <td className="py-3 px-4 text-left">{visitor.check_out_time ? new Date(visitor.check_out_time).toLocaleString() : 'N/A'}</td>
                  <td className="py-3 px-4 text-left">
                    <div className="flex space-x-2">
                      <button onClick={() => markCheckoutTime(visitor.id)} className="bg-blue-500 text-white p-2 rounded">Check Out</button>
                      <button onClick={() => printVisitorInfo(visitor)} className="bg-gray-500 text-white p-2 rounded">Print</button>
                      <button onClick={() => sendWhatsAppMessage(visitor)} className="bg-green-500 text-white p-2 rounded flex items-center">
                        <FontAwesomeIcon icon={faWhatsapp} className="mr-2" />
                        WhatsApp
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
