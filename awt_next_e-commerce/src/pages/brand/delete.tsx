import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from "@/components/layout";

const Index = () => {
  const [brand, setbrand] = useState([
    { id: '', title: '', description: '' },
  ]);

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

const handleDelete = async (brandId: string) => {
    try {
      // Use the brandId parameter to specify which brand to delete
      const res = await axios.delete(`http://localhost:3000/brand/delete/${brandId}`, {
        withCredentials: true,
      });
      
      // Update the brand after deletion
      setbrand(brand.filter(brand => brand.id !== brandId));
      
      console.log(res.data); // You can log the response if needed
    } catch (error) {
      console.error('Error deleting brand:', error);
    }
  };

  return (
    <Layout>
    <div className='m-6 p-4'>
      <h1 className='text-4xl font-bold mb-4'>brand</h1>
      <ul>
        {brand.map((brand, index) => (
          <div key={index} className='mb-4 p-4 border rounded'>
            <p className='text-lg font-semibold mb-2'>ID: {brand.id}</p>
            <p className='text-lg font-semibold mb-2'>Title: {brand.title}</p>
            <p className='text-gray-600'>Description: {brand.description}</p>
            
            {/* Add delete button with onClick handler */}
            <button onClick={() => handleDelete(brand.id)} className='bg-red-500 text-white px-4 py-2 mt-2 rounded'>
              Delete
            </button>
          </div>
        ))}
      </ul>
    </div>
    </Layout>
  );
};

export default Index;
