import React from 'react';
import Image from 'next/image';
import LenovoPc124 from '../../../../public/images/Products/LenovoPc124.jpg';

const SingleReceiver = ({ message, date }) => {
  return (
    <>
    <div style={{width: "auto", height:"auto"}} class="flex flex-row justify-between bg-PrimaryColorDark ">
      <div className='justify-self-start'>receiver 1</div>
    </div>
    </>
  );
};

export default SingleReceiver;