import { useEffect, useState } from "react";
import Layout from "@/components/layout";
import Link from "next/link";

export default function Page() {
  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen p-5">
        {/* Categories Section */}
        <div className="categories-section mb-8">
          <h2 className="text-2xl font-bold mb-4">Manage Categories</h2>
          <div className="flex flex-row space-x-4">
            <Link href="http://localhost:5000/categories/">
              <span className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 cursor-pointer">Show All</span>
            </Link>
            <Link href="http://localhost:5000/categories/create">
              <span className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 cursor-pointer">Create</span>
            </Link>
            <Link href="http://localhost:5000/categories/delete">
              <span className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 cursor-pointer">Delete</span>
            </Link>
            <Link href="http://localhost:5000/categories/search">
              <span className="px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-600 cursor-pointer">Search</span>
            </Link>
            <Link href="http://localhost:5000/categories/update">
              <span className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-700 cursor-pointer">Update</span>
            </Link>
          </div>
        </div>

        {/* Brand */}
        <div className="brand-section mb-8">
          <h2 className="text-2xl font-bold mb-4">Manage Brands</h2>
          <div className="flex flex-row space-x-4">
            <Link href="http://localhost:5000/brand/">
              <span className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 cursor-pointer">Show All</span>
            </Link>
            <Link href="http://localhost:5000/brand/create">
              <span className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 cursor-pointer">Create</span>
            </Link>
            <Link href="http://localhost:5000/brand/delete">
              <span className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 cursor-pointer">Delete</span>
            </Link>
            <Link href="http://localhost:5000/brand/search">
              <span className="px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-600 cursor-pointer">Search</span>
            </Link>
            <Link href="http://localhost:5000/brand/update">
              <span className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-700 cursor-pointer">Update</span>
            </Link>
          </div>
        </div>
          
          {/* Reviews */} 
          <div className="review-section mb-8">
          <h2 className="text-2xl font-bold mb-4">View Product Review</h2>
          <div className="flex flex-row space-x-4">
            <Link href="http://localhost:5000/reviews/">
              <span className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 cursor-pointer">Show All</span>
            </Link>
            <Link href="http://localhost:5000/review/search">
              <span className="px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-600 cursor-pointer">Search</span>
            </Link>
          </div>
        </div>

        {/* Products */}
      </div>
    </Layout>
  );
}
