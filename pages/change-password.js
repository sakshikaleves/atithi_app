// "use client";
// import { useState } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/router';

// export default function ChangePassword() {
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');
//   const router = useRouter();
//   const { clientId } = router.query;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (newPassword !== confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     try {
//       const response = await axios.post('/api/auth/change-password', {
//         clientId,
//         newPassword
//       });
//       alert(response.data.message);
//       router.push('/client-dashboard');
//     } catch (error) {
//       setError(error.response.data.message);
//     }
//   };

//   return (
//     <div className="flex h-screen items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
//         <h1 className="text-2xl font-bold mb-6">Change Password</h1>
//         {error && <p className="text-red-500 mb-4">{error}</p>}
//         <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
//           <input
//             type="password"
//             placeholder="New Password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             required
//             className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//           />
//           <input
//             type="password"
//             placeholder="Confirm New Password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//             className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//           />
//           <button type="submit" className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">Change Password</button>
//         </form>
//       </div>
//     </div>
//   );
// }


"use client";
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function ChangePassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { clientId } = router.query;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('/api/auth/change-password', {
        clientId,
        newPassword
      });
      alert(response.data.message);
      router.push(`/client-dashboard?clientId=${clientId}`);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
        <h1 className="text-2xl font-bold mb-6">Change Password</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <button type="submit" className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">Change Password</button>
        </form>
      </div>
    </div>
  );
}
