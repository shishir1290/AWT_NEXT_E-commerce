// cartContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

interface CartContextType {
  cartCount: number;
  updateCartCount: (newCount: number) => void;
}

const CartContext = createContext<CartContextType>({
  cartCount: 0,
  updateCartCount: () => {}, // Empty function as a placeholder
});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = (newCount: number) => {
    setCartCount(newCount);
  };

  return (
    <CartContext.Provider value={{ cartCount, updateCartCount }}>
      {children}
    </CartContext.Provider>
  );
};
