
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from "@/components/layout";

const Index = () => {
  const [brand, setbrand] = useState([
    { id: '', title: '', description: '' },
  ]);
  const [newbrand, setNewbrand] = useState({
    title: '',
    description: '',
  });

  useEffect(() => {

    // Check if userEmail is not set in session storage
    if (!sessionStorage.getItem('userEmail')) {
      // Redirect to the manager sign-in page
      window.location.href = 'http://localhost:5000/manager/signin';
      return; // Prevent further execution
    }


    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:3000/brand/all', {
          withCredentials: true,
        });
        const data = res.data;
        setbrand(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs once on mount

  const handleCreatebrand = async () => {
    try {
      const res = await axios.post('http://localhost:3000/brand/create', newbrand, {
        withCredentials: true,
      });
      const createdbrand = res.data;
      setbrand([...brand, createdbrand]);
      setNewbrand({ title: '', description: '' }); // Clear form after successful creation
      console.log('brand created:', createdbrand);
    } catch (error) {
      console.error('Error creating brand:', error);
    }
  };

  return (
    <Layout>
      <div className='m-6 p-4'>
        <h1 className='text-4xl font-bold mb-4'>Brands</h1>

        {/* Horizontal layout for brand List and Create New brand */}
        <div className='flex flex-wrap'>
          {/* brand List */}
          <div className='w-full lg:w-2/3 pr-4'>
            <ul>
              {brand.map((brand, index) => (
                <div key={index} className='mb-4 p-4 border rounded'>
                  <p className='text-lg font-semibold mb-2'>ID: {brand.id}</p>
                  <p className='text-lg font-semibold mb-2'>Title: {brand.title}</p>
                  <p className='text-gray-600'>Description: {brand.description}</p>
                </div>
              ))}
            </ul>
          </div>

          {/* Create New brand Form */}
          <div className='w-full lg:w-1/3 pl-4'>
            <h2 className='text-2xl font-bold mb-4'>Create New brand</h2>
            <form>
              <label htmlFor='title' className='block text-lg font-semibold mb-2'>
                Title:
                <input
                  type='text'
                  id='title'
                  value={newbrand.title}
                  onChange={(e) => setNewbrand({ ...newbrand, title: e.target.value })}
                  className='ml-2 p-2 border rounded'
                />
              </label>

              <label htmlFor='description' className='block text-lg font-semibold mb-2 mt-4'>
                Description:
                <input
                  type='text'
                  id='description'
                  value={newbrand.description}
                  onChange={(e) => setNewbrand({ ...newbrand, description: e.target.value })}
                  className='ml-2 p-2 border rounded'
                />
              </label>

              <button
                type='button'
                onClick={handleCreatebrand}
                className='mt-4 p-2 bg-blue-500 text-white rounded cursor-pointer'
              >
                Create Brand
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;