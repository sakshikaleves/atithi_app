


// import { useState, useEffect, useRef } from 'react';
// import { useRouter } from 'next/router';
// import { Bar, Doughnut, Line, Pie } from 'react-chartjs-2';
// import 'chart.js/auto';
// import axios from 'axios';

// const ClientDashboard = () => {
//   const [clientData, setClientData] = useState(null);
//   const [visitorData, setVisitorData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const router = useRouter();
//   const { clientId } = router.query;
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     const fetchClientData = async () => {
//       if (clientId) {
//         try {
//           const response = await fetch(`/api/clients/${clientId}`);
//           if (!response.ok) throw new Error('Network response was not ok');
//           const data = await response.json();
//           setClientData(data);
//           setLoading(false);
//         } catch (error) {
//           setError(error.message);
//           setLoading(false);
//         }
//       }
//     };

//     fetchClientData();
//   }, [clientId]);

//   useEffect(() => {
//     const fetchVisitorData = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get('/api/visitors', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setVisitorData(response.data);
//       } catch (error) {
//         setError(error.message);
//       }
//     };

//     fetchVisitorData();
//   }, []);

//   useEffect(() => {
//     if (isDarkMode) {
//       document.documentElement.classList.add('dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//     }
//   }, [isDarkMode]);

//   const toggleDarkMode = () => {
//     setIsDarkMode(!isDarkMode);
//   };

//   const handleCheckOut = async (id) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.put(`/api/visitors/${id}`, 
//         { checkOutTime: new Date().toISOString() }, 
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setVisitorData(visitorData.map(visitor => 
//         visitor.id === id ? { ...visitor, check_out_time: response.data.check_out_time } : visitor
//       ));
//     } catch (error) {
//       console.error('Error marking check-out time:', error);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     router.push('/login');
//   };

//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   const handleClickOutside = (event) => {
//     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//       setDropdownOpen(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;
//   if (!clientData) return <p>No client data found</p>;

//   const checkedInVisitors = visitorData.filter(visitor => !visitor.check_out_time).length;
//   const checkedOutVisitors = visitorData.filter(visitor => visitor.check_out_time).length;

//   const purposeCounts = visitorData.reduce((acc, visitor) => {
//     const purpose = visitor.purpose || 'Unknown';
//     acc[purpose] = (acc[purpose] || 0) + 1;
//     return acc;
//   }, {});

//   const purposeLabels = Object.keys(purposeCounts);
//   const purposeValues = Object.values(purposeCounts);

//   const barData = {
//     labels: ['Checked-In', 'Checked-Out'],
//     datasets: [
//       {
//         label: 'Number of Visitors',
//         data: [checkedInVisitors, checkedOutVisitors],
//         backgroundColor: ['#36A2EB', '#FF6384'],
//         borderColor: ['#36A2EB', '#FF6384'],
//         borderWidth: 1,
//         barThickness: 30,
//       },
//     ],
//   };

//   const doughnutData = {
//     labels: purposeLabels,
//     datasets: [
//       {
//         label: 'Purpose of Visit',
//         data: purposeValues,
//         backgroundColor: [
//           '#FF6384',
//           '#36A2EB',
//           '#FFCE56',
//           '#4BC0C0',
//           '#9966FF',
//           '#FF9F40',
//           '#85AD9B',
//         ],
//         borderColor: [
//           '#FF6384',
//           '#36A2EB',
//           '#FFCE56',
//           '#4BC0C0',
//           '#9966FF',
//           '#FF9F40',
//           '#85AD9B',
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const options = {
//     maintainAspectRatio: false,
//     scales: {
//       x: {
//         ticks: {
//           color: isDarkMode ? 'white' : 'black',
//         },
//       },
//       y: {
//         ticks: {
//           color: isDarkMode ? 'white' : 'black',
//           beginAtZero: true,
//           precision: 0,
//         },
//         grid: {
//           color: isDarkMode ? '#444' : '#ccc',
//         },
//       },
//     },
//     plugins: {
//       legend: {
//         labels: {
//           color: isDarkMode ? 'white' : 'black',
//         },
//       },
//       tooltip: {
//         backgroundColor: isDarkMode ? '#333' : '#fff',
//         titleColor: isDarkMode ? 'white' : 'black',
//         bodyColor: isDarkMode ? 'white' : 'black',
//       },
//     },
//   };

//   const doughnutOptions = {
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: 'right',
//         align: 'start',
//         labels: {
//           color: isDarkMode ? 'white' : 'black',
//           boxWidth: 12,
//         },
//       },
//       tooltip: {
//         backgroundColor: isDarkMode ? '#333' : '#fff',
//         titleColor: isDarkMode ? 'white' : 'black',
//         bodyColor: isDarkMode ? 'white' : 'black',
//       },
//     },
//   };

//   const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//   const visitorTrends = daysOfWeek.map(day => {
//     return visitorData.filter(visitor => new Date(visitor.check_in_time).toLocaleString('en-US', { weekday: 'long' }) === day).length;
//   });

//   const lineData = {
//     labels: daysOfWeek,
//     datasets: [
//       {
//         label: 'Number of Visitors',
//         data: visitorTrends,
//         borderColor: '#4BC0C0',
//         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//         pointBackgroundColor: '#4BC0C0',
//         pointBorderColor: '#fff',
//         pointHoverBackgroundColor: '#fff',
//         pointHoverBorderColor: '#4BC0C0',
//         fill: true,
//         tension: 0.4, // Smooth curves
//       },
//     ],
//   };

//   // Additional Graphs
//   const ageGroupCounts = visitorData.reduce((acc, visitor) => {
//     const ageGroup = visitor.age_group || 'Unknown';
//     acc[ageGroup] = (acc[ageGroup] || 0) + 1;
//     return acc;
//   }, {});

//   const ageGroupLabels = Object.keys(ageGroupCounts);
//   const ageGroupValues = Object.values(ageGroupCounts);

//   const ageGroupData = {
//     labels: ageGroupLabels,
//     datasets: [
//       {
//         label: 'Age Group Distribution',
//         data: ageGroupValues,
//         backgroundColor: [
//           '#FF6384',
//           '#36A2EB',
//           '#FFCE56',
//           '#4BC0C0',
//           '#9966FF',
//           '#FF9F40',
//           '#85AD9B',
//         ],
//         borderColor: [
//           '#FF6384',
//           '#36A2EB',
//           '#FFCE56',
//           '#4BC0C0',
//           '#9966FF',
//           '#FF9F40',
//           '#85AD9B',
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };

//   return (
//     <div className={`flex flex-col h-screen ${isDarkMode ? 'dark:bg-gray-900' : 'bg-gray-50'}`}>
//       <div className="flex justify-between items-center bg-gray-900 dark:bg-gray-800 py-4 px-6">
//         <h1 className="text-2xl font-bold text-white">Welcome to {clientData.name}'s Dashboard</h1>
//         <div className="flex items-center space-x-4">
//           <ul className="flex space-x-2">
//             {['hosts', 'visitors', 'reports', 'authorization', 'settings'].map((item) => (
//               <li key={item}>
//                 <button
//                   onClick={() => router.push(`/client-dashboard/${item}`)}
//                   className="px-3 py-1 bg-gray-700 dark:bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-600 dark:hover:bg-gray-500 transition duration-300"
//                 >
//                   {item.charAt(0).toUpperCase() + item.slice(1)}
//                 </button>
//               </li>
//             ))}
//           </ul>
//           <div className="relative" ref={dropdownRef}>
//             <button
//               onClick={toggleDropdown}
//               className="w-10 h-10 bg-gray-700 dark:bg-gray-600 text-white rounded-full hover:bg-gray-600 dark:hover:bg-gray-500 transition duration-300 flex items-center justify-center"
//               aria-label="User Options"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="w-5 h-5"
//               >
//                 <circle cx="12" cy="12" r="10"></circle>
//                 <line x1="12" y1="8" x2="12" y2="12"></line>
//                 <line x1="12" y1="16" x2="12.01" y2="16"></line>
//               </svg>
//             </button>
//             {dropdownOpen && (
//               <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2 z-20">
//                 <button
//                   onClick={toggleDarkMode}
//                   className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
//                 >
//                   🌙Dark Mode
//                 </button>
//                 <button
//                   onClick={handleLogout}
//                   className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
//                 >
//                   🚪Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       <div className="flex-grow p-8 dark:bg-gray-900 flex flex-col lg:flex-row">
//         <div className="lg:w-1/4 lg:pr-8 flex flex-col space-y-4">
//           <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-center h-40 flex flex-col justify-center">
//             <h2 className="text-xl font-bold dark:text-white">Checked-In 🟢</h2>
//             <p className="text-3xl dark:text-white">{checkedInVisitors}</p>
//           </div>
//           <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-center h-40 flex flex-col justify-center">
//             <h2 className="text-xl font-bold dark:text-white">Checked-Out 🔴</h2>
//             <p className="text-3xl dark:text-white">{checkedOutVisitors}</p>
//           </div>
//         </div>
//         <div className="lg:w-3/4 flex flex-col space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//             <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow" style={{ height: '400px' }}>
//               <h2 className="text-2xl font-bold mb-4 dark:text-white">Visitor Trends</h2>
//               <div className="h-full">
//                 <Line data={lineData} options={options} />
//               </div>
//             </div>
//             <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow" style={{ height: '400px' }}>
//               <h2 className="text-2xl font-bold mb-4 dark:text-white">Visitor Stats</h2>
//               <div className="h-full">
//                 <Bar data={barData} options={options} />
//               </div>
//             </div>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//             <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow flex items-center justify-center" style={{ height: '400px' }}>
//               <div className="w-full h-full">
//                 <h2 className="text-xl font-bold mb-4 dark:text-white">Checked-In vs Purpose of Visit</h2>
//                 <div className="flex justify-center items-center h-full">
//                   <Doughnut data={doughnutData} options={doughnutOptions} />
//                 </div>
//               </div>
//             </div>
          
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClientDashboard;


import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { Bar, Doughnut, Line, Pie, Radar, Bubble } from 'react-chartjs-2';
import 'chart.js/auto';
import axios from 'axios';

const ClientDashboard = () => {
  const [clientData, setClientData] = useState(null);
  const [visitorData, setVisitorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();
  const { clientId } = router.query;
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchClientData = async () => {
      if (clientId) {
        try {
          const response = await fetch(`/api/clients/${clientId}`);
          if (!response.ok) throw new Error('Network response was not ok');
          const data = await response.json();
          setClientData(data);
          setLoading(false);
        } catch (error) {
          setError(error.message);
          setLoading(false);
        }
      }
    };

    fetchClientData();
  }, [clientId]);

  useEffect(() => {
    const fetchVisitorData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/visitors', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setVisitorData(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchVisitorData();
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleCheckOut = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`/api/visitors/${id}`, 
        { checkOutTime: new Date().toISOString() }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setVisitorData(visitorData.map(visitor => 
        visitor.id === id ? { ...visitor, check_out_time: response.data.check_out_time } : visitor
      ));
    } catch (error) {
      console.error('Error marking check-out time:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!clientData) return <p>No client data found</p>;

  const checkedInVisitors = visitorData.filter(visitor => !visitor.check_out_time).length;
  const checkedOutVisitors = visitorData.filter(visitor => visitor.check_out_time).length;

  const purposeCounts = visitorData.reduce((acc, visitor) => {
    const purpose = visitor.purpose || 'Unknown';
    acc[purpose] = (acc[purpose] || 0) + 1;
    return acc;
  }, {});

  const purposeLabels = Object.keys(purposeCounts);
  const purposeValues = Object.values(purposeCounts);

  const barData = {
    labels: ['Checked-In', 'Checked-Out'],
    datasets: [
      {
        label: 'Number of Visitors',
        data: [checkedInVisitors, checkedOutVisitors],
        backgroundColor: ['#36A2EB', '#FF6384'],
        borderColor: ['#36A2EB', '#FF6384'],
        borderWidth: 1,
        barThickness: 30,
      },
    ],
  };

  const doughnutData = {
    labels: purposeLabels,
    datasets: [
      {
        label: 'Purpose of Visit',
        data: purposeValues,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#85AD9B',
        ],
        borderColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#85AD9B',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: isDarkMode ? 'white' : 'black',
        },
      },
      y: {
        ticks: {
          color: isDarkMode ? 'white' : 'black',
          beginAtZero: true,
          precision: 0,
        },
        grid: {
          color: isDarkMode ? '#444' : '#ccc',
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: isDarkMode ? 'white' : 'black',
        },
      },
      tooltip: {
        backgroundColor: isDarkMode ? '#333' : '#fff',
        titleColor: isDarkMode ? 'white' : 'black',
        bodyColor: isDarkMode ? 'white' : 'black',
      },
    },
  };

  const doughnutOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        align: 'start',
        labels: {
          color: isDarkMode ? 'white' : 'black',
          boxWidth: 12,
        },
      },
      tooltip: {
        backgroundColor: isDarkMode ? '#333' : '#fff',
        titleColor: isDarkMode ? 'white' : 'black',
        bodyColor: isDarkMode ? 'white' : 'black',
      },
    },
  };

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const visitorTrends = daysOfWeek.map(day => {
    return visitorData.filter(visitor => new Date(visitor.check_in_time).toLocaleString('en-US', { weekday: 'long' }) === day).length;
  });

  const lineData = {
    labels: daysOfWeek,
    datasets: [
      {
        label: 'Number of Visitors',
        data: visitorTrends,
        borderColor: '#4BC0C0',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        pointBackgroundColor: '#4BC0C0',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#4BC0C0',
        fill: true,
        tension: 0.4, // Smooth curves
      },
    ],
  };

  const radarData = {
    labels: daysOfWeek,
    datasets: [
      {
        label: 'Visitor Trends',
        data: visitorTrends,
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        borderColor: '#22c55e',
        pointBackgroundColor: '#22c55e',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#22c55e',
      },
    ],
  };

  const bubbleData = {
    datasets: visitorData.map(visitor => ({
      label: visitor.purpose || 'Unknown',
      data: [
        {
          x: new Date(visitor.check_in_time).getHours(),
          y: new Date(visitor.check_in_time).getMinutes(),
          r: 10, // Set the radius as per the requirement
        },
      ],
      backgroundColor: '#FF6384',
      hoverBackgroundColor: '#FF6384',
    })),
  };

  // Additional Graphs
  const ageGroupCounts = visitorData.reduce((acc, visitor) => {
    const ageGroup = visitor.age_group || 'Unknown';
    acc[ageGroup] = (acc[ageGroup] || 0) + 1;
    return acc;
  }, {});

  const ageGroupLabels = Object.keys(ageGroupCounts);
  const ageGroupValues = Object.values(ageGroupCounts);

  const ageGroupData = {
    labels: ageGroupLabels,
    datasets: [
      {
        label: 'Age Group Distribution',
        data: ageGroupValues,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#85AD9B',
        ],
        borderColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#85AD9B',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={`flex flex-col h-screen ${isDarkMode ? 'dark:bg-gray-900' : 'bg-gray-50'} overflow-y-auto`}>
      <div className="flex justify-between items-center bg-gray-900 dark:bg-gray-800 py-4 px-6">
        <h1 className="text-2xl font-bold text-white">Welcome to {clientData.name}'s Dashboard</h1>
        <div className="flex items-center space-x-4">
          <ul className="flex space-x-2">
            {['hosts', 'visitors', 'reports', 'authorization', 'settings'].map((item) => (
              <li key={item}>
                <button
                  onClick={() => router.push(`/client-dashboard/${item}`)}
                  className="px-3 py-1 bg-gray-700 dark:bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-600 dark:hover:bg-gray-500 transition duration-300"
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              </li>
            ))}
          </ul>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="w-10 h-10 bg-gray-700 dark:bg-gray-600 text-white rounded-full hover:bg-gray-600 dark:hover:bg-gray-500 transition duration-300 flex items-center justify-center"
              aria-label="User Options"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2 z-20">
                <button
                  onClick={toggleDarkMode}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  🌙 Dark Mode
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex-grow p-8 dark:bg-gray-900 flex flex-col lg:flex-row">
        <div className="lg:w-1/4 lg:pr-8 flex flex-col space-y-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-center h-40 flex flex-col justify-center">
            <h2 className="text-xl font-bold dark:text-white">Checked-In 🟢</h2>
            <p className="text-3xl dark:text-white">{checkedInVisitors}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-center h-40 flex flex-col justify-center">
            <h2 className="text-xl font-bold dark:text-white">Checked-Out 🔴</h2>
            <p className="text-3xl dark:text-white">{checkedOutVisitors}</p>
          </div>
        </div>
        <div className="lg:w-3/4 flex flex-col space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow" style={{ height: '400px' }}>
              <h2 className="text-2xl font-bold mb-4 dark:text-white">Visitor Trends</h2>
              <div className="h-full">
                <Line data={lineData} options={options} />
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow" style={{ height: '400px' }}>
              <h2 className="text-2xl font-bold mb-4 dark:text-white">Visitor Stats</h2>
              <div className="h-full">
                <Bar data={barData} options={options} />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow flex items-center justify-center" style={{ height: '400px' }}>
              <div className="w-full h-full">
                <h2 className="text-xl font-bold mb-4 dark:text-white">Checked-In vs Purpose of Visit</h2>
                <div className="flex justify-center items-center h-full">
                  <Doughnut data={doughnutData} options={doughnutOptions} />
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow" style={{ height: '400px' }}>
              <h2 className="text-xl font-bold mb-4 dark:text-white">Age Group Distribution</h2>
              <div className="h-full">
                <Pie data={ageGroupData} options={doughnutOptions} />
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow" style={{ height: '400px' }}>
              <h2 className="text-xl font-bold mb-4 dark:text-white">Visitor Trends (Radar)</h2>
              <div className="h-full">
                <Radar data={radarData} options={options} />
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow" style={{ height: '400px' }}>
              <h2 className="text-xl font-bold mb-4 dark:text-white">Visitor Check-In Time (Bubble)</h2>
              <div className="h-full">
                <Bubble data={bubbleData} options={options} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
