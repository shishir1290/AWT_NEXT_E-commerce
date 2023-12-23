import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from "@/components/layout";

const ManagerProfile = () => {
  const [managerInfo, setManagerInfo] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:3000/manager/profile', {
          withCredentials: true,
        });
        const data = res.data;
        setManagerInfo(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs once on mount

  return (
    <Layout>
      <div className='m-6 p-4'>
        <h1 className='text-4xl font-bold mb-4'>Manager Profile</h1>
        <div className='mb-4 p-4 border rounded'>
          <p className='text-lg font-semibold mb-2'>Welcome, {managerInfo.manager}!</p>
          {/* Display other manager profile information here */}
        </div>
      </div>
    </Layout>
  );
};

export default ManagerProfile;
