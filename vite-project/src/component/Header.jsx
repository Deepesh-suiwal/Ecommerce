import { useContext } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../Home";
function Header() {
  // const navigate = useNavigate()
  const { cartBuy, isAuthenticated, logOut } = useContext(cartContext);
  function handleLogOut() {
    logOut();
    // navigate("/login");
  }
  return (
    <>
      <header className="flex items-center justify-between p-1 m-1 bg-yellow-400 text-black font-[500]">
        <h2 className="text-[22px]">Ecommerce</h2>
        <ul className="flex items-center justify-between p-1 m-1 text-[18px]">
          <li className="p-2">
            <Link to="/">Home</Link>
          </li>
          <li className="p-2">
            <Link to="/about">About</Link>
          </li>
          <li className="p-2">
            <Link to="/blog">Blog</Link>
          </li>
          <li className="p-2">
            <Link to="/cart">Cart</Link>
            <span>({cartBuy.length})</span>
          </li>
          <li className="p-2">
            <Link to="/contact">Contact</Link>
          </li>
          {isAuthenticated ? (
            <li className="cursor-pointer p-2">
              <button onClick={handleLogOut}>Sign Out</button>
            </li>
          ) : (
            <li className="cursor-pointer p-2">
              <Link to="/register">sign up</Link>
            </li>
          )}
        </ul>
      </header>
    </>
  );
}

export default Header;
