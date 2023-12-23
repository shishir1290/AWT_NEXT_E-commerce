import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from "@/components/layout";

interface Category {
  id: string;
  title: string;
  description: string;
}

const Index = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchId, setSearchId] = useState('');
  const [searchedCategory, setSearchedCategory] = useState<Category | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:3000/categories/all', {
          withCredentials: true,
        });
        setCategories(res.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {

        // Check if userEmail is not set in session storage
        if (!sessionStorage.getItem('userEmail')) {
          // Redirect to the manager sign-in page
          window.location.href = 'http://localhost:5000/manager/signin';
          return; // Prevent further execution
        }


    const fetchCategory = async () => {
      if (searchId) {
        try {
          const res = await axios.get(`http://localhost:3000/categories/${searchId}`, {
            withCredentials: true,
          });
          setSearchedCategory(res.data);
        } catch (error) {
          console.error('Error fetching category:', error);
          setSearchedCategory(null);
        }
      }
    };

    fetchCategory();
  }, [searchId]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchId(event.target.value);
  };

  return (
    <Layout>
    <div className='m-6 p-4'>
      <h1 className='text-4xl font-bold mb-4'>Categories</h1>
      <input
        type="text"
        value={searchId}
        onChange={handleSearchChange}
        placeholder="Search by ID"
        className="mb-4 p-2 border rounded"
      />
      {searchedCategory ? (
        <div className='mb-4 p-4 border rounded'>
          <p className='text-lg font-semibold mb-2'>ID: {searchedCategory.id}</p>
          <p className='text-lg font-semibold mb-2'>Title: {searchedCategory.title}</p>
          <p className='text-gray-600'>Description: {searchedCategory.description}</p>
        </div>
      ) : (
        <ul>
          {categories.map((category, index) => (
            <div key={index} className='mb-4 p-4 border rounded'>
              <p className='text-lg font-semibold mb-2'>ID: {category.id}</p>
              <p className='text-lg font-semibold mb-2'>Title: {category.title}</p>
              <p className='text-gray-600'>Description: {category.description}</p>
            </div>
          ))}
        </ul>
      )}
    </div>
    </Layout>
  );
};

export default Index;
