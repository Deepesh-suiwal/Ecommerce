import React, { createContext, useState } from "react";
import axios from "axios";
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
import SignOut from "./component/SignOut";

export const cartContext = createContext();


function Home() {
  const [cartBuy, setCartBuy] = useState([]);
  const [localQuantity, setLocalQuantity] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

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

  async function fetchStatus() {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://ecommerce-api-8ga2.onrender.com/user/me",
        { withCredentials: true }
      );
      // console.log(response);
      if (response.status === 200) {
        setIsAuthenticated(true);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }
  async function logOut() {
    try {
      const response = await axios.post("https://ecommerce-api-8ga2.onrender.com/user/logout",
        {withCredentials:true}
      )

      if (response.status === 200) {
        setIsAuthenticated(false)
      }
    } catch (error) {
     console.log("logOut failed");
    }
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
          path: "/About",
          element: <About />,
        },
        {
          path: "/Contact",
          element: <Contact />,
        },
        {
          path: "/blog",
          element: <Blog />,
        },
        {
          path: "/Cart",
          element: <Cart />,
        },
        {
          path: "/product/:id",
          element: <Displaydata />,
        },
        {
          path:"/login",
          element: < Login/>
        },
        {
          path: "/sign-out",
          element: <SignOut />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/my-orders",
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
      <cartContext.Provider
        value={{
          cartBuy,
          setCartBuy,
          isProductInCart,
          localQuantity,
          loading,
          setLocalQuantity,
          increaseNumber,
          decreaseNumber,
          deleteCart,
          isAuthenticated,
          setIsAuthenticated,
          fetchStatus,
          logOut,
        }}
      >
        <RouterProvider router={name} />
      </cartContext.Provider>
    </>
  );
}

export default Home;
