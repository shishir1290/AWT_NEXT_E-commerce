import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import { useRouter } from "next/router";
import Layout from "@/components/layout";
import axios from "axios";

interface CartItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  image: string; // URL to the product image
}

const Index = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [userFirstName, setUserFirstName] = useState<string | null>(null);
  const [userLastName, setUserLastName] = useState<string | null>(null);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const [userPhone, setUserPhone] = useState<string | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  const fetchData = async () => {
    let accessToken;

    accessToken =
      sessionStorage.getItem("access_token") ||
      localStorage.getItem("access_token");

    try {
      if (!accessToken) {
        router.push("/buyer/login");
        return;
      }

      let decodedToken;

      try {
        decodedToken = jwt.decode(accessToken);
      } catch (verifyError) {
        console.error("Error during token verification:", verifyError);
        return;
      }

      const buyerEmail = (decodedToken as JwtPayload).email as string;
      const id = parseInt((decodedToken as jwt.JwtPayload)?.sub || "", 10);

      const buyerFirstName = (decodedToken as JwtPayload).firstName as string;
      const buyerLastName = (decodedToken as JwtPayload).lastName as string;
      const buyerimage = `http://localhost:3000/buyer/getImages/${id}`;
      const buyerAddress = (decodedToken as JwtPayload).address as string;
      const buyerPhone = (decodedToken as JwtPayload).phoneNo as string;

      setUserEmail(buyerEmail);
      setUserId(id);
      setUserFirstName(buyerFirstName);
      setUserLastName(buyerLastName);
      setUserImage(buyerimage);
      setUserAddress(buyerAddress);
      setUserPhone(buyerPhone);
    } catch (error) {
      console.error("Error decoding token:", (error as Error).message);
    }
  };

  const fullName = userFirstName + " " + userLastName;

  const getCartItemsFromCookies = (): CartItem[] => {
    const existingCart = Cookies.get("cart")
      ? JSON.parse(Cookies.get("cart")!)
      : [];

    console.log("Existing Cart:", existingCart);

    return existingCart;
  };

  useEffect(() => {
    fetchData(); // Call fetchData to check and handle the access token
    const cartItems = getCartItemsFromCookies();
    setCartItems(cartItems);
  }, []);

  const handlePaymentSelection = (value: string) => {
    setSelectedPayment(value);
  };

  // ----------------------------------------------------------------------------------------------
  const PhoneAndPasswordInput = () => {
    return (
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number:
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="Enter phone number"
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter password"
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
      </div>
    );
  };

  //-----------------------------------------------------------------------------------------------------

  const CardDetailsInput = () => {
    const [cardHolderName, setCardHolderName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvc, setCvc] = useState("");

    const handleCardNumberChange = (e: any) => {
      // Format card number by adding a space every 4 digits
      const numericValue = e.target.value.replace(/\D/g, "");

      // Ensure the card number has a maximum length of 16 digits
      if (numericValue.length <= 16) {
        // Format card number by adding a space every 4 digits
        const formattedCardNumber = numericValue
          .replace(/(\d{4})/g, "$1 ")
          .trim();
        setCardNumber(formattedCardNumber);
      }
    };

    const handleExpiryDateChange = (e: any) => {
      // Extract only digits from the input
      const numericValue = e.target.value.replace(/\D/g, "");

      // Ensure the expiry date has a maximum length of 4 digits
      if (numericValue.length <= 4) {
        // Format expiry date with MM/YY format
        const formattedExpiryDate = numericValue
          .replace(/(\d{2})(\d{0,2})/, "$1/$2")
          .trim();
        setExpiryDate(formattedExpiryDate);
      }
    };

    const handleCvcChange = (e: any) => {
      // Limit CVC code to 3 digits
      const formattedCvc = e.target.value
        .replace(/[^0-9]/g, "")
        .substring(0, 3);
      setCvc(formattedCvc);
    };

    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="cardHolderName"
            className="block text-sm font-medium text-gray-700"
          >
            Card Holder Name:
          </label>
          <input
            type="text"
            id="cardHolderName"
            name="cardHolderName"
            placeholder="Enter card holder name"
            value={cardHolderName}
            onChange={(e) => setCardHolderName(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div>
          <label
            htmlFor="cardNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Card Number:
          </label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            placeholder="0000 0000 0000 0000"
            value={cardNumber}
            onChange={handleCardNumberChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div>
          <label
            htmlFor="expiryDate"
            className="block text-sm font-medium text-gray-700"
          >
            Expiry Date:
          </label>
          <input
            type="text"
            id="expiryDate"
            name="expiryDate"
            placeholder="MM/YY"
            value={expiryDate}
            onChange={handleExpiryDateChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div>
          <label
            htmlFor="cvc"
            className="block text-sm font-medium text-gray-700"
          >
            CVC Code:
          </label>
          <input
            type="text"
            id="cvc"
            name="cvc"
            placeholder="Enter CVC code"
            value={cvc}
            onChange={handleCvcChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
      </div>
    );
  };

  //-----------------------------------------------------------------------------------------------

  const totalPrice =
    cartItems.reduce(
      (total: number, item: { quantity: number; price: number }) =>
        total + item.quantity * item.price,
      0
    ) +
    cartItems.reduce((VAT, item) => VAT + item.quantity * item.price * 0.05, 0);

  //-----------------------------------------------------------------------------------
  //------------------------Place order -----------------------------------------------
  const placeOrder = async () => {
    // Assuming 'cartItems' is an array of objects with a 'quantity' property
    const quantityArray = cartItems.map((item) =>
      parseInt(String(item.quantity), 10)
    );

    // Summing up the quantities using reduce
    const totalQuantity = quantityArray.reduce(
      (accumulator, currentQuantity) => accumulator + currentQuantity,
      0
    );

    console.log("Total Quantity:", totalQuantity);

    const data = {
      products: cartItems.map((item) => item.id),
      quantity: totalQuantity,
      totalPrice: totalPrice,
    };

    console.log("Data:", data);

    try {
      const response = await axios.post(
        `http://localhost:3000/order/placeOrder/${userId}`,
        data
      );
      console.log("Response:", response);
      if (response.data) {
        router.push("../buyer/order");
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.error("Axios Error:", error);
    }
  };

  //-----------------------------------------------------------------------------------

  return (
    <Layout>
      <div className="container mx-auto my-8 p-8 bg-white rounded shadow-2xl">
        <h3 className="text-2xl font-semibold mb-4">Your Information</h3>
        <p className="mb-2">
          Name:{" "}
          <input
            type="email"
            name="email"
            value={fullName || ""}
            className="px-2 py-2 w-1/3"
          />
        </p>
        <p className="mb-2">
          Email:{" "}
          <input
            type="email"
            name="email"
            value={userEmail || ""}
            className="px-2 py-2 w-2/3"
          />
        </p>
        <p className="mb-2">
          Address:{" "}
          <input
            type="email"
            name="email"
            value={userAddress || ""}
            className="px-2 py-2 w-2/3"
          />
        </p>
        <p>
          Phone:{" "}
          <input
            type="email"
            name="email"
            value={userPhone || ""}
            className="px-2 py-2 w-40"
          />
        </p>
      </div>

      <div className="container mx-auto my-8 p-8 bg-white rounded shadow-2xl">
        <h3 className="text-2xl font-semibold mb-4">Your Cart</h3>
        <table className="w-full border">
          <thead>
            <tr>
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Product</th>
              <th className="border px-4 py-2">Quantity</th>
              <th className="border px-4 py-2">Price (BDT)</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td className="border px-4 py-2 text-center">
                  <img
                    src={`http://localhost:3000/product/getImages/${item.id}`}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="mr-4 rounded-md text-center"
                  />
                </td>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2 text-center">
                  {item.quantity}
                </td>
                <td className="border px-4 py-2 text-center">
                  {item.price * item.quantity}{" "}
                  <span className="text-2xl font-bold">৳</span>
                </td>
              </tr>
            ))}
            <tr>
              <td
                colSpan={3}
                className="border px-6 py-2 text-right bg-green-400 font-bold text-2xl"
              >
                Total Price:
              </td>
              <td className="border px-4 py-2 text-center font-bold bg-slate-300 shadow-lg hover:underline">
                {totalPrice.toFixed(2)}
                <span className="text-2xl font-bold">৳</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* ---------------------------------------------------------------------------------------------- */}

      <div className="container mx-auto my-8 p-8 bg-white rounded shadow-2xl flex flex-wrap justify-between">
        <div className="container mx-auto my-8 p-8 bg-white rounded shadow-2xl">
          <h3 className="text-2xl font-semibold mb-4">Payment</h3>
          <div className="flex flex-wrap justify-between">
            {paymentOptions.map((option) => (
              <PaymentOption
                key={option.value}
                id={option.id}
                value={option.value}
                label={option.label}
                imageSrc={option.imageSrc}
                onClick={() => handlePaymentSelection(option.value)}
              />
            ))}
          </div>
        </div>
        <div className="container mx-auto my-8 p-8 bg-white rounded shadow-2xl">
          {selectedPayment === "bkash" ||
          selectedPayment === "rocket" ||
          selectedPayment === "nagad" ? (
            <div>
              <h3 className="text-2xl font-semibold mb-4">Payment Details</h3>
              <PhoneAndPasswordInput />
            </div>
          ) : null}
          {selectedPayment === "card" ? (
            <div>
              <h3 className="text-2xl font-semibold mb-4">Card Details</h3>
              <CardDetailsInput />
            </div>
          ) : null}
        </div>

        {/* //------------------------------------------------------------------------------ */}
        <div className="flex justify-center w-full">
          <button
            type="submit"
            className="w-full py-2 mb-4 text-white bg-blue-600 rounded shadow hover:bg-blue-700 focus:outline-none"
            onClick={placeOrder}
          >
            Place Order
          </button>
        </div>

        {/* ------------------------------------------------------------------------------------ */}
      </div>
    </Layout>
  );
};

