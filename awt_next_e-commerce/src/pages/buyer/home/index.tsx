import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import Layout from "@/components/layout";
import Carousel from "@/components/carousel";
import Link from "next/link";

const PAGE_SIZE = 30;

interface Product {
  id: number;
  product_name: string;
  product_description: string;
  product_price: number;
  category: {
    CategoryName: string;
  };
  brand: {
    BrandName: string;
  };
  // Add more fields as needed
}

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/product?page=${currentPage}&limit=${PAGE_SIZE}`);
        const productsData = res.data;

        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products data", error);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <Layout>
      <Carousel />
      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-semibold mb-8">Our Products</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.length > 0 ? (
              products.map((product, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-md flex flex-col h-full"
                >
                  <div className="mb-4 flex-grow-0">
                    <Link
                      href={`/products/showproduct/${product.id}`}
                      as={`/products/showproduct/${product.id}`}
                    >
                      <img
                        src={`http://localhost:3000/product/getImages/${product.id}`}
                        alt={product.product_name}
                        width={300}
                        height={200}
                      />
                    </Link>
                  </div>
                  <div className="flex-grow flex flex-col justify-between mt-4">
                    <div></div>
                    <div>
                      <h2 className="text-xl font-semibold mb-2">
                        {product.product_name}
                      </h2>
                      <p className="text-gray-600 mb-4">
                        {product.product_description}
                      </p>

                      <p className="text-blue-600 font-bold">
                        {product.product_price} ৳
                      </p>
                      {/* Additional product information */}
                      <p className="text-sm text-gray-500">
                        Category: {product.category ? product.category.CategoryName : ''}
                      </p>
                      <p className="text-sm text-gray-500">
                        Brand: {product.brand ? product.brand.BrandName : ''}
                      </p>
                      {/* Add more fields as needed */}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No products available</p>
            )}
          </div>

          <div className="mt-8 flex justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
                      