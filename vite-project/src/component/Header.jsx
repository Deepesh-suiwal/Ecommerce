import { Link } from "react-router-dom"
function Header() {
  return (
    <>
    <header className="flex items-center justify-between p-1 m-1 bg-red-400 text-white">
        <h2>Ecommerce</h2>
        <ul className="flex items-center justify-between p-1 m-1">
            <li className="p-2"><Link to="/">Home</Link></li>
            <li className="p-2"><Link to="/about">About</Link></li>
            <li className="p-2"><Link to="/blog">Blog</Link></li>
            <li className="p-2"><Link to="/cart">Cart</Link></li>
            <li className="p-2"><Link to="/contact">Contact</Link></li>
        </ul>
    </header>
    </>
  )
}

export default Header
