import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    // Check if running on the client side
    if (typeof window !== 'undefined') {
      // Access localStorage
      if (localStorage.getItem('userEmail') !== null) {
        localStorage.removeItem('userEmail');
        router.push('/buyer/login');
      } else {
        router.push('/buyer/login');
      }
    }
  }, [router]);

  // Placeholder content, as useEffect does not return JSX
  
};

export default Index;
