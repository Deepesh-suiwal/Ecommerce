import { Link } from "react-router-dom"
function Header() {
  return (
    <>
    <header>
        <h2>Ecommerce</h2>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/contact">Contact</Link></li>
        </ul>
    </header>
    </>
  )
}

export default Header