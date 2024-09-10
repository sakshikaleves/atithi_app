// // pages/login.js
// "use client"
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/router';
// import Image from 'next/image';

// const images = [
//   'https://assets.architecturaldigest.in/photos/600824f4becb0f0dae139d9f/master/w_960,c_limit/taj-mahal-palace-mumbai-architecture8.png',
//   'https://assets.architecturaldigest.in/photos/600824f1981578de52d04822/master/w_960,c_limit/taj-mahal-palace-mumbai-architecture7.png',
// ];

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const router = useRouter();

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('/api/auth/login', { email, password });
//       if (response.data.message === 'Login successful') {
//         router.push('/add-client');
//       } else {
//         alert(response.data.message);
//       }
//     } catch (error) {
//       alert(error.response.data.message);
//     }
//   };

//   return (
//     <div className="flex h-screen items-center justify-center bg-gray-100">
//       <div className="flex bg-white rounded-lg shadow-lg overflow-hidden w-3/4">
//         <div className="w-1/2 relative">
//           <div className="relative h-full w-full">
//             <Image
//               src={images[currentImageIndex]}
//               alt="Slideshow Image"
//               fill
//               style={{ objectFit: 'cover' }}
//               className="absolute inset-0"
//             />
//           </div>
//         </div>
//         <div className="w-1/2 p-8 flex flex-col justify-center">
//           <h3 className="text-lg text-gray-700 mb-2">Home Page</h3>
//           <h1 className="text-4xl font-bold mb-6 text-gray-800">Login</h1>
//           <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
//             <input 
//               type="text" 
//               placeholder="Username" 
//               value={email} 
//               onChange={(e) => setEmail(e.target.value)} 
//               required 
//               className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//             />
//             <input 
//               type="password" 
//               placeholder="Password" 
//               value={password} 
//               onChange={(e) => setPassword(e.target.value)} 
//               required 
//               className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//             />
//             <button type="submit" className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">Login</button>
//           </form>
//           <div className="mt-4 text-center">
//             <a href="#" className="text-blue-500 hover:underline">Don't have an account? Sign Up</a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// "use client";
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/router';
// import Image from 'next/image';

// const images = [
//   'https://assets.architecturaldigest.in/photos/600824f4becb0f0dae139d9f/master/w_960,c_limit/taj-mahal-palace-mumbai-architecture8.png',
//   'https://assets.architecturaldigest.in/photos/600824f1981578de52d04822/master/w_960,c_limit/taj-mahal-palace-mumbai-architecture7.png',
//   'https://assets.architecturaldigest.in/photos/600824f0981578de52d04820/16:9/w_1920,c_limit/taj-mahal-palace-mumbai-architecture-1366x768.jpg',
//   'https://assets.architecturaldigest.in/photos/600824f3becb0f0dae139d9d/master/w_1600,c_limit/taj-mahal-palace-mumbai-architecture1.png',
//   'https://assets.architecturaldigest.in/photos/600823b2345ead69c9c1aef0/master/w_1600,c_limit/Brijrama-Palace-Varanasi-interiors-view-2.jpg',
// ];

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const router = useRouter();

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('/api/auth/login', { email, password });
//       if (response.data.message === 'Login successful') {
//         router.push(response.data.redirectTo);
//       } else if (response.data.message === 'Change password') {
//         router.push(response.data.redirectTo);
//       } else {
//         alert(response.data.message);
//       }
//     } catch (error) {
//       alert(error.response.data.message);
//     }
//   };

//   return (
//     <div className="flex h-screen items-center justify-center bg-gray-100">
//       <div className="flex bg-white rounded-lg shadow-lg overflow-hidden w-3/4">
//         <div className="w-1/2 relative">
//           <div className="relative h-full w-full">
//             <Image
//               src={images[currentImageIndex]}
//               alt="Slideshow Image"
//               fill
//               style={{ objectFit: 'cover' }}
//               className="absolute inset-0"
//             />
//           </div>
//         </div>
//         <div className="w-1/2 p-8 flex flex-col justify-center">
        
//           <h1 className="text-4xl font-bold mb-6 text-gray-800">Login</h1>
//           <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
//             <input
//               type="text"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//             />
//             <button type="submit" className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">Login</button>
//           </form>
//           <div className="mt-4 text-center">
//             <a href="#" className="text-blue-500 hover:underline">Don't have an account? Sign Up</a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
  
// frontend for login page
// "use client";
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/router';
// import Image from 'next/image';

