
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from "@/components/layout";

const Index = () => {
  const [categories, setCategories] = useState([
    { id: '', title: '', description: '' },
  ]);
  const [newCategory, setNewCategory] = useState({
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

  const handleCreateCategory = async () => {
    try {
      const res = await axios.post('http://localhost:3000/categories/create', newCategory, {
        withCredentials: true,
      });
      const createdCategory = res.data;
      setCategories([...categories, createdCategory]);
      setNewCategory({ title: '', description: '' }); // Clear form after successful creation
      console.log('Category created:', createdCategory);
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  return (
    <Layout>
      <div className='m-6 p-4'>
        <h1 className='text-4xl font-bold mb-4'>Categories</h1>

        {/* Horizontal layout for Categories List and Create New Category */}
        <div className='flex flex-wrap'>
          {/* Categories List */}
          <div className='w-full lg:w-2/3 pr-4'>
            <ul>
              {categories.map((category, index) => (
                <div key={index} className='mb-4 p-4 border rounded'>
                  <p className='text-lg font-semibold mb-2'>ID: {category.id}</p>
                  <p className='text-lg font-semibold mb-2'>Title: {category.title}</p>
                  <p className='text-gray-600'>Description: {category.description}</p>
                </div>
              ))}
            </ul>
          </div>

          {/* Create New Category Form */}
          <div className='w-full lg:w-1/3 pl-4'>
            <h2 className='text-2xl font-bold mb-4'>Create New Category</h2>
            <form>
              <label htmlFor='title' className='block text-lg font-semibold mb-2'>
                Title:
                <input
                  type='text'
                  id='title'
                  value={newCategory.title}
                  onChange={(e) => setNewCategory({ ...newCategory, title: e.target.value })}
                  className='ml-2 p-2 border rounded'
                />
              </label>

              <label htmlFor='description' className='block text-lg font-semibold mb-2 mt-4'>
                Description:
                <input
                  type='text'
                  id='description'
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  className='ml-2 p-2 border rounded'
                />
              </label>

              <button
                type='button'
                onClick={handleCreateCategory}
                className='mt-4 p-2 bg-blue-500 text-white rounded cursor-pointer'
              >
                Create Category
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;