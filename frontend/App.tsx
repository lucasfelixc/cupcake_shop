
import React, { useState, useContext, createContext, useMemo, useCallback } from 'react';
import { User, CartItem } from './types';
import { MOCK_USER_EMAIL, MOCK_USER_PASSWORD, CUPCAKES_DATA } from './constants';
import LoginPage from './pages/LoginPage';
import Header from './components/Header';
import ShopPage from './pages/ShopPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';

// --- Auth Context ---
interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, pass: string): boolean => {
    if (email === MOCK_USER_EMAIL && pass === MOCK_USER_PASSWORD) {
      setUser({ id: 1, email: MOCK_USER_EMAIL });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const value = useMemo(() => ({ user, login, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

// --- Cart Context ---
interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem['id']) => void;
  removeFromCart: (itemId: CartItem['id']) => void;
  updateQuantity: (itemId: CartItem['id'], quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  totalPrice: number;
}
const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = useCallback((itemId: CartItem['id']) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === itemId);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      // FIX: Use an ES module import for CUPCAKES_DATA instead of `require`, which is not available in the browser environment.
      const newItem = CUPCAKES_DATA.find(cupcake => cupcake.id === itemId);
      if (newItem) {
        return [...prevCart, { ...newItem, quantity: 1 }];
      }
      return prevCart;
    });
  }, []);

  const removeFromCart = useCallback((itemId: CartItem['id']) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId: CartItem['id'], quantity: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === itemId ? { ...item, quantity: Math.max(0, quantity) } : item
      ).filter(item => item.quantity > 0)
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const itemCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
  const totalPrice = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);

  const value = useMemo(() => ({
    cart, addToCart, removeFromCart, updateQuantity, clearCart, itemCount, totalPrice
  }), [cart, addToCart, removeFromCart, updateQuantity, clearCart, itemCount, totalPrice]);
  
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};


// --- Main App Component ---
type Page = 'shop' | 'cart' | 'checkout' | 'success';

function AppContent() {
  const { user } = useAuth();
  const [page, setPage] = useState<Page>('shop');

  if (!user) {
    return <LoginPage />;
  }

  const renderPage = () => {
    switch (page) {
      case 'shop':
        return <ShopPage />;
      case 'cart':
        return <CartPage setPage={setPage} />;
      case 'checkout':
        return <CheckoutPage setPage={setPage} />;
      case 'success':
        return <OrderSuccessPage setPage={setPage} />;
      default:
        return <ShopPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header setPage={setPage} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {renderPage()}
      </main>
      <footer className="bg-pink-200 text-pink-800 text-center p-4">
        <p>&copy; 2024 Cupcake Corner. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}