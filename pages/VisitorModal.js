// // import { useState, useRef } from 'react';
// // import Webcam from 'react-webcam';
// // import axios from 'axios';

// // export default function VisitorModal({ isOpen, onClose }) {
// //   const webcamRef = useRef(null);
// //   const [formData, setFormData] = useState({
// //     name: '',
// //     email: '',
// //     phone: '',
// //     purpose: '',
// //     comingFrom: '',
// //     idType: '',
// //     visitorId: '',
// //     checkInTime: '',
// //     checkOutTime: '',
// //     photo: '',
// //   });

// //   const capturePhoto = () => {
// //     const imageSrc = webcamRef.current.getScreenshot();
// //     if (imageSrc) {
// //       const img = new Image();
// //       img.src = imageSrc;

// //       img.onload = () => {
// //         const canvas = document.createElement('canvas');
// //         const MAX_WIDTH = 320;
// //         const MAX_HEIGHT = 240;
// //         let width = img.width;
// //         let height = img.height;

// //         // Calculate the new dimensions while maintaining aspect ratio
// //         if (width > height) {
// //           if (width > MAX_WIDTH) {
// //             height *= MAX_WIDTH / width;
// //             width = MAX_WIDTH;
// //           }
// //         } else {
// //           if (height > MAX_HEIGHT) {
// //             width *= MAX_HEIGHT / height;
// //             height = MAX_HEIGHT;
// //           }
// //         }

