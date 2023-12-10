import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import React from "react";

import Image from 'next/image';
import Layout from "@/components/layout";

const index = () => {
  return (
    <Layout>
    <div className="bg-gray-100 min-h-screen">
      
      Profile
      <Image
        src={`https://i.ibb.co/prf3kvv/Logo.png`}
        width={500}
        height={500}
        alt="Picture of the author"
      />
    </div>
    </Layout>
  );
};

export default index;