const PaymentOption = ({
  id,
  value,
  label,
  imageSrc,
  onClick,
}: {
  id: string;
  value: string;
  label: string;
  imageSrc: string;
  onClick: () => void;
}) => {
  return (
    <div className="mx-4 mb-4">
      <input
        type="radio"
        id={id}
        name="payment"
        value={value}
        onClick={onClick}
      />
      <label htmlFor={id} className="flex flex-col items-center cursor-pointer">
        <p>{label}</p>
        <img
          src={imageSrc}
          alt={label}
          width={60}
          height={60}
          className="ml-4 rounded-md"
        />
      </label>
    </div>
  );
};

// Define payment options
const paymentOptions = [
  {
    id: "cash",
    value: "cash",
    label: "Cash on Delivery",
    imageSrc: "https://i.ibb.co/DCZZsxQ/cod-cash-on-delivery-truck.jpg",
  },
  {
    id: "bkash",
    value: "bkash",
    label: "Bkash",
    imageSrc: "https://i.ibb.co/bdRCn5F/bkash.png",
  },
  {
    id: "rocket",
    value: "rocket",
    label: "Rocket",
    imageSrc: "https://i.ibb.co/vP4DKft/rocket.png",
  },
  {
    id: "nagad",
    value: "nagad",
    label: "Nagad",
    imageSrc: "https://i.ibb.co/936rHZr/Nagad.png",
  },
  {
    id: "card",
    value: "card",
    label: "Card",
    imageSrc: "https://i.ibb.co/Gnv59Nx/visa.jpg",
  },
];

export default Index;
