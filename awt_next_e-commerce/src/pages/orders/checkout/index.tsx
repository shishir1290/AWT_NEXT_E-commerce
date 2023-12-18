import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import { useRouter } from 'next/router';

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

  const fetchData = async () => {
    let accessToken;

    accessToken =
      sessionStorage.getItem("access_token") ||
      localStorage.getItem("access_token");

      console.log("accessToken", accessToken);

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

      setUserEmail(buyerEmail);
      setUserId(id);
      setUserFirstName(buyerFirstName);
      setUserLastName(buyerLastName);
      setUserImage(buyerimage);
    } catch (error) {
      console.error("Error decoding token:", (error as Error).message);
    }
  };

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

  return (
    <div>index</div>
  );
};

export default Index;
