import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from "@/components/layout";

const Index = () => {
  const [brand, setbrand] = useState([{ id: '', title: '', description: '' }]);
  const [editbrand, setEditbrand] = useState({ id: '', title: '', description: '' });

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
        setbrand(res.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (brand: any) => {
    setEditbrand(brand);
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.patch(`http://localhost:3000/brand/update/${editbrand.id}`, {
        title: editbrand.title,
        description: editbrand.description,
      }, {
        withCredentials: true,
      });
      setbrand(brand.map(cat => cat.id === editbrand.id ? res.data : cat));
      setEditbrand({ id: '', title: '', description: '' }); // Reset edit form
    } catch (error) {
      console.error('Error updating brand:', error);
    }
  };

  return (
    <Layout>
      <div className='m-6 p-4'>
        <h1 className='text-4xl font-bold mb-4'>Brand</h1>

        {/* Horizontal layout for brand List and Update Section */}
        <div className='flex flex-wrap'>
          {/* brand List */}
          <div className='w-full lg:w-2/3 pr-4'>
            <ul>
              {brand.map((brand, index) => (
                <div key={index} className='mb-4 p-4 border rounded'>
                  <p className='text-lg font-semibold mb-2'>ID: {brand.id}</p>
                  <p className='text-lg font-semibold mb-2'>Title: {brand.title}</p>
                  <p className='text-gray-600'>Description: {brand.description}</p>
                  <button onClick={() => handleEdit(brand)} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                    Edit
                  </button>
                </div>
              ))}
            </ul>
          </div>

          {/* Update Section */}
          {editbrand.id && (
            <div className='w-full lg:w-1/3 pl-4'>
              <div className='my-4 p-4 border rounded'>
                <h2 className='text-lg font-semibold mb-2'>Edit brand</h2>
                <input
                  type="text"
                  value={editbrand.title}
                  onChange={(e) => setEditbrand({ ...editbrand, title: e.target.value })}
                  className='mb-2 p-2 border rounded'
                  placeholder='Title'
                />
                <textarea
                  value={editbrand.description}
                  onChange={(e) => setEditbrand({ ...editbrand, description: e.target.value })}
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
