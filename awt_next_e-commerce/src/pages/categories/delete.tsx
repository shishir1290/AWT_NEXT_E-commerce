import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from "@/components/layout";

const Index = () => {
  const [categories, setCategories] = useState([
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
        const res = await axios.get('http://localhost:3000/categories/all', {
          withCredentials: true,
        });
        const data = res.data;
        setCategories(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs once on mount

const handleDelete = async (categoryId: string) => {
    try {
      // Use the categoryId parameter to specify which category to delete
      const res = await axios.delete(`http://localhost:3000/categories/delete/${categoryId}`, {
        withCredentials: true,
      });
      
      // Update the categories after deletion
      setCategories(categories.filter(category => category.id !== categoryId));
      
      console.log(res.data); // You can log the response if needed
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <Layout>
    <div className='m-6 p-4'>
      <h1 className='text-4xl font-bold mb-4'>Categories</h1>
      <ul>
        {categories.map((category, index) => (
          <div key={index} className='mb-4 p-4 border rounded'>
            <p className='text-lg font-semibold mb-2'>ID: {category.id}</p>
            <p className='text-lg font-semibold mb-2'>Title: {category.title}</p>
            <p className='text-gray-600'>Description: {category.description}</p>
            
            {/* Add delete button with onClick handler */}
            <button onClick={() => handleDelete(category.id)} className='bg-red-500 text-white px-4 py-2 mt-2 rounded'>
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
