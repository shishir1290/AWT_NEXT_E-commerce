import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import Layout from "@/components/layout";
import Carousel from "@/components/carousel";
import Link from "next/link";

export default function Page() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/product");
        const productsData = res.data;

        console.log("Products", productsData);

        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <Carousel />
      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-semibold mb-8">Our Products</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.length > 0 ? (
              products.map((product: any, index: number) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                  <div className="mb-4">
                    <Link
                      href={`/products/showproduct/[productId]`}
                      as={`/products/showproduct/${product.id}`}
                    >
                        <Image
                          src={`/uploads/${product.product_image}`}
                          alt={product.product_name}
                          width={300}
                          height={200}
                          objectFit="cover"
                        />
                    </Link>
                  </div>
                  <h2 className="text-xl font-semibold mb-2">
                    {product.product_name}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {product.product_description}
                  </p>
                  <p className="text-blue-600 font-bold">
                    {product.product_price} ৳
                  </p>
                </div>
              ))
            ) : (
              <p>No products available</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
