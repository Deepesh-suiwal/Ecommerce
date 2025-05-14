import React, { useEffect, useState } from "react";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    phone: "",
    bio: "",
  });

  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  useEffect(() => {
    async function fetchUserData() {
      if (user) {
        const db = getFirestore();
        // console.log(user,"user");

        const userRef = doc(db, "users", user.uid);
        // console.log("Fetching for UID:", user?.uid);

        const userSnap = await getDoc(userRef);
        // console.log(userSnap.data());

        if (userSnap.exists()) {
          setUserData(userSnap.data());
        } else {
          console.log("No user data found");
        }
      }
    }

    fetchUserData();
  }, [user]);

  console.log(user);

  function handleChange(e) {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Submitted data:", userData);
    setIsUpdating(true);
    try {
      const db = getFirestore();
      await setDoc(
        doc(db, "users", user.uid),
        { ...userData },
        { merge: true }
      );
      setIsUpdating(false);
      setMessage({
        type: "success",
        text: "Profile Updated!!!",
      });
      const timeoutId = setTimeout(() => {
        setMessage({ type: "", text: "" });
      }, 500);

      return () => clearTimeout(timeoutId);
    } catch (error) {
      console.log(error);
      setMessage({
        type: "error",
        text: "There is a problem in submitting the form",
      });
      setIsUpdating(false);
      const timeoutId = setTimeout(() => {
        setMessage({ type: "", text: "" });
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }

  function Skip() {
    navigate("/");
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-100 rounded-lg">
      <h1 className="text-3xl font-bold mb-6">
        Welcome, {userData.name || user?.email}
      </h1>
      <form
        className={`space-y-4 ${
          isUpdating ? "opacity-50 pointer-events-none" : ""
        }`}
        onSubmit={handleSubmit}
      >
        {message.text && (
          <div
            className={`mb-4 p-2 text-center rounded ${
              message.type === "error"
                ? "bg-red-200 text-red-800"
                : "bg-green-200 text-green-800"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Name</label>
            <input
              name="name"
              value={userData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              type="text"
              placeholder="Name"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Gender</label>
            <div className="flex items-center space-x-4">
              {["Male", "Female", "Other"].map((g) => (
                <label key={g} className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={userData.gender === g}
                    onChange={handleChange}
                    className="mr-1"
                  />
                  {g}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-1">
            Full Postal Address
          </label>
          <textarea
            name="address"
            value={userData.address}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Full Postal Address"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">City</label>
            <input
              name="city"
              value={userData.city}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              type="text"
              placeholder="City"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">State</label>
            <input
              name="state"
              value={userData.state}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              type="text"
              placeholder="State"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-1">Phone Number</label>
          <input
            name="phone"
            value={userData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            type="text"
            placeholder="Phone"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Bio</label>
          <textarea
            name="bio"
            value={userData.bio}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Bio"
          />
        </div>

        <button
          type="submit"
          className={`w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition ${
            isUpdating ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          {isUpdating ? "Updating..." : "Update Profile"}
        </button>

        <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
          Change Password
        </button>
        <button
          className="ml-150 mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          onClick={Skip}
        >
          Skip
        </button>
      </form>
    </div>
  );
}

export default Profile;
