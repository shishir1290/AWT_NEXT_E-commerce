import Layout from "@/components/layout";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface Products {
  id: string;
  product_name: string;
  description: string;
  price: number;
  currency: string;
  quantity: number;
  unit: string;
}

interface SearchProductProps {
  product: Products | null;
}

const SearchProductByCategory: React.FC<SearchProductProps> = () => {
  const router = useRouter();
  const categoryId = router.query.index;

  const [isLoading, setIsLoading] = useState(true);
  const [originalProducts, setOriginalProducts] = useState<Products[]>([]);
  const [products, setProducts] = useState<Products[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/product/by-category/${categoryId}`
        );
        console.log("API Response:", res);

        const fetchedProducts = res.data;
        if(fetchedProducts.length > 0) {
        setIsLoading(false);
        setOriginalProducts(fetchedProducts);
        setProducts(fetchedProducts);
        }else{
          console.error("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product details", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [categoryId]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const sortProductsByPriceLowToHigh = () => {
    const sortedProducts = [...originalProducts].sort(
      (a, b) => a.price - b.price
    );
    setProducts(sortedProducts);
    closeDropdown();
  };

  const sortProductsByPriceHighToLow = () => {
    const sortedProducts = [...originalProducts].sort(
      (b, a) => b.price - a.price
    );
    setProducts(sortedProducts);
    closeDropdown();
  };

  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto p-4 relative">
          <h1 className="text-3xl font-semibold mb-8">
            "{products.length}" items found.
          </h1>

          <button
            onClick={toggleDropdown}
            className="text-black border-2 border-black  hover:bg-slate-300 rounded-full text-base px-5 py-2.5 text-center inline-flex items-center absolute top-4 right-4"
            type="button"
          >
            Sort By :{" "}
            <svg
              className="w-2.5 h-2.5 ms-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          {isDropdownOpen && (
            <div className="z-10 bg-white divide-y divide-gray-100 rounded-lg border-2 border-gray-400 shadow w-40 absolute top-16 right-4">
              <ul className="py-2 text-sm text-gray-700">
                <li className="hover:bg-gray-100">
                  <button
                    className="block px-4 py-2 "
                    onClick={sortProductsByPriceLowToHigh}
                  >
                    Price (low to high)
                  </button>
                  <hr />
                </li>
                <li className="hover:bg-gray-100">
                  <button
                    className="block px-4 py-2 "
                    onClick={sortProductsByPriceHighToLow}
                  >
                    Price (high to low)
                  </button>
                </li>
              </ul>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-16">
            {products.length > 0 ? (
              products.map((product: any, index: number) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-md flex flex-col h-full"
                >
                  <div className="mb-4 flex-grow-0">
                    <Link
                      href={`/products/showproduct/[productId]`}
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
                      <p className="text-sm text-gray-500">
                        Category:{" "}
                        {product.category ? product.category.CategoryName : ""}
                      </p>
                      <p className="text-sm text-gray-500">
                        Brand: {product.brand ? product.brand.BrandName : ""}
                      </p>
                    </div>
                  </div>
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
};

export default SearchProductByCategory;
