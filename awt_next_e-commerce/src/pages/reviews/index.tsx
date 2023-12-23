import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from "@/components/layout";

const Index = () => {
  const [review, setreview] = useState([
    { id: '', buyer: '', product: '', review: '' },
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
        const res = await axios.get('http://localhost:3000/review/all', {
          withCredentials: true,
        });
        const data = res.data;
        setreview(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs once on mount

  return (
<Layout>
  <div className='container mx-auto my-8 p-6 bg-white shadow-lg rounded-md'>
    <h1 className='text-4xl font-bold text-center text-gray-800 mb-6'>Reviews</h1>
    <ul>
      {review.map((review, index) => (
        <li key={index} className='mb-6 p-4 border border-gray-300 rounded-md'>
          <div className='flex flex-col lg:flex-row justify-between items-center'>
            <div className='mb-2 lg:mb-0'>
              <span className='text-lg font-semibold'>ID: {review.id}</span> |
              <span className='text-lg font-semibold'>Buyer: {review.buyer}</span>
            </div>
            <div className='mt-2 lg:mt-0 lg:ml-4'>
              <p className='text-gray-700'>Product: {review.product}</p>
              <p className='text-gray-600'>Review: {review.review}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>
</Layout>



  );
};

export default Index;
