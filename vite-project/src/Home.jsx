import React, { createContext, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import First from "./component/First";
import App from "./App";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import Displaydata from "./component/Displaydata";
import Login from "./component/Login";
import Register from "./component/Register";
import MyOrder from "./component/MyOrder";
import ProtectedRoute from "./component/ProtectedRoute";
import AuthProvider from "./context/AuthContext";
export const cartContext = createContext();

function Home() {
  const [cartBuy, setCartBuy] = useState([]);
  const [localQuantity, setLocalQuantity] = useState("");


  function isProductInCart(product) {
    const productFound = cartBuy.some((cartItems) => {
      return cartItems.id == product.id;
    });
    return productFound;
  }

  function increaseNumber(product) {
    setCartBuy(
      cartBuy.map((existingProduct) =>
        existingProduct.id === product.id
          ? { ...existingProduct, quantity: existingProduct.quantity + 1 }
          : existingProduct
      )
    );
  }

  function decreaseNumber(Product) {
    setCartBuy(
      cartBuy.map((existingProduct) =>
        existingProduct.id === Product.id
          ? {
              ...existingProduct,
              quantity: Math.max(existingProduct.quantity - 1, 1),
            }
          : existingProduct
      )
    );
  }

  function deleteCart(Product) {
    setCartBuy(
      cartBuy.filter((obj) => {
        return obj.id !== Product.id;
      })
    );
  }

  const name = createBrowserRouter([
    {
      path: "/",
      element: <First />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <App />
            </ProtectedRoute>
          ),
        },
        {
          path: "/about",
          element: (
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          ),
        },
        {
          path: "/contact",
          element: (
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          ),
        },
        {
          path: "/blog",
          element: (
            <ProtectedRoute>
              <Blog />
            </ProtectedRoute>
          ),
        },

        {
          path: "Cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "product/:id",
          element: (
            <ProtectedRoute>
              <Displaydata />
            </ProtectedRoute>
          ),
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "my-orders",
          element: (
            <ProtectedRoute>
              <MyOrder />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <AuthProvider>
        <cartContext.Provider
          value={{
            cartBuy,
            setCartBuy,
            isProductInCart,
            localQuantity,
            setLocalQuantity,
            increaseNumber,
            decreaseNumber,
            deleteCart,
          }}
        >
          <RouterProvider router={name} />
        </cartContext.Provider>
      </AuthProvider>
    </>
  );
}

export default Home;