// //         canvas.width = width;
// //         canvas.height = height;
// //         const ctx = canvas.getContext('2d');
// //         ctx.drawImage(img, 0, 0, width, height);
// //         const resizedImage = canvas.toDataURL('image/jpeg');
// //         setFormData({ ...formData, photo: resizedImage });
// //       };
// //     }
// //   };

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData({ ...formData, [name]: value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const response = await axios.post('/api/visitors', formData);
// //       if (response.status === 201) {
// //         alert('Visitor added successfully');
// //         onClose();
// //       } else {
// //         alert('Failed to add visitor');
// //       }
// //     } catch (error) {
// //       console.error('Error submitting form:', error);
// //       alert(`Error submitting form: ${error.response ? error.response.data.message : error.message}`);
// //     }
// //   };

// //   if (!isOpen) return null;

// //   return (
// //     <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
// //       <div className="bg-white p-4 rounded-lg shadow-lg max-w-2xl w-full max-h-screen overflow-y-auto">
// //         <h2 className="text-2xl mb-4">Add Visitor</h2>
// //         <form onSubmit={handleSubmit} className="space-y-4">
// //           <div className="grid grid-cols-2 gap-4">
// //             <div>
// //               <label className="block mb-2">Name</label>
// //               <input
// //                 type="text"
// //                 name="name"
// //                 value={formData.name}
// //                 onChange={handleChange}
// //                 className="p-2 border border-gray-300 rounded w-full"
// //                 required
// //               />
// //             </div>
// //             <div>
// //               <label className="block mb-2">Email</label>
// //               <input
// //                 type="email"
// //                 name="email"
// //                 value={formData.email}
// //                 onChange={handleChange}
// //                 className="p-2 border border-gray-300 rounded w-full"
// //                 required
// //               />
// //             </div>
// //             <div>
// //               <label className="block mb-2">Phone</label>
// //               <input
// //                 type="text"
// //                 name="phone"
// //                 value={formData.phone}
// //                 onChange={handleChange}
// //                 className="p-2 border border-gray-300 rounded w-full"
// //                 required
// //               />
// //             </div>
// //             <div>
// //               <label className="block mb-2">Purpose</label>
// //               <input
// //                 type="text"
// //                 name="purpose"
// //                 value={formData.purpose}
// //                 onChange={handleChange}
// //                 className="p-2 border border-gray-300 rounded w-full"
// //                 required
// //               />
// //             </div>
// //             <div>
// //               <label className="block mb-2">Coming From</label>
// //               <input
// //                 type="text"
// //                 name="comingFrom"
// //                 value={formData.comingFrom}
// //                 onChange={handleChange}
// //                 className="p-2 border border-gray-300 rounded w-full"
// //                 required
// //               />
// //             </div>
// //             <div>
// //               <label className="block mb-2">ID Type</label>
// //               <input
// //                 type="text"
// //                 name="idType"
// //                 value={formData.idType}
// //                 onChange={handleChange}
// //                 className="p-2 border border-gray-300 rounded w-full"
// //                 required
// //               />
// //             </div>
// //             <div>
// //               <label className="block mb-2">Visitor ID</label>
// //               <input
// //                 type="text"
// //                 name="visitorId"
// //                 value={formData.visitorId}
// //                 onChange={handleChange}
// //                 className="p-2 border border-gray-300 rounded w-full"
// //                 required
// //               />
// //             </div>
// //             <div>
// //               <label className="block mb-2">Check-In Time</label>
// //               <input
// //                 type="datetime-local"
// //                 name="checkInTime"
// //                 value={formData.checkInTime}
// //                 onChange={handleChange}
// //                 className="p-2 border border-gray-300 rounded w-full"
// //                 required
// //               />
// //             </div>
// //             <div>
// //               <label className="block mb-2">Check-Out Time</label>
// //               <input
// //                 type="datetime-local"
// //                 name="checkOutTime"
// //                 value={formData.checkOutTime}
// //                 onChange={handleChange}
// //                 className="p-2 border border-gray-300 rounded w-full"
// //                 required
// //               />
// //             </div>
// //           </div>
// //           <div className="my-4">
// //             <Webcam
// //               audio={false}
// //               ref={webcamRef}
// //               screenshotFormat="image/jpeg"
// //               width={240} // Reduced width for better fit
// //               className="border border-gray-300 rounded"
// //             />
// //             <button
// //               type="button"
// //               onClick={capturePhoto}
// //               className="bg-blue-500 text-white p-2 rounded mt-2"
// //             >
// //               Capture Photo
// //             </button>
// //           </div>
// //           <div className="flex justify-end space-x-4">
// //             <button
// //               type="button"
// //               onClick={onClose}
// //               className="bg-gray-500 text-white p-2 rounded"
// //             >
// //               Cancel
// //             </button>
// //             <button type="submit" className="bg-blue-500 text-white p-2 rounded">
// //               Submit
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }
// import { useState, useRef } from 'react';
// import Webcam from 'react-webcam';
// import axios from 'axios';

// export default function VisitorModal({ isOpen, onClose }) {
//   const webcamRef = useRef(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     purpose: '',
//     comingFrom: '',
//     idType: '',
//     visitorId: '',
//     checkInTime: '',
//     checkOutTime: '',
//     photo: '',
//   });

//   const capturePhoto = () => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     if (imageSrc) {
//       const img = new Image();
//       img.src = imageSrc;

//       img.onload = () => {
//         const canvas = document.createElement('canvas');
//         const MAX_WIDTH = 320;
//         const MAX_HEIGHT = 240;
//         let width = img.width;
//         let height = img.height;

//         // Calculate the new dimensions while maintaining aspect ratio
//         if (width > height) {
//           if (width > MAX_WIDTH) {
//             height *= MAX_WIDTH / width;
//             width = MAX_WIDTH;
//           }
//         } else {
//           if (height > MAX_HEIGHT) {
//             width *= MAX_HEIGHT / height;
//             height = MAX_HEIGHT;
//           }
//         }

//         canvas.width = width;
//         canvas.height = height;
//         const ctx = canvas.getContext('2d');
//         ctx.drawImage(img, 0, 0, width, height);
//         const resizedImage = canvas.toDataURL('image/jpeg');
//         setFormData({ ...formData, photo: resizedImage });
//       };
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem('token');
//     try {
//       const response = await axios.post('/api/visitors', formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (response.status === 201) {
//         alert('Visitor added successfully');
//         onClose();
//       } else {
//         alert('Failed to add visitor');
//       }
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       alert(`Error submitting form: ${error.response ? error.response.data.message : error.message}`);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
//       <div className="bg-white p-4 rounded-lg shadow-lg max-w-2xl w-full max-h-screen overflow-y-auto">
//         <h2 className="text-2xl mb-4">Add Visitor</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block mb-2">Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="p-2 border border-gray-300 rounded w-full"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block mb-2">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="p-2 border border-gray-300 rounded w-full"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block mb-2">Phone</label>
//               <input
//                 type="text"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 className="p-2 border border-gray-300 rounded w-full"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block mb-2">Purpose</label>
//               <input
//                 type="text"
//                 name="purpose"
//                 value={formData.purpose}
//                 onChange={handleChange}
//                 className="p-2 border border-gray-300 rounded w-full"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block mb-2">Coming From</label>
//               <input
//                 type="text"
//                 name="comingFrom"
//                 value={formData.comingFrom}
//                 onChange={handleChange}
//                 className="p-2 border border-gray-300 rounded w-full"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block mb-2">ID Type</label>
//               <input
//                 type="text"
//                 name="idType"
//                 value={formData.idType}
//                 onChange={handleChange}
//                 className="p-2 border border-gray-300 rounded w-full"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block mb-2">Visitor ID</label>
//               <input
//                 type="text"
//                 name="visitorId"
//                 value={formData.visitorId}
//                 onChange={handleChange}
//                 className="p-2 border border-gray-300 rounded w-full"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block mb-2">Check-In Time</label>
//               <input
//                 type="datetime-local"
//                 name="checkInTime"
//                 value={formData.checkInTime}
//                 onChange={handleChange}
//                 className="p-2 border border-gray-300 rounded w-full"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block mb-2">Check-Out Time</label>
//               <input
//                 type="datetime-local"
//                 name="checkOutTime"
//                 value={formData.checkOutTime}
//                 onChange={handleChange}
//                 className="p-2 border border-gray-300 rounded w-full"
//                 required
//               />
//             </div>
//           </div>
//           <div className="my-4">
//             <Webcam
//               audio={false}
//               ref={webcamRef}
//               screenshotFormat="image/jpeg"
//               width={240} // Reduced width for better fit
//               className="border border-gray-300 rounded"
//             />
//             <button
//               type="button"
//               onClick={capturePhoto}
//               className="bg-blue-500 text-white p-2 rounded mt-2"
//             >
//               Capture Photo
//             </button>
//           </div>
//           <div className="flex justify-end space-x-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="bg-gray-500 text-white p-2 rounded"
//             >
//               Cancel
//             </button>
//             <button type="submit" className="bg-blue-500 text-white p-2 rounded">
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }



