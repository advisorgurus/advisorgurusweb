"use client";
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

// Define password schema using Zod
const passwordSchema = z.string().min(8, { message: 'Password must be at least 8 characters long.' })
  .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter.' })
  .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
  .regex(/[^A-Za-z0-9]/, { message: 'Password must contain at least one symbol.' });

const CreateAccount = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null); // State to store password error
  const router = useRouter();

  const handleCreateAccount = async () => {
    // Validate the password using Zod
    const passwordValidation = passwordSchema.safeParse(password);
    if (!passwordValidation.success) {
      console.log("error with password")
      // If validation fails, set the error message
      setPasswordError(passwordValidation.error.errors[0]?.message);
      return; // Exit the function if the password is invalid
    }

    // Clear any previous error if password is valid
    setPasswordError(null);

    const response = await fetch('http://localhost:5000/auth/create-account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        phone,
        password,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log('Account created successfully', data);
      router.push('/signin');
    } else {
      console.log('Error:', data.error);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-4 bg-gradient-to-r from-blue-50 via-white to-blue-50">
      {/* Padding for Header */}
      <div className="pt-24 pb-0 text-center">
        <h1 className="text-4xl font-bold mb-4 text-blue-900 animate-fadeIn">Create Your Account</h1>
        <p className="text-lg text-gray-700 mb-6 animate-fadeIn">
          Unlock exclusive benefits by joining our platform. Let's help you grow faster!
        </p>
      </div>

      {/* Input Form */}
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md animate-slideInUp mb-4">
        <div className="mb-4">
          <input
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Phone (optional)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:border-blue-500"
          />
        </div>
        <div className="mb-4 relative">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full p-3 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 ${passwordError ? 'border-red-500' : ''}`}
          />
          {passwordError && (
            <div className="absolute top-full left-0 mt-2 bg-red-500 text-white p-2 rounded-md shadow-lg">
              {passwordError}
            </div>
          )}
        </div>

        <button
          onClick={handleCreateAccount}
          className="w-full bg-blue-600 text-white py-3 rounded-md font-bold hover:bg-blue-700 transition duration-300 shadow-lg mb-3"
        >
          Create Account
        </button>

        <div className="mt-1 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/signin" className="text-blue-600 hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
