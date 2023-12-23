import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from "@/components/layout";

const Index = () => {
  const [categories, setCategories] = useState([{ id: '', title: '', description: '' }]);
  const [editCategory, setEditCategory] = useState({ id: '', title: '', description: '' });

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
        setCategories(res.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (category: any) => {
    setEditCategory(category);
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.patch(`http://localhost:3000/categories/update/${editCategory.id}`, {
        title: editCategory.title,
        description: editCategory.description,
      }, {
        withCredentials: true,
      });
      setCategories(categories.map(cat => cat.id === editCategory.id ? res.data : cat));
      setEditCategory({ id: '', title: '', description: '' }); // Reset edit form
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  return (
    <Layout>
      <div className='m-6 p-4'>
        <h1 className='text-4xl font-bold mb-4'>Categories</h1>

        {/* Horizontal layout for Categories List and Update Section */}
        <div className='flex flex-wrap'>
          {/* Categories List */}
          <div className='w-full lg:w-2/3 pr-4'>
            <ul>
              {categories.map((category, index) => (
                <div key={index} className='mb-4 p-4 border rounded'>
                  <p className='text-lg font-semibold mb-2'>ID: {category.id}</p>
                  <p className='text-lg font-semibold mb-2'>Title: {category.title}</p>
                  <p className='text-gray-600'>Description: {category.description}</p>
                  <button onClick={() => handleEdit(category)} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                    Edit
                  </button>
                </div>
              ))}
            </ul>
          </div>

          {/* Update Section */}
          {editCategory.id && (
            <div className='w-full lg:w-1/3 pl-4'>
              <div className='my-4 p-4 border rounded'>
                <h2 className='text-lg font-semibold mb-2'>Edit Category</h2>
                <input
                  type="text"
                  value={editCategory.title}
                  onChange={(e) => setEditCategory({ ...editCategory, title: e.target.value })}
                  className='mb-2 p-2 border rounded'
                  placeholder='Title'
                />
                <textarea
                  value={editCategory.description}
                  onChange={(e) => setEditCategory({ ...editCategory, description: e.target.value })}
                  className='mb-2 p-2 border rounded'
                  placeholder='Description'
                />
                <button onClick={handleUpdate} className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>
                  Update
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Index;