// import { useState, useRef } from 'react';
// import axios from 'axios';
// import Webcam from 'react-webcam';

// const VisitorModal = ({ isOpen, onClose, fetchVisitors }) => {
//   const webcamRef = useRef(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     purpose: '',
//     comingFrom: '',
//     idType: '',
//     visitorId: '',
//     checkInTime: '',
//     checkOutTime: '',
//     photo: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const capturePhoto = () => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     if (imageSrc) {
//       const img = new Image();
//       img.src = imageSrc;

//       img.onload = () => {
//         const canvas = document.createElement('canvas');
//         const MAX_WIDTH = 320;
//         const MAX_HEIGHT = 240;
//         let width = img.width;
//         let height = img.height;

//         if (width > height) {
//           if (width > MAX_WIDTH) {
//             height *= MAX_WIDTH / width;
//             width = MAX_WIDTH;
//           }
//         } else {
//           if (height > MAX_HEIGHT) {
//             width *= MAX_HEIGHT / height;
//             height = MAX_HEIGHT;
//           }
//         }

//         canvas.width = width;
//         canvas.height = height;
//         const ctx = canvas.getContext('2d');
//         ctx.drawImage(img, 0, 0, width, height);
//         const resizedImage = canvas.toDataURL('image/jpeg');
//         setFormData({ ...formData, photo: resizedImage });
//       };
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem('token');
//     console.log('Token retrieved:', token); // Debugging line to check token

//     if (!token) {
//       alert('No token found. Please log in again.');
//       return;
//     }

//     if (!formData.photo) {
//       alert('Please capture a photo before submitting the form.');
//       return;
//     }

//     console.log('Form data before submit:', formData); // Debugging line to check form data

//     try {
//       const response = await axios.post('/api/visitors', formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       console.log('Response:', response); // Debugging line to check response

