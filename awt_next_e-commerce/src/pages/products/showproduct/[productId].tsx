// Import necessary libraries and components
import { useRouter } from 'next/router';
import Layout from "@/components/layout";
import axios from "axios";
import Image from "next/image";
import Cookies from "js-cookie";
import { useState } from "react";
import { useCart } from "@/components/cartContext";

export async function getServerSideProps({ params }: { params: any }) {
  const { productId } = params;

  try {
    const res = await axios.get(`http://localhost:3000/product/${productId}`);
    const product = res.data;

    return {
      props: { product },
    };
  } catch (error) {
    console.error("Error fetching product details", error);
    return {
      notFound: true,
    };
  }
}



// Main component
const ShowProductDetails = ({ product }: { product: any }) => {
  const router = useRouter();
  const { updateCartCount } = useCart();

  const setCartItems = (arg0: any[]) => {
    localStorage.setItem("cartItem", arg0.toString());
  }

  // State to track cart items
  // const [cartItems, setCartItems] = useState<any[]>([]);

  if (router.isFallback || !product) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = () => {
    // Get the existing cart data from cookies
    const existingCart = Cookies.get("cart")
      ? JSON.parse(Cookies.get("cart")!)
      : [];

    // Check if the product is already in the cart
    const productInCart = existingCart.find(
      (item: { id: string }) => item.id === product.id
    );

    if (productInCart) {
      // If the product is already in the cart, update the quantity
      productInCart.quantity += 1;
    } else {
      // If the product is not in the cart, add it with a quantity of 1
      existingCart.push({
        id: product.id,
        quantity: 1,
        name: product.product_name,
        price: product.product_price,
      });
    }

    // Save the updated cart data in cookies
    Cookies.set("cart", JSON.stringify(existingCart), { expires: 7 }); // Set expiration for 7 days

    // Update the state to reflect the current cart items
    setCartItems(existingCart);

    // Implement your logic to upload the cart data to the database using Axios
    axios
      .post(`http://localhost:3000/cart/${product.id}`, { cart: existingCart })
      .then((response) => {
        console.log("Cart data uploaded to the database", response.data);
      })
      .catch((error) => {
        console.error("Error uploading cart data to the database", error);
      });

    const newCartCount = existingCart.length; // or calculate based on your logic
    updateCartCount(newCartCount);

    console.log(`Product ${product.product_name} added to cart`);
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="flex">
          <div className="w-1/2 pr-8">
            <Image
              src={`http://localhost:3000/product/getImages/${product.id}`}
              alt={product.product_name}
              width={600}
              height={400}
              objectFit="cover"
            />
          </div>
          <div className="w-1/2">
            <h1 className="text-3xl font-semibold mb-4">
              {product.product_name}
            </h1>
            <p className="text-gray-600 mb-6">{product.product_description}</p>
            <p className="text-blue-600 font-bold text-2xl mb-4">
              {product.product_price} ৳
            </p>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Specifications:</h2>
              <p className="text-gray-600">{product.product_description}</p>
              <p className="text-sm text-gray-500">
                Category:{" "}
                {product.category ? product.category.CategoryName : ""}
              </p>
              <p className="text-sm text-gray-500">
                Brand: {product.brand ? product.brand.BrandName : ""}
              </p>
            </div>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            {/* <CartDisplay cartItems={cartItems} /> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ShowProductDetails;
