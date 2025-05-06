// import React, { useEffect, useState } from "react";
// import { getFirestore, doc, getDoc } from "firebase/firestore";
// import { useAuth } from "../context/AuthContext";

// function Profile() {
//   const { user } = useAuth();
  
  
//   const [userData, setUserData] = useState({
//     name: "",
//     gender: "",
//     address: "",
//     city: "",
//     state: "",
//     phone: "",
//     bio: "",
//   });

//   useEffect(() => {
//     async function fetchUserData() {
//       if (user) {
//         const db = getFirestore();
//       // console.log(user,"user");
      
//       const userRef = doc(db, "users" , user.uid);
//       // console.log("Fetching for UID:", user?.uid);
        
//         const userSnap = await getDoc(userRef);
//         // console.log(userSnap.data());

//         if (userSnap.exists()) {
//           setUserData(userSnap.data());
//         } else {
//           console.log("No user data found");
//         }
//       }
//     }

//     fetchUserData();
//   }, [user]);

//   function handleChange(e) {
//     const { name, value } = e.target;
//     setUserData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   }

//   function handleSubmit(e) {
//     e.preventDefault();
//     console.log("Submitted data:", userData);
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-8 bg-gray-100 rounded-lg">
//       <h1 className="text-3xl font-bold mb-6">Welcome, {userData.name || user?.email}</h1>
//       <form className="space-y-4" onSubmit={handleSubmit}>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block font-semibold mb-1">Name</label>
//             <input
//               name="name"
//               value={userData.name}
//               onChange={handleChange}
//               className="w-full p-2 border rounded"
//               type="text"
//             />
//           </div>
//           <div>
//             <label className="block font-semibold mb-1">Gender</label>
//             <div className="flex items-center space-x-4">
//               {["Male", "Female", "Other"].map((g) => (
//                 <label key={g} className="flex items-center">
//                   <input
//                     type="radio"
//                     name="gender"
//                     value={g}
//                     checked={userData.gender === g}
//                     onChange={handleChange}
//                     className="mr-1"
//                   />
//                   {g}
//                 </label>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div>
//           <label className="block font-semibold mb-1">
//             Full Postal Address
//           </label>
//           <textarea
//             name="address"
//             value={userData.address}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             placeholder="Full Postal Address"
//           />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block font-semibold mb-1">City</label>
//             <input
//               name="city"
//               value={userData.city}
//               onChange={handleChange}
//               className="w-full p-2 border rounded"
//               type="text"
//             />
//           </div>
//           <div>
//             <label className="block font-semibold mb-1">State</label>
//             <input
//               name="state"
//               value={userData.state}
//               onChange={handleChange}
//               className="w-full p-2 border rounded"
//               type="text"
//             />
//           </div>
//         </div>

//         <div>
//           <label className="block font-semibold mb-1">Phone Number</label>
//           <input
//             name="phone"
//             value={userData.phone}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             type="text"
//           />
//         </div>

//         <div>
//           <label className="block font-semibold mb-1">Bio</label>
//           <textarea
//             name="bio"
//             value={userData.bio}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             placeholder="Bio"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
//         >
//           Update Profile
//         </button>

//         <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
//           Change Password
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Profile;