//       if (response.status === 201) {
//         alert('Visitor added successfully');
//         onClose();
//         fetchVisitors(token); // Refresh the visitors list
//       } else {
//         alert('Failed to add visitor');
//       }
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       alert(`Error submitting form: ${error.response ? error.response.data.message : error.message}`);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
//       <div className="bg-white p-4 rounded-lg shadow-lg max-w-2xl w-full max-h-screen overflow-y-auto">
//         <h2 className="text-2xl mb-4">Add Visitor</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block mb-2">Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="p-2 border border-gray-300 rounded w-full"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block mb-2">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="p-2 border border-gray-300 rounded w-full"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block mb-2">Phone</label>
//               <input
//                 type="text"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 className="p-2 border border-gray-300 rounded w-full"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block mb-2">Purpose</label>
//               <input
//                 type="text"
//                 name="purpose"
//                 value={formData.purpose}
//                 onChange={handleChange}
//                 className="p-2 border border-gray-300 rounded w-full"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block mb-2">Coming From</label>
//               <input
//                 type="text"
//                 name="comingFrom"
//                 value={formData.comingFrom}
//                 onChange={handleChange}
//                 className="p-2 border border-gray-300 rounded w-full"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block mb-2">ID Type</label>
//               <input
//                 type="text"
//                 name="idType"
//                 value={formData.idType}
//                 onChange={handleChange}
//                 className="p-2 border border-gray-300 rounded w-full"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block mb-2">Visitor ID</label>
//               <input
//                 type="text"
//                 name="visitorId"
//                 value={formData.visitorId}
//                 onChange={handleChange}
//                 className="p-2 border border-gray-300 rounded w-full"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block mb-2">Check-In Time</label>
//               <input
//                 type="datetime-local"
//                 name="checkInTime"
//                 value={formData.checkInTime}
//                 onChange={handleChange}
//                 className="p-2 border border-gray-300 rounded w-full"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block mb-2">Check-Out Time</label>
//               <input
//                 type="datetime-local"
//                 name="checkOutTime"
//                 value={formData.checkOutTime}
//                 onChange={handleChange}
//                 className="p-2 border border-gray-300 rounded w-full"
//               />
//             </div>
//           </div>
//           <div className="my-4">
//             <Webcam
//               audio={false}
//               ref={webcamRef}
//               screenshotFormat="image/jpeg"
//               width={240}
//               className="border border-gray-300 rounded"
//             />
//             <button
//               type="button"
//               onClick={capturePhoto}
//               className="bg-blue-500 text-white p-2 rounded mt-2"
//             >
//               Capture Photo
//             </button>
//           </div>
//           <div className="flex justify-end space-x-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="bg-gray-500 text-white p-2 rounded"
//             >
//               Cancel
//             </button>
//             <button type="submit" className="bg-blue-500 text-white p-2 rounded">
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default VisitorModal;
// import { useState, useRef } from 'react';
// import axios from 'axios';
// import Webcam from 'react-webcam';

// const VisitorModal = ({ isOpen, onClose, fetchVisitors }) => {
//   const webcamRef = useRef(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     purpose: '',
//     comingFrom: '',
//     idType: '',
//     visitorId: '',
//     checkInTime: '',
//     photo: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const capturePhoto = () => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     if (imageSrc) {
//       const img = new Image();
//       img.src = imageSrc;

//       img.onload = () => {
//         const canvas = document.createElement('canvas');
//         const MAX_WIDTH = 320;
//         const MAX_HEIGHT = 240;
//         let width = img.width;
//         let height = img.height;

//         if (width > height) {
//           if (width > MAX_WIDTH) {
//             height *= MAX_WIDTH / width;
//             width = MAX_WIDTH;
//           }
//         } else {
//           if (height > MAX_HEIGHT) {
//             width *= MAX_HEIGHT / height;
//             height = MAX_HEIGHT;
//           }
//         }

//         canvas.width = width;
//         canvas.height = height;
//         const ctx = canvas.getContext('2d');
//         ctx.drawImage(img, 0, 0, width, height);
//         const resizedImage = canvas.toDataURL('image/jpeg');
//         setFormData({ ...formData, photo: resizedImage });
//       };
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem('token');
//     console.log('Token retrieved:', token); // Debugging line to check token

//     if (!token) {
//       alert('No token found. Please log in again.');
//       return;
//     }

//     if (!formData.photo) {
//       alert('Please capture a photo before submitting the form.');
//       return;
//     }

//     console.log('Form data before submit:', formData); // Debugging line to check form data

//     try {
//       const response = await axios.post('/api/visitors', formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       console.log('Response:', response); // Debugging line to check response

//       if (response.status === 201) {
//         alert('Visitor added successfully');
//         onClose();
//         fetchVisitors(token); // Refresh the visitors list
//       } else {
//         alert('Failed to add visitor');
//       }
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       alert(`Error submitting form: ${error.response ? error.response.data.message : error.message}`);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
//       <div className="bg-white p-4 rounded-lg shadow-lg max-w-2xl w-full max-h-screen overflow-y-auto">
//         <h2 className="text-2xl mb-4">Add Visitor</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block mb-2">Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="p-2 border border-gray-300 rounded w-full"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block mb-2">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="p-2 border border-gray-300 rounded w-full"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block mb-2">Phone</label>
//               <input
//                 type="text"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 className="p-2 border border-gray-300 rounded w-full"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block mb-2">Purpose</label>
//               <input
//                 type="text"
//                 name="purpose"
//                 value={formData.purpose}
//                 onChange={handleChange}
//                 className="p-2 border border-gray-300 rounded w-full"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block mb-2">Coming From</label>
//               <input
//                 type="text"
//                 name="comingFrom"
//                 value={formData.comingFrom}
//                 onChange={handleChange}
//                 className="p-2 border border-gray-300 rounded w-full"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block mb-2">ID Type</label>
//               <input
//                 type="text"
//                 name="idType"
//                 value={formData.idType}
//                 onChange={handleChange}
//                 className="p-2 border border-gray-300 rounded w-full"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block mb-2">Visitor ID</label>
//               <input
//                 type="text"
//                 name="visitorId"
//                 value={formData.visitorId}
//                 onChange={handleChange}
//                 className="p-2 border border-gray-300 rounded w-full"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block mb-2">Check-In Time</label>
//               <input
//                 type="datetime-local"
//                 name="checkInTime"
//                 value={formData.checkInTime}
//                 onChange={handleChange}
//                 className="p-2 border border-gray-300 rounded w-full"
//                 required
//               />
//             </div>
//           </div>
//           <div className="my-4">
//             <Webcam
//               audio={false}
//               ref={webcamRef}
//               screenshotFormat="image/jpeg"
//               width={240}
//               className="border border-gray-300 rounded"
//             />
//             <button
//               type="button"
//               onClick={capturePhoto}
//               className="bg-blue-500 text-white p-2 rounded mt-2"
//             >
//               Capture Photo
//             </button>
//           </div>
//           <div className="flex justify-end space-x-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="bg-gray-500 text-white p-2 rounded"
//             >
//               Cancel
//             </button>
//             <button type="submit" className="bg-blue-500 text-white p-2 rounded">
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default VisitorModal;


