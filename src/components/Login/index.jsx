import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import Switch from "@mui/material/Switch";
import {
  section,
  login_page,
  passShow,
  sign_up,
  sign_up_span,
  pass_icon,
} from "./style.module.css";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const [checked, setChecked] = useState(true);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userInfo.email)) {
      errors.email = "Email is not valid";
    }
    if (userInfo.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const users = JSON.parse(localStorage.getItem("users"));
    setUserInfo({ email: "", password: "" });
    const status = users.some(
      ({ email, password }) =>
        email === userInfo.email && password === userInfo.password
    );
    if (status) {
      const user = users.filter(({ email }) => email === userInfo.email)[0];
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/layout");
    } else {
      setErrors({ general: "Invalid email or password" });
    }
  };

  return (
    <section className={section}>
      <div className={login_page}>
        <h1
          style={{
            color: "#fff",
            fontSize: "30px",
            fontFamily: "Poppins",
            textAlign: "left",
          }}
        >
          Nice to see you!
        </h1>
        <p
          style={{
            color: "#A0AEC0",
            textAlign: "left",
            fontSize: "14px",
            fontFamily: "Poppins",
            marginBottom: "30px",
          }}
        >
          Enter your email and password to sign in
        </p>
        <form onSubmit={handleSubmit}>
          <TextField
            sx={{
              borderRadius: "20px",
              input: { color: "white" },
              "& .MuiInputLabel-root": { color: "#fff" },
              "& .MuiOutlinedInput-root": {
                borderRadius: "20px",
                "& fieldset": { borderColor: "#582CFF" },
                "&:hover fieldset": { borderColor: "#582CFF" },
                "&.Mui-focused fieldset": { borderColor: "#fff" },
              },
            }}
            type="email"
            label="Your email address"
            variant="outlined"
            required
            value={userInfo.email}
            onChange={(e) =>
              setUserInfo({ ...userInfo, email: e.target.value })
            }
            error={!!errors.email}
            helperText={errors.email}
          />
          <div className={passShow}>
            <TextField
              sx={{
                borderRadius: "20px",
                width: "100%",
                maxWidth: "350px",
                input: { color: "white" },
                "& .MuiInputLabel-root": { color: "white" },
                "& .MuiOutlinedInput-root": {
                  borderRadius: "20px",
                  "& fieldset": { borderColor: "#582CFF" },
                  "&:hover fieldset": { borderColor: "#582CFF" },
                  "&.Mui-focused fieldset": { borderColor: "#fff" },
                },
              }}
              type={showPassword ? "text" : "password"}
              id="outlined-basic"
              label="Your password"
              variant="outlined"
              required
              value={userInfo.password}
              onChange={(e) =>
                setUserInfo({ ...userInfo, password: e.target.value })
              }
              error={!!errors.password}
              helperText={errors.password}
            />
            {showPassword ? (
              <FaEye
                onClick={() => setShowPassword((prev) => !prev)}
                className={pass_icon}
              />
            ) : (
              <FaEyeSlash
                onClick={() => setShowPassword((prev) => !prev)}
                className={pass_icon}
              />
            )}
          </div>
          {errors.general && <p style={{ color: "red" }}>{errors.general}</p>}
          <Button
            style={{ borderRadius: "20px" }}
            type="submit"
            variant="contained"
          >
            Sign in
          </Button>
          <div
            className="switch"
            style={{
              color: "white",
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <Switch
              color="primary"
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
            <p
              style={{
                color: "white",
                fontFamily: "Poppins",
                fontSize: "12px",
                fontWeight: "500",
                lineHeight: "18px",
              }}
            >
              Remember me
            </p>
          </div>
          <p className={sign_up}>
            Don't have an account?{" "}
            <span className={sign_up_span} onClick={() => navigate("/signup")}>
              Sign up
            </span>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Login;
