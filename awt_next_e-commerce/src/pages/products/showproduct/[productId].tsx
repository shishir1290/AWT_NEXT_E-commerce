// pages/products/showproduct/[productId].tsx
import { useRouter } from 'next/router';
import Layout from '@/components/layout';
import axios from 'axios';
import Image from 'next/image';

const ShowProductDetails = ({ product }: { product: any }) => {
  const router = useRouter();

  if (router.isFallback || !product) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = () => {
    // Implement your add to cart logic here
    console.log(`Product ${product.product_name} added to cart`);
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="flex">
          <div className="w-1/2 pr-8">
            <Image
              src={`/uploads/${product.product_image}`}
              alt={product.product_name}
              width={600}
              height={400}
              objectFit="cover"
            />
          </div>
          <div className="w-1/2">
            <h1 className="text-3xl font-semibold mb-4">{product.product_name}</h1>
            <p className="text-gray-600 mb-6">{product.product_description}</p>
            <p className="text-blue-600 font-bold text-2xl mb-4">
              {product.product_price} ৳
            </p>

            {/* Additional details */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Specifications:</h2>
              <p className="text-gray-600">
                {product.product_description}
              </p>
            </div>

            {/* Add to Cart button */}
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ params }: { params: any }) {
  const { productId } = params;

  try {
    const res = await axios.get(`http://localhost:3000/product/${productId}`);
    const product = res.data;

    return {
      props: { product },
    };
  } catch (error) {
    console.error('Error fetching product details', error);
    return {
      notFound: true,
    };
  }
}

export default ShowProductDetails;