// const images = [
//   'https://assets.architecturaldigest.in/photos/600824f4becb0f0dae139d9f/master/w_960,c_limit/taj-mahal-palace-mumbai-architecture8.png',
//   'https://assets.architecturaldigest.in/photos/600824f1981578de52d04822/master/w_960,c_limit/taj-mahal-palace-mumbai-architecture7.png',
//   'https://assets.architecturaldigest.in/photos/600824f0981578de52d04820/16:9/w_1920,c_limit/taj-mahal-palace-mumbai-architecture-1366x768.jpg',
//   'https://assets.architecturaldigest.in/photos/600824f3becb0f0dae139d9d/master/w_1600,c_limit/taj-mahal-palace-mumbai-architecture1.png',
//   'https://assets.architecturaldigest.in/photos/600823b2345ead69c9c1aef0/master/w_1600,c_limit/Brijrama-Palace-Varanasi-interiors-view-2.jpg',
// ];

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const router = useRouter();

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('/api/auth/login', { email, password });
//       if (response.data.message === 'Login successful') {
//         localStorage.setItem('token', response.data.token); // Store the token
//         console.log('Token stored:', response.data.token); // Debugging line
//         router.push(response.data.redirectTo);
//       } else if (response.data.message === 'Change password') {
//         localStorage.setItem('token', response.data.token); // Store the token if password needs to be changed
//         router.push(response.data.redirectTo);
//       } else {
//         alert(response.data.message);
//       }
//     } catch (error) {
//       console.error('Error during login:', error); // Debugging line
//       alert(error.response.data.message);
//     }
//   };

//   return (
//     <div className="flex h-screen items-center justify-center bg-gray-100">
//       <div className="flex bg-white rounded-lg shadow-lg overflow-hidden w-3/4" style={{ height: '80vh' }}>
//         <div className="w-1/2 relative">
//           <div className="relative h-full w-full">
//             <Image
//               src={images[currentImageIndex]}
//               alt="Slideshow Image"
//               fill
//               style={{ objectFit: 'cover', height: '100%' }}
//               className="absolute inset-0"
//             />
//           </div>
//         </div>
//         <div className="w-1/2 p-8 flex flex-col justify-center">
//           <div className="flex flex-col items-center">
//             <h2 className="text-2xl font-bold mb-4">Login</h2>
//           </div>
//           <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
//             <input
//               type="text"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//             />
//             <label className="flex items-center space-x-2">
//               <input type="checkbox" className="form-checkbox h-5 w-5 text-gray-600" />
//               <span className="text-gray-600">Remember me next time.</span>
//             </label>
//             <button type="submit" className="p-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition duration-300">LOGIN</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }





// "use client";
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/router';
// import Image from 'next/image';

// const images = [
//   'https://assets.architecturaldigest.in/photos/600824f4becb0f0dae139d9f/master/w_960,c_limit/taj-mahal-palace-mumbai-architecture8.png',
//   'https://assets.architecturaldigest.in/photos/600824f1981578de52d04822/master/w_960,c_limit/taj-mahal-palace-mumbai-architecture7.png',
//   'https://assets.architecturaldigest.in/photos/600824f0981578de52d04820/16:9/w_1920,c_limit/taj-mahal-palace-mumbai-architecture-1366x768.jpg',
//   'https://assets.architecturaldigest.in/photos/600824f3becb0f0dae139d9d/master/w_1600,c_limit/taj-mahal-palace-mumbai-architecture1.png',
//   'https://assets.architecturaldigest.in/photos/600823b2345ead69c9c1aef0/master/w_1600,c_limit/Brijrama-Palace-Varanasi-interiors-view-2.jpg',
// ];

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const router = useRouter();

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('/api/auth/login', { email, password });
//       if (response.data.message === 'Login successful') {
//         router.push(response.data.redirectTo);
//       } else if (response.data.message === 'Change password') {
//         router.push(response.data.redirectTo);
//       } else {
//         alert(response.data.message);
//       }
//     } catch (error) {
//       alert(error.response.data.message);
//     }
//   };

//   return (
//     <div className="flex h-screen items-center justify-center bg-gray-100">
//       <div className="flex bg-white rounded-lg shadow-lg overflow-hidden w-3/4" style={{ height: '80vh' }}>
//         <div className="w-1/2 relative">
//           <div className="relative h-full w-full">
//             <Image
//               src={images[currentImageIndex]}
//               alt="Slideshow Image"
//               fill
//               style={{ objectFit: 'cover', height: '100%' }}
//               className="absolute inset-0"
//             />
//           </div>
//         </div>
//         <div className="w-1/2 p-8 flex flex-col justify-center">
//           <div className="flex flex-col items-center">
            
//           </div>
//           <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
//             <input
//               type="text"
//               placeholder="Username"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//             />
//             <label className="flex items-center space-x-2">
//               <input type="checkbox" className="form-checkbox h-5 w-5 text-gray-600" />
//               <span className="text-gray-600">Remember me next time.</span>
//             </label>
//             <button type="submit" className="p-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition duration-300">LOGIN</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/router';
// import Image from 'next/image';

