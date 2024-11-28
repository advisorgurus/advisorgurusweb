// MyAccount.tsx

"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

// Define the Booking interface to specify the type of each booking item
interface Booking {
  consultantName: string;
  meetingLink: string;
  date: string;
  time: string;
}

const MyAccount = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);  // Specify Booking[] type
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordUpdateStatus, setPasswordUpdateStatus] = useState('');
  const router = useRouter();

  // Check if user is authenticated
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.push('/signin');
    } else {
      fetchBookings(token);
    }
  }, []);

  // Fetch user bookings from the backend
  const fetchBookings = async (token: string) => {
    try {
      const response = await axios.get('http://localhost:5000/auth/user/bookings', {  // Updated route
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(response.data.bookings || []);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
      setBookings([]);
    }
  };

  // Handle password update
  const handlePasswordUpdate = async () => {
    if (newPassword !== confirmPassword) {
      setPasswordUpdateStatus("Passwords do not match.");
      return;
    }

    const token = localStorage.getItem('authToken');
    try {
      await axios.put(
        'http://localhost:5000/auth/user/update-password',  // Updated route
        { password: newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPasswordUpdateStatus("Password updated successfully.");
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      setPasswordUpdateStatus("Failed to update password.");
      console.error("Password update error:", error);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-r from-blue-50 via-white to-blue-50 pt-28 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-blue-800 mb-6">My Account</h1>

      {/* Bookings Section */}
      {/* <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your Bookings</h2>
        {bookings.length > 0 ? (
          <ul className="space-y-4">
            {bookings.map((booking, index) => (
              <li key={index} className="p-4 bg-gray-100 rounded-lg shadow-sm">
                <p className="text-gray-600">Meeting with: {booking.consultantName}</p>
                <p className="text-gray-600">Date: {booking.date}</p>
                <p className="text-gray-600">Time: {booking.time}</p>
                <p className="text-gray-600">Meeting Link: <a href={booking.meetingLink} className="text-blue-600 underline">{booking.meetingLink}</a></p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">You do not have any upcoming meetings.</p>
        )}
      </div> */}

      {/* Update Password Section */}
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Update Password</h2>
        <input
          type="password"
          placeholder="New Password"
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          onClick={handlePasswordUpdate}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition duration-300 shadow-lg"
        >
          Update Password
        </button>
        {passwordUpdateStatus && (
          <p className="mt-4 text-center text-red-500">{passwordUpdateStatus}</p>
        )}
      </div>
    </div>
  );
};

export default MyAccount;