import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';

const purposes = [
  { label: 'MEETING' },
  { label: 'INTERVIEW' },
  { label: 'EVENTS' },
  { label: 'DELIVERY' },
  { label: 'HOUSEKEEPING WORK' },
  { label: 'CASUAL DUTY' },
  { label: 'VENDORS' },
  { label: 'ALL SETUP' },
  { label: 'INSULATION' },
  { label: 'FOOD TRAIL' },
  { label: 'LIGHT & TRUSS' },
  { label: 'SOUND SETUP' },
  { label: 'KST WORK' },
  { label: 'STAGE SETUP' },
  { label: 'EXTRA DRIVER' },
  { label: 'TRAINEE, JOINING' },
  { label: 'PAINTING' },
];

const idTypes = ["Adhar", "PAN", "Driving License"];

const VisitorModal = ({ isOpen, onClose, fetchVisitors, clientId }) => {
  const webcamRef = useRef(null);
  const [hosts, setHosts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    purpose: '',
    comingFrom: '',
    idType: '',
    visitorId: '',
    checkInTime: '',
    host: '',
    photo: '',
  });

  useEffect(() => {
    if (clientId) {
      fetchHosts(clientId).then(data => setHosts(data));
    }
  }, [clientId]);

  const fetchHosts = async (clientId) => {
    // Replace this with your actual API call to fetch hosts
    try {
      const response = await axios.get(`/api/hosts?clientId=${clientId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching hosts:', error);
      return [];
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      const img = new Image();
      img.src = imageSrc;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 320;
        const MAX_HEIGHT = 240;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const resizedImage = canvas.toDataURL('image/jpeg');
        setFormData({ ...formData, photo: resizedImage });
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    console.log('Token retrieved:', token); // Debugging line to check token

    if (!token) {
      alert('No token found. Please log in again.');
      return;
    }

    if (!formData.photo) {
      alert('Please capture a photo before submitting the form.');
      return;
    }

    console.log('Form data before submit:', formData); // Debugging line to check form data

    try {
      const response = await axios.post('/api/visitors', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Response:', response); // Debugging line to check response

      if (response.status === 201) {
        alert('Visitor added successfully');
        onClose();
        fetchVisitors(token); // Refresh the visitors list
      } else {
        alert('Failed to add visitor');
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
        <h2 className="text-2xl mb-4">Add Visitor</h2>
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
              <label className="block mb-2">Purpose</label>
              <select
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded w-full"
                required
              >
                <option value="">Select a purpose</option>
                {purposes.map((purpose) => (
                  <option key={purpose.label} value={purpose.label}>
                    {purpose.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-2">Coming From</label>
              <input
                type="text"
                name="comingFrom"
                value={formData.comingFrom}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-2">ID Type</label>
              <select
                name="idType"
                value={formData.idType}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded w-full"
                required
              >
                <option value="">Select ID Type</option>
                {idTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-2">Visitor ID</label>
              <input
                type="text"
                name="visitorId"
                value={formData.visitorId}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Check-In Time</label>
              <input
                type="datetime-local"
                name="checkInTime"
                value={formData.checkInTime}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
           
          </div>
          <div className="my-4">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={240}
              className="border border-gray-300 rounded"
            />
            <button
              type="button"
              onClick={capturePhoto}
              className="bg-blue-500 text-white p-2 rounded mt-2"
            >
              Capture Photo
            </button>
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

export default VisitorModal;
