import { useRouter } from 'next/router'
import React from 'react'

const showproduct = () => {
    const router = useRouter();
    const rout = router.query;
  return (
    <div>showproduct</div>
  )
}

export default showproduct