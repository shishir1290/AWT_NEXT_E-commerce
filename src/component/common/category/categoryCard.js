import React from 'react'
import processor from "../../../../public/images/home/category/processor.png";
import Image from 'next/image';

export default function CategoryCard({categoryName}) {
  return (
    <>
    <div  className="border-2 rounded-lg ">
   
    <button style={{width: "90px", height:"90px",  borderRadius:"9px" }}  className="flex flex-col justify-center content-center">

        {/* <img style={{width: "40px"}} src="~/Content/images/home/category/processor.png" alt="image not found from categoryCard" /> */}
        {/* processor */}
        <Image
                    src={processor}
                    width={60}
                    // height={200}
                    className='rounded-full mx-auto'
                    quality={75} // default is 75
                    alt="Logo"
                />
      {categoryName}
    </button>
</div>

    </>
  )
}
