import React from "react";

function About() {
  return (
    <>
      <div className="box flex items-center justify-center h-[565px] w-[100%]">
        <div className="name w-[55%] h-[40%] p-4">
          <h1 className="text-[35px]">About Us</h1>
          <p>
            Welcome to 🛍️ <span className="text-amber-500">E-Commerce</span> ,
            your number one source for all things shopping. We're dedicated to
            giving you the very best experience, with a focus on quality,
            customer service, and uniqueness.
          </p>
          <p>
            Founded in 2025 by Vikas, our store has come a long way from its
            beginnings. When Vikas first started out, his passion for clean and
            modern e-commerce experiences drove him to start building this
            platform.
          </p>
          <p>
            We hope you enjoy our products as much as we enjoy offering them to
            you. If you have any questions or comments, please don’t hesitate to
            contact us.
          </p>
          <p>— The E-Commerce Team</p>
        </div>
      </div>
    </>
  );
}

export default About;
