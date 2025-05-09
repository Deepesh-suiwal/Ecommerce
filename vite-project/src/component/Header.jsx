import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getAuth } from "firebase/auth";
import app from "../firebase";
import { cartContext } from "../Home";
import { FaRegUserCircle, FaShoppingCart, FaHeart } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";
import { AiOutlineHeart } from "react-icons/ai";
import { MdOutlineShoppingCart, MdLogout } from "react-icons/md";

const auth = getAuth(app);

function Header() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, user } = useAuth();
  const { cartBuy, cartId, wishListId } = useContext(cartContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  function handleLogout() {
    auth.signOut();
    setIsLoggedIn(false);
    navigate("/login");
  }

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <>
      <header className="header flex items-center justify-between py-1.5 px-[4rem] text-black font-[500]">
        <h2 className="text-yellow-400 text-[22px]">🛍️ E-Commerce</h2>
        <ul className="flex items-center justify-between p-1 m-1 text-[18px]">
          <li
            className="p-2 hover:text-amber-300"
            onClick={() => setIsDropdownOpen(false)}
          >
            <Link to="/">Home</Link>
          </li>
          <li
            className="p-2 hover:text-amber-300"
            onClick={() => setIsDropdownOpen(false)}
          >
            <Link to="/about">About</Link>
          </li>
          <li
            className="p-2 hover:text-amber-300"
            onClick={() => setIsDropdownOpen(false)}
          >
            <Link to="/contact">Contact</Link>
          </li>
          <li
            className="p-2 hover:text-amber-300 relative"
            onClick={() => setIsDropdownOpen(false)}
          >
            <Link to="/wishlist" className="flex items-center gap-2">
              <span className="relative flex items-center">
                <FaHeart />
                {user && (
                  <span className="absolute top-[-10px] right-[-10px] bg-rose-400 font-bold text-black rounded-full w-4 h-4 flex justify-center items-center text-xs">
                    {wishListId.length}
                  </span>
                )}
              </span>
            </Link>
          </li>
          <li
            className="p-2 hover:text-amber-300 "
            onClick={() => setIsDropdownOpen(false)}
          >
            <Link to="/cart" className="flex items-center gap-2">
              <span className="relative flex items-center">
                <FaShoppingCart />
                {user && (<span className="absolute top-[-10px] right-[-10px] bg-rose-400 font-bold text-black rounded-full w-4 h-4 flex justify-center items-center text-xs">
                  {cartId.length}
                </span>)}
                
              </span>
            </Link>
          </li>

          {isLoggedIn ? (
            <li className="relative" onClick={toggleDropdown}>
              <button className="cursor-pointer p-2">
                <FaRegUserCircle />
              </button>
              {isDropdownOpen && (
                <ul className="absolute z-50 right-0 mt-2 bg-white shadow-md rounded text-black w-40">
                  <li className="p-2 ">
                    <Link to="/profile">My Profile</Link>
                  </li>
                  <li className="p-2 ">
                    <Link to="/my-orders">My Orders</Link>
                  </li>
                  <li className="p-2  relative">
                    <Link to="/wishlist" className="flex items-center gap-2">
                      Wishlist
                      <span className="relative flex items-center">
                        <AiOutlineHeart />
                        <span className="absolute top-[-10px] right-[-10px] bg-rose-400 font-bold text-black rounded-full w-4 h-4 flex justify-center items-center text-xs">
                          {wishListId.length}
                        </span>
                      </span>
                    </Link>
                  </li>
                  <li className="p-2  relative">
                    <Link to="/cart" className="flex items-center gap-2">
                      Cart
                      <span className="relative flex items-center">
                        <MdOutlineShoppingCart />
                        <span className="absolute top-[-10px] right-[-10px] bg-rose-400 font-bold text-black rounded-full w-4 h-4 flex justify-center items-center text-xs">
                          {cartId.length}
                        </span>
                      </span>
                    </Link>
                  </li>
                  <li className="p-2  flex items-center gap-2 cursor-pointer">
                    <MdLogout title="Logout" />
                    <button onClick={handleLogout} className="cursor-pointer">Logout</button>
                  </li>
                </ul>
              )}
            </li>
          ) : (
            <li className="cursor-pointer p-2">
              <Link to="/login">
                <FaUserLarge />
              </Link>
            </li>
          )}
        </ul>
      </header>
    </>
  );
}

export default Header;
