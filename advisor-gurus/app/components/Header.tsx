"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';

const Header = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [showLogo, setShowLogo] = useState(true); // State to toggle between logo and text

  // Function to handle the sign-out
  const handleSignOut = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    window.location.href = '/signin';
  };

  // Effect to alternate between showing the logo and the "Advisor Gurus" text every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setShowLogo((prevShowLogo) => !prevShowLogo); // Toggle the state
    }, 5000); // 5000ms = 5 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <header className="w-full flex justify-between items-center px-6 py-2 bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 shadow-md fixed top-0 left-0 z-50">
      <div className="ml-4">
        <Link href="/">
          {/* Fixed-width container for logo/text to prevent layout shift */}
          <div style={{ width: '180px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {showLogo ? (
              <Image 
                src="https://drive.google.com/uc?export=view&id=1mGlajdYdPb9mP6sghwsNSTRzFAW_00eJ" 
                alt="TechGuru Logo" 
                width={70}  // Increased logo size
                height={70}
                className="cursor-pointer rounded-full"  // Make the logo circular
              />
            ) : (
              <span 
                className="text-white text-2xl font-bold cursor-pointer flex items-center justify-center" 
                style={{ width: '180px', height: '70px' }}  // Fixed size for text container
              >
                Advisor Gurus
              </span>
            )}
          </div>
        </Link>
      </div>
      <nav className="flex space-x-6 text-sm font-semibold mr-4">
        <Link href="/" className="text-white hover:text-blue-300 transition duration-300 ease-in-out">
          Home
        </Link>
        <Link href="/get-started" className="text-white hover:text-blue-300 transition duration-300 ease-in-out">
          About Us
        </Link>
        {isAuthenticated ? (
          <>
            <Link href="/my-account" className="text-white hover:text-blue-300 transition duration-300 ease-in-out">
              My Account
            </Link>
            <Link href="/bookings" className="text-white hover:text-blue-300 transition duration-300 ease-in-out">
              Bookings
            </Link>
            <button onClick={handleSignOut} className="text-white hover:text-blue-300 transition duration-300 ease-in-out">
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link href="/signin" className="text-white hover:text-blue-300 transition duration-300 ease-in-out">
              Sign In
            </Link>
            <Link href="/create-account" className="text-white hover:text-blue-300 transition duration-300 ease-in-out">
              Create Account
            </Link>
            <Link href="/bookings" className="text-white hover:text-blue-300 transition duration-300 ease-in-out">
              Bookings
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
