"use client";

import { useEffect, useState } from 'react';
import Script from 'next/script'; // Import Script for loading external scripts dynamically

const Bookings = () => {
  const [calendlyLoaded, setCalendlyLoaded] = useState(false);

  useEffect(() => {
    // Ensure Calendly is loaded before setting calendlyLoaded to true
    if (window.Calendly) {
      setCalendlyLoaded(true);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-6 bg-gradient-to-r from-blue-50 via-white to-blue-50 pt-28">
      {/* Include Calendly widget CSS and JS */}
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
        onLoad={() => setCalendlyLoaded(true)}
      />

      {/* Title */}
      <h1 className="text-5xl font-extrabold mb-6 text-blue-800 animate-fadeIn text-center">
        Schedule Your Session with Us!
      </h1>

      {/* Subtitle */}
      <p className="text-center text-lg mb-10 text-gray-700 max-w-3xl leading-relaxed mx-auto">
        Unlock the power of expert consulting. Choose a time that works best for you and let us help you achieve your business goals.
      </p>

      {/* CTA: Professional Subtitle for Booking */}
      <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center animate-fadeIn">
        Book Your Consultation Today!
      </h2>
      <p className="text-center text-gray-600 max-w-xl mx-auto mb-8">
        Select a convenient time from our calendar below to schedule your consultation with one of our experts.
      </p>

      <div className="text-center">
          <a
            href="https://calendly.com/victormagana/30min" // Replace with your actual Calendly link
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white py-3 px-8 rounded-md font-bold hover:text-blue-600 hover:bg-white transition duration-300 shadow-lg"
          >
            Schedule Time with Me
          </a>
      </div>

      {/* Support Section */}
      <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow-md text-center transition-opacity duration-500 hover:opacity-90">
        <p className="text-gray-600 font-medium">
          Need help? Reach out to our support team at{" "}
          <a href="mailto:support@advisorgurus.com" className="text-blue-600 hover:underline">
            support@advisorgurus.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default Bookings;
