import axios from "axios";
import React, { useState } from "react";

function Register() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await axios.post(
      "https://ecommerce-api-8ga2.onrender.com/api/user/register",
      { firstname, lastname, gender, email, password, role: "user" }
    );
    console.log(response);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter First name"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Last name"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <input
          type="radio"
          value="male"
          name="gender"
          onChange={(e) => setGender(e.target.value)}
        />{" "}
        Male
        <input
          type="radio"
          value="female"
          name="gender"
          onChange={(e) => setGender(e.target.value)}
        />{" "}
        Female
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Submit</button>
      </form>
    </>
  );
}

export default Register;
