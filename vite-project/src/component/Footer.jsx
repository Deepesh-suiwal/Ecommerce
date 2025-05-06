import React from 'react'
import { FaHeart } from "react-icons/fa";

function Footer() {
    return (
        <footer className="header py-1 px-10 text-center">
          <p>&copy; {new Date().getFullYear()} FakeStore. All rights reserved</p>
          <p>
            Made with <FaHeart className="inline-block" /> by 
            <a
              href="https://www.linkedin.com/feed/"
              className="text-blue-700 underline ps-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              Deepesh
            </a>
          </p>
        </footer>
      );
}

export default Footer