import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from "@/components/layout";

interface brand {
  id: string;
  title: string;
  description: string;
}

const Index = () => {
  const [brand, setbrand] = useState<brand[]>([]);
  const [searchId, setSearchId] = useState('');
  const [searchedbrand, setSearchedbrand] = useState<brand | null>(null);

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

  useEffect(() => {
    const fetchbrand = async () => {
      if (searchId) {
        try {
          const res = await axios.get(`http://localhost:3000/brand/${searchId}`, {
            withCredentials: true,
          });
          setSearchedbrand(res.data);
        } catch (error) {
          console.error('Error fetching brand:', error);
          setSearchedbrand(null);
        }
      }
    };

    fetchbrand();
  }, [searchId]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchId(event.target.value);
  };

  return (
    <Layout>
    <div className='m-6 p-4'>
      <h1 className='text-4xl font-bold mb-4'>brand</h1>
      <input
        type="text"
        value={searchId}
        onChange={handleSearchChange}
        placeholder="Search by ID"
        className="mb-4 p-2 border rounded"
      />
      {searchedbrand ? (
        <div className='mb-4 p-4 border rounded'>
          <p className='text-lg font-semibold mb-2'>ID: {searchedbrand.id}</p>
          <p className='text-lg font-semibold mb-2'>Title: {searchedbrand.title}</p>
          <p className='text-gray-600'>Description: {searchedbrand.description}</p>
        </div>
      ) : (
        <ul>
          {brand.map((brand, index) => (
            <div key={index} className='mb-4 p-4 border rounded'>
              <p className='text-lg font-semibold mb-2'>ID: {brand.id}</p>
              <p className='text-lg font-semibold mb-2'>Title: {brand.title}</p>
              <p className='text-gray-600'>Description: {brand.description}</p>
            </div>
          ))}
        </ul>
      )}
    </div>
    </Layout>
  );
};

export default Index;
