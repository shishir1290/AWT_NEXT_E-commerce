import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const Index = () => {
    const router = useRouter();



useEffect(() => {
            // Clearing all session storage
            sessionStorage.clear();

            // Redirecting to the specified URL
            router.push('http://localhost:5000/manager/signin');

}, [router]);

  
  
};

export default Index;