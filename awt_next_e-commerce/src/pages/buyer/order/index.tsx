import axios from "axios";
import React, { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import Layout from "@/components/layout";
import { useRouter } from "next/router";

// Define an interface to type your orders
interface Order {
  createdAt: string;
  quantity: number;
  totalPrice: number;
  status_name: string;
}

const Index = () => {
  const router = useRouter();
  // Initialize orders as an empty array and type it as an array of Order
  const [orders, setOrders] = useState<Order[]>([]);

  console.log("Orders:", orders);

  const access_token =
    typeof window !== "undefined"
      ? sessionStorage.getItem("access_token") ||
        localStorage.getItem("access_token")
      : null;

  useEffect(() => {
    const fetchData = async () => {
      if (!access_token) {
        router.push("/buyer/login");
        return;
      } else {
        const decodedToken = jwt.decode(access_token) as JwtPayload;
        const userId = decodedToken?.sub;

        try {
          const res = await axios.get(`http://localhost:3000/order/${userId}`);
          if (res.data) {
            // Ensure the data is an array before setting it to state
            setOrders(Array.isArray(res.data) ? res.data : [res.data]);
            console.log(res.data);
          } else {
            console.error("No orders found");
          }
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      }
    };

    fetchData();
  }, [access_token, router]);

  return (
    <Layout>
      <div className="container mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-4">Orders</h1>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Order date</th>
              <th className="py-2 px-4 border-b">Quantity</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                <td className="py-2 px-4 border-b text-center">{order.createdAt}</td>
                <td className="py-2 px-4 border-b text-center">{order.quantity}</td>
                <td className="py-2 px-4 border-b text-center">{order.totalPrice}</td>
                <td className="py-2 px-4 border-b text-center">{order.status_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Index;
