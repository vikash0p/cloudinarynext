'use client'
import React, { useState } from 'react'
import { CldUploadWidget } from 'next-cloudinary';
import { CldImage } from 'next-cloudinary';
import Image from 'next/image';


const Home = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    images: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    console.log('Form data submitted:', formData?.images?.url);
    // You can add your form submission logic here

    setFormData({
      name: '',
      email: '',
      password: '',
      images: '',
    })
  };

  return (
    <div className="container mx-auto mt-8">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Your Name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Your Email"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Your Password"
          />

        </div>



        <div className="mb-6 transition-all duration-300 ease-in-out">
          <div className="flex justify-between">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Images">
              Image
            </label>
            <div>
              {formData?.images?.url ? (
                <button
                  className="bg-red-600 px-6 py-2 rounded-xl text-lg text-white my-2 transition-all duration-300 ease-in-out"
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      images: ''
                    }));
                    alert('This image is deleted!');
                  }}
                >
                  Choose another image
                </button>
              ) : (
                " "
              )}
            </div>
          </div>

          <CldUploadWidget
            signatureEndpoint="/api/sign-image"
            onSuccess={(result, { widget }) => {
              const imageUrl = result?.info;
              setFormData((prevData) => ({ ...prevData, images: imageUrl }));
              widget.close();
            }}
          >
            {({ open }) => {
              function handleOnClick(e) {
                e.preventDefault();
                setFormData((prevData) => ({ ...prevData, images: '' }));
                open();
              }
              return (
                <>
                  {!formData?.images?.url ? (
                    <button
                      onClick={handleOnClick}
                      className="bg-green-600 px-6 py-2 text-white text-lg rounded-md transition-all duration-300 ease-in-out"
                    >
                      Upload an Image
                    </button>
                  ) : (
                    <CldImage
                      src={formData?.images?.url}
                      alt="cloudinary Image"
                      width="500"
                      height="300"
                      
                      className={`transition-all duration-300 ease-in-out `}
                    />
                  )}
                </>
              );
            }}
          </CldUploadWidget>
        </div>



        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-5 rounded focus:outline-none focus:shadow-outline"
          >
            Sign Up
          </button>
        </div>
      </form >
    </div >
  );
};

export default Home;
