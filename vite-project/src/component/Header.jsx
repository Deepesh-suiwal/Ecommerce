import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getAuth } from "firebase/auth";
import app from "../firebase";
import { cartContext } from "../Home";
import { FaRegUserCircle } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
const auth = getAuth(app);

function Header() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const { cartBuy } = useContext(cartContext);

  function handleLogout() {
    auth.signOut();
    setIsLoggedIn(false);
    navigate("/login");
  }
  return (
    <>
      <header className=" header flex items-center justify-between py-1.5  px-[4rem] text-black font-[500]">
        <h2 className="text-yellow-400 text-[22px]">🛍️ E-Commerce</h2>
        <ul className="flex items-center justify-between p-1 m-1 text-[18px] ">
          <li className="p-2 ">
            <Link to="/">Home</Link>
          </li>
          <li className="p-2">
            <Link to="/about">About</Link>
          </li>
          
          <li className="p-2">
            <Link to="/contact">Contact</Link>
          </li>
          <li className="p-2">
            <Link to="/wishList"><FaHeart/></Link>
          </li>
          <li className="p-2">
            <Link to="/cart">
              <FaShoppingCart />
            </Link>
            {/* <span>({cartBuy.length})</span> */}
          </li>

          {isLoggedIn ? (
            <li>
              <button className="cursor-pointer p-2" onClick={handleLogout}>
                <FaRegUserCircle />
              </button>
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
