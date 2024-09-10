// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { useRouter } from 'next/router';

// export default function Reports() {
//   const [visitors, setVisitors] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(new Date());
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       router.push('/login');
//     }
//   }, []);

//   const fetchReports = async () => {
//     setLoading(true);
//     const token = localStorage.getItem('token');
//     try {
//       const response = await axios.get('/api/reports', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         params: {
//           start: startDate.toISOString(),
//           end: endDate.toISOString(),
//         },
//       });
//       setVisitors(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching reports:', error);
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <nav className="bg-gray-800 p-4 rounded mb-4 flex justify-between items-center">
//         <h1 className="text-white text-2xl font-bold">MIS Reports</h1>
//       </nav>
//       <div className="flex mb-4">
//         <div className="mr-4">
//           <label className="block mb-2 text-sm font-bold text-gray-700">Check In</label>
//           <DatePicker
//             selected={startDate}
//             onChange={(date) => setStartDate(date)}
//             className="p-2 border border-gray-300 rounded w-full"
//             showTimeSelect
//             dateFormat="Pp"
//           />
//         </div>
//         <div>
//           <label className="block mb-2 text-sm font-bold text-gray-700">Check Out</label>
//           <DatePicker
//             selected={endDate}
//             onChange={(date) => setEndDate(date)}
//             className="p-2 border border-gray-300 rounded w-full"
//             showTimeSelect
//             dateFormat="Pp"
//           />
//         </div>
//         <div className="ml-4 flex items-end">
//           <button
//             onClick={fetchReports}
//             className="bg-blue-500 text-white p-2 rounded"
//           >
//             Search
//           </button>
//         </div>
//       </div>
//       {loading ? (
//         <div className="flex justify-center items-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
//         </div>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white">
//             <thead>
//               <tr className="w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
//                 <th className="py-3 px-4 text-left">Visitor Name</th>
//                 <th className="py-3 px-4 text-left">Visitor Type</th>
//                 <th className="py-3 px-4 text-left">Mobile</th>
//                 <th className="py-3 px-4 text-left">Coming From</th>
//                 <th className="py-3 px-4 text-left">Purpose</th>
//                 <th className="py-3 px-4 text-left">Host</th>
//                 <th className="py-3 px-4 text-left">Check In</th>
//                 <th className="py-3 px-4 text-left">Check Out</th>
//               </tr>
//             </thead>
//             <tbody className="text-gray-600 text-sm font-light">
//               {visitors.map((visitor, index) => (
//                 <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
//                   <td className="py-3 px-4 text-left">{visitor.name}</td>
//                   <td className="py-3 px-4 text-left">{visitor.type}</td>
//                   <td className="py-3 px-4 text-left">{visitor.mobile}</td>
//                   <td className="py-3 px-4 text-left">{visitor.coming_from}</td>
//                   <td className="py-3 px-4 text-left">{visitor.purpose}</td>
//                   <td className="py-3 px-4 text-left">{visitor.host}</td>
//                   <td className="py-3 px-4 text-left">{new Date(visitor.check_in_time).toLocaleString()}</td>
//                   <td className="py-3 px-4 text-left">{visitor.check_out_time ? new Date(visitor.check_out_time).toLocaleString() : 'N/A'}</td>
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
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useRouter } from 'next/router';

export default function Reports() {
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('No token found, redirecting to login page');
      router.push('/login');
      return;
    }

    // Log the router query parameters
    console.log('Router query parameters on initial load:', router.query);

    if (!router.query.clientId) {
      console.error('Client ID is missing in query parameters on initial load');
    } else {
      console.log('Client ID found in query parameters:', router.query.clientId);
    }
  }, [router.query]);

  const fetchReports = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    const { clientId } = router.query;

    // Check if clientId is available
    if (!clientId) {
      console.error('Client ID is missing in fetchReports function');
      setLoading(false);
      return;
    }

    console.log('Fetching reports with clientId:', clientId);

    try {
      const response = await axios.get('/api/reports', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          clientId,
          start: startDate.toISOString(),
          end: endDate.toISOString(),
        },
      });
      console.log('Reports fetched successfully:', response.data);
      setVisitors(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching reports:', error);
      setLoading(false);
    }
  };

  const downloadCSV = async () => {
    const token = localStorage.getItem('token');
    const { clientId } = router.query;

    // Check if clientId is available
    if (!clientId) {
      console.error('Client ID is missing in downloadCSV function');
      return;
    }

    console.log('Downloading CSV with parameters:', { clientId, startDate, endDate });

    try {
      const response = await axios.get('/api/downloadReports', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          clientId,
          start: startDate.toISOString(),
          end: endDate.toISOString(),
        },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `reports_${clientId}.csv`);
      document.body.appendChild(link);
      link.click();
      console.log('CSV file downloaded successfully');
    } catch (error) {
      console.error('Error downloading CSV:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <nav className="bg-gray-800 p-4 rounded mb-4 flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">MIS Reports</h1>
      </nav>
      <div className="flex mb-4">
        <div className="mr-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">Check In</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="p-2 border border-gray-300 rounded w-full"
            showTimeSelect
            dateFormat="Pp"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-bold text-gray-700">Check Out</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            className="p-2 border border-gray-300 rounded w-full"
            showTimeSelect
            dateFormat="Pp"
          />
        </div>
        <div className="ml-4 flex items-end">
          <button
            onClick={fetchReports}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Search
          </button>
        </div>
        <div className="ml-4 flex items-end">
          <button
            onClick={downloadCSV}
            className="bg-green-500 text-white p-2 rounded"
          >
            Download CSV
          </button>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-4 text-left">Visitor Name</th>
                <th className="py-3 px-4 text-left">Visitor Type</th>
                <th className="py-3 px-4 text-left">Mobile</th>
                <th className="py-3 px-4 text-left">Coming From</th>
                <th className="py-3 px-4 text-left">Purpose</th>
                <th className="py-3 px-4 text-left">Host</th>
                <th className="py-3 px-4 text-left">Check In</th>
                <th className="py-3 px-4 text-left">Check Out</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {visitors.map((visitor, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-4 text-left">{visitor.name}</td>
                  <td className="py-3 px-4 text-left">{visitor.type}</td>
                  <td className="py-3 px-4 text-left">{visitor.mobile}</td>
                  <td className="py-3 px-4 text-left">{visitor.coming_from}</td>
                  <td className="py-3 px-4 text-left">{visitor.purpose}</td>
                  <td className="py-3 px-4 text-left">{visitor.host}</td>
                  <td className="py-3 px-4 text-left">{new Date(visitor.check_in_time).toLocaleString()}</td>
                  <td className="py-3 px-4 text-left">{visitor.check_out_time ? new Date(visitor.check_out_time).toLocaleString() : 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
