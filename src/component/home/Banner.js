import React from 'react'
import banner from '../../../public/images/home/banner.png';
import Image from 'next/image'

export default function Banner() {
  return (
    <>
    <div className='rounded-lg' style={{width: 'auto'} }>
    {/* , height: '250px' */}
    

    {/* <img style={{ maxWidth: '700px', maxHeight: '250px'} } src={banner} alt="Image not found in public/images/home/banner.png" /> */}

    <Image
      className='rounded-lg'
      src={banner}
      width={700}
      height={250}
      quality={100} // default is 75
      alt="Picture of banner"
    />

    </div>
    </>
  )
}
