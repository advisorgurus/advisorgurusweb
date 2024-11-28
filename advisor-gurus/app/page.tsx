"use client";  // Ensure this directive is at the top

import Link from 'next/link';
import Image from 'next/image';

const Home = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-50 to-white">
      
      {/* Header with Logo and Menu */}
      <header className="w-full flex justify-between items-center p-6 bg-white shadow-md">
        {/* Logo Section */}
        

        {/* Navigation Menu */}
        <nav className="flex space-x-8 text-lg font-semibold">
          <Link href="/signin" className="text-gray-700 hover:text-blue-600 transition">
            Sign In
          </Link>
          <Link href="/create-account" className="text-gray-700 hover:text-blue-600 transition">
            Create Account
          </Link>
          <Link href="/bookings" className="text-gray-700 hover:text-blue-600 transition">
            Bookings
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-blue-800 mb-4 animate-fadeIn">
            Unlock your success with Advisor Gurus!
          </h1>
          <p className="text-lg text-gray-700 mb-6">
          Empower your growth with expert consulting services today
          </p>

          {/* Get Started Button */}
          <Link 
            href="/get-started" 
            className="inline-block bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition font-bold shadow-md"
          >
            Get Started
          </Link>
        </div>

        {/* Background Image */}
        <div className="w-full">
          <Image 
            src="https://drive.google.com/uc?export=view&id=1Z3fqqLX406dTqunAOcWcfwufMpNAUNDg"
            alt="Consulting Background" 
            layout="responsive"
            width={1920}
            height={800}
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
