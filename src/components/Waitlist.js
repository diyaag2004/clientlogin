"use client";

import { useState, useEffect } from "react";
import axios from 'axios';
import logo from '../assets/logo1.png';  // Update the path as per your project structure
import profilePlaceholder from '../assets/profile.png';  // Update the path as per your project structure
import avatar from '../assets/profile.png';
import { useNavigate } from 'react-router-dom';
import useFetch from '../hooks/fetch.hook';

export default function Waitlist() {
  const [file, setFile] = useState();
  const [{ isLoading, apiData, serverError }] = useFetch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(profilePlaceholder);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch profile data
    async function fetchProfile() {
      try {
        const response = await axios.get('/api/profile'); // Update the API endpoint as per your project structure
        setEmail(apiData?.email || '');
        setName(`${apiData?.firstName || ''} ${apiData?.lastName || ''}`);
        setProfilePhoto(apiData?.profile || profilePlaceholder);
      } catch (error) {
        console.error("Failed to fetch profile data", error);
      }
    }

    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/addEmail', { email });
      setMessage("Successfully added to waitlist!");
      setError("");
    } catch (err) {
      setMessage("");
      setError("Failed to add to waitlist. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-opacity-60 text-white pb-20 px-4 sm:px-6 lg:px-8 bodywaitlist">
    <header className="w-full flex justify-between items-center mb-8 mt-0 pt-0">
  <img src={logo} alt="Sugar Sync Logo" className="h-12" />
  <div className="flex items-center">
    <div className="bg-white border-2 rounded-full">
      <img src={apiData?.profile || file || avatar} alt="Avatar" className="h-10 w-10 rounded-full" />
    </div>
    <p className="ml-2 text-white">{apiData?.firstName}</p>
  </div>
</header>

      <div className="max-w-2xl w-full space-y-8 text-center">
       
        <p className="text-orange-500">🔥 For You and Your Loved Ones!</p>
        <h2 className="text-4xl font-bold  bg-gradient-to-r from-orange-300 via-blue-400 to-green-400 text-transparent bg-clip-text animate-gradient">
          Hey {apiData?.firstName} , Join The Waitlist For The Saviour Of Your Loved Ones With Diabetes!
        </h2>
        <p className="text-gray-400">
          We are Sugar Sync, soon to be available as an app. Our platform is designed specifically for people with diabetes. Join the waitlist to be among the first to access this life-changing resource for managing diabetes effectively.
        </p>
        <form className="mt-8 space-y-6 px-32" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={apiData?.email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div>
          <button type="submit" class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white  focus:ring-4 focus:outline-none focus:ring-pink-200 ">
<span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
Join Waitlist
</span>
</button>
            
          </div>
          {message && <p className="text-green-500 text-center">{message}</p>}
          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
}
