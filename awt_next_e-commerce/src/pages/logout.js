import React, { useEffect } from 'react'
import { useRouter } from 'next/router';

export default function logout() {
  const router = useRouter();
  useEffect(()=> {
    localStorage.clear();
    
    router.push("/");
    
  }, [])
  return (
    <div>logout</div>
  )
}