// const images = [
//   'https://assets.architecturaldigest.in/photos/600824f4becb0f0dae139d9f/master/w_960,c_limit/taj-mahal-palace-mumbai-architecture8.png',
//   'https://assets.architecturaldigest.in/photos/600824f1981578de52d04822/master/w_960,c_limit/taj-mahal-palace-mumbai-architecture7.png',
//   'https://assets.architecturaldigest.in/photos/600824f0981578de52d04820/16:9/w_1920,c_limit/taj-mahal-palace-mumbai-architecture-1366x768.jpg',
//   'https://assets.architecturaldigest.in/photos/600824f3becb0f0dae139d9d/master/w_1600,c_limit/taj-mahal-palace-mumbai-architecture1.png',
//   'https://assets.architecturaldigest.in/photos/600823b2345ead69c9c1aef0/master/w_1600,c_limit/Brijrama-Palace-Varanasi-interiors-view-2.jpg',
// ];

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const router = useRouter();

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('/api/auth/login', { email, password });
//       if (response.data.message === 'Login successful') {
//         localStorage.setItem('token', response.data.token); // Store the token
//         console.log('Token stored:', response.data.token); // Debugging line
//         router.push(response.data.redirectTo);
//       } else if (response.data.message === 'First login, please change your password') {
//         localStorage.setItem('token', response.data.token); // Store the token if password needs to be changed
//         router.push(response.data.redirectTo);
//       } else {
//         alert(response.data.message);
//       }
//     } catch (error) {
//       console.error('Error during login:', error); // Debugging line
//       alert(error.response.data.message);
//     }
//   };

//   return (
//     <div className="flex h-screen items-center justify-center bg-gray-100">
//       <div className="flex bg-white rounded-lg shadow-lg overflow-hidden w-3/4" style={{ height: '80vh' }}>
//         <div className="w-1/2 relative">
//           <div className="relative h-full w-full">
//             <Image
//               src={images[currentImageIndex]}
//               alt="Slideshow Image"
//               fill
//               style={{ objectFit: 'cover', height: '100%' }}
//               className="absolute inset-0"
//             />
//           </div>
//         </div>
//         <div className="w-1/2 p-8 flex flex-col justify-center">
//           <div className="flex flex-col items-center">
//             <h2 className="text-2xl font-bold mb-4">Login</h2>
//           </div>
//           <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
//             <input
//               type="text"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//             />
//             <label className="flex items-center space-x-2">
//               <input type="checkbox" className="form-checkbox h-5 w-5 text-gray-600" />
//               <span className="text-gray-600">Remember me next time.</span>
//             </label>
//             <button type="submit" className="p-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition duration-300">LOGIN</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Image from 'next/image';

const images = [
  
  'https://assets.architecturaldigest.in/photos/600824f1981578de52d04822/master/w_960,c_limit/taj-mahal-palace-mumbai-architecture7.png',
  'https://assets.architecturaldigest.in/photos/600824f0981578de52d04820/16:9/w_1920,c_limit/taj-mahal-palace-mumbai-architecture-1366x768.jpg',
  'https://assets.architecturaldigest.in/photos/600824f3becb0f0dae139d9d/master/w_1600,c_limit/taj-mahal-palace-mumbai-architecture1.png',
  'https://assets.architecturaldigest.in/photos/600823b2345ead69c9c1aef0/master/w_1600,c_limit/Brijrama-Palace-Varanasi-interiors-view-2.jpg',
];

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      if (response.data.message === 'Login successful') {
        localStorage.setItem('token', response.data.token); // Store the token
        console.log('Token stored:', response.data.token); // Debugging line
        router.push(response.data.redirectTo);
      } else if (response.data.message === 'First login, please change your password') {
        localStorage.setItem('token', response.data.token); // Store the token if password needs to be changed
        router.push(response.data.redirectTo);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error during login:', error); // Debugging line
      alert(error.response.data.message);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/forgot-password', { email: resetEmail });
      alert(response.data.message);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error during password reset request:', error); // Debugging line
      alert(error.response.data.message);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden w-3/4" style={{ height: '80vh' }}>
        <div className="w-1/2 relative">
          <div className="relative h-full w-full">
            <Image
              src={images[currentImageIndex]}
              alt="Slideshow Image"
              fill
              style={{ objectFit: 'cover', height: '100%' }}
              className="absolute inset-0"
            />
          </div>
        </div>
        <div className="w-1/2 p-8 flex flex-col justify-center">
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox h-5 w-5 text-gray-600" />
              <span className="text-gray-600">Remember me next time.</span>
            </label>
            <button type="submit" className="p-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition duration-300">LOGIN</button>
          </form>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 text-blue-600 hover:underline"
          >
            Forgot Password?
          </button>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl mb-4">Reset Password</h2>
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 w-full"
              />
              <button type="submit" className="p-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition duration-300 w-full">Reset Password</button>
            </form>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 text-blue-600 hover:underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
