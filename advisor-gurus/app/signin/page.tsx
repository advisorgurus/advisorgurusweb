"use client";
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext'; // Import useAuth for accessing authentication context

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 
  const router = useRouter();
  const { setIsAuthenticated } = useAuth();  // Destructure setIsAuthenticated from useAuth

  const handleSignIn = async () => {
    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Login successful');
        localStorage.setItem('authToken', data.token);
        setIsAuthenticated(true);  // Update authentication state
        router.push('/bookings');  // Redirect to bookings page
      } else {
        setErrorMessage('Username or password is invalid');
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-100 via-white to-gray-100 p-4 relative">
      <div className="mt-20 z-10 w-full max-w-xl">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full transition-transform hover:scale-105 hover:shadow-xl">
          <h1 className="text-4xl font-bold text-center mb-4 text-blue-800">Welcome Back!</h1>
          <p className="text-center mb-6 text-gray-600">Sign in securely to access your personalized dashboard.</p>

          {errorMessage && <p className="text-red-600 text-center mb-4">{errorMessage}</p>}

          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:shadow-lg transition duration-300"
            />
          </div>

          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:shadow-lg transition duration-300"
            />
          </div>

          <button 
            className="w-full bg-blue-600 text-white py-3 rounded-md font-bold hover:bg-blue-700 hover:scale-105 transition duration-300 shadow-md hover:shadow-lg"
            onClick={handleSignIn}
          >
            Sign In
          </button>
        </div>

        <p className="mt-6 text-gray-600 text-lg italic text-center">
          "Secure. Efficient. Fast. The easiest way to manage your account."
        </p>

        <p className="mt-4 text-gray-600 text-center">
          Don't have an account? <a href="/create-account" className="text-blue-600 hover:underline">Create one</a>
        </p>
      </div>

      {/* Responsive Image Positioning */}
      <div className="absolute bottom-4 left-2 sm:left-10 lg:left-20 opacity-80 z-0">
        <Image 
          src="https://drive.google.com/uc?export=view&id=1iPOKw9U3wLzyacarUlAcIFGbg1NEHS1N"
          alt="Professional Sign-In"
          width={200}        // Default width for mobile
          height={300}       // Default height for mobile
          className="rounded-lg opacity-80 
                     sm:w-[150px] sm:h-[250px]    // Smaller size for very small screens
                     md:w-[200px] md:h-[200px]    // Medium size for small screens
                     lg:w-[300px] lg:h-[300px]    // Large size for larger screens
                     xl:w-[300px] xl:h-[300px]"   // Full size for extra-large screens
        />
      </div>
    </div>
  );
};

export default SignIn;
