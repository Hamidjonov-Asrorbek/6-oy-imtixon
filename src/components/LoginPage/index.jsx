// import React, { useState } from "react";
// import { Tab, Tabs } from "@mui/material";
// import { section, login_page } from "./style.module.css";
// import Login from "../Login";
// import SignUp from "../SignUp";

// function LoginPage() {
//   const [value, setValue] = useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };
//   return (
//     <>
//       <section className={section}>
//         <div className={login_page}>
//           <Tabs
//             value={value}
//             onChange={handleChange}
//             aria-label="disabled tabs example"
//           >
//             <Tab label="Login" style={{ marginRight: "10px" }} />
//             <Tab label="Sign Up" />
//           </Tabs>
//           {value === 0 ? <Login /> : <SignUp />}
//         </div>
//       </section>
//     </>
//   );
// }

// export default LoginPage;
