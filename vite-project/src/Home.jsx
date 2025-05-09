import React, { createContext, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import First from "./component/First";
import App from "./App";
import About from "./pages/About";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import Displaydata from "./component/Displaydata";
import Login from "./component/Login";
import Register from "./component/Register";
import MyOrder from "./component/MyOrder";
import ProtectedRoute from "./component/ProtectedRoute";
import AuthProvider from "./context/AuthContext";
import Profile from "./component/Profile";
export const cartContext = createContext();

function Home() {
  const [cartBuy, setCartBuy] = useState([]);
    const [cartId, setCartId] = useState([]);
    const [wishListId, setWishListId] = useState([]);

  
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
          element: <App />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/wishList",
          element: (
            <ProtectedRoute>
              <Wishlist />
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
          element: <Displaydata />,
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
        {
          path: "/profile",
          element: (
            <ProtectedRoute>
              <Profile />
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
            cartId,
            setCartId,
            setWishListId,
            wishListId
          }}
        >
          <RouterProvider router={name} />
        </cartContext.Provider>
      </AuthProvider>
    </>
  );
}

export default Home;
