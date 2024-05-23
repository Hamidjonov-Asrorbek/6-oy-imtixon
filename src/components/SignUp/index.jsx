import { Button, Switch, TextField } from "@mui/material";
import React, { useState } from "react";
import {
  passShow,
  pass_icon,
  section,
  login_page,
  sign_up_span,
  sign_up,
} from "./style.module.css";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function SignUp() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(true);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const [userInfo, setUserInfo] = useState({
    name: "",
    avatar: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const errors = {};

    if (userInfo.name.length < 3) {
      errors.name = "Name must be at least 3 characters long";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userInfo.email)) {
      errors.email = "Email is not valid";
    }
    if (userInfo.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }
    try {
      new URL(userInfo.avatar);
    } catch (_) {
      errors.avatar = "Avatar must be a valid URL";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const users = JSON.parse(localStorage.getItem("users")) ?? [];
    setUserInfo((...prev) => ({
      ...prev,
      name: "",
      avatar: "",
      email: "",
      password: "",
    }));
    try {
      const req = await fetch("https://api.escuelajs.co/api/v1/users", {
        method: "POST",
        headers: {
          Access: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...userInfo }),
      });
      const data = await req.json();
      localStorage.setItem("users", JSON.stringify([...users, data]));
      navigate("/layout");
      {
        checked && localStorage.setItem("user", JSON.stringify(data));
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className={section}>
      <h1
        style={{
          color: "#fff",
          fontSize: "30px",
          fontFamily: "Poppins",
          textAlign: "left",
        }}
      >
        Welcome!
      </h1>
      <p
        style={{
          color: "#A0AEC0",
          textAlign: "center",
          fontSize: "14px",
          fontFamily: "Poppins",
          marginBottom: "30px",
          width: "350px",
        }}
      >
        Use these awesome forms to login or create new account in your project
        for free.
      </p>
      <div className={login_page}>
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
            type="text"
            id="name"
            label="Name"
            variant="outlined"
            value={userInfo.name}
            onChange={(e) =>
              setUserInfo((prev) => ({ ...prev, name: e.target.value.trim() }))
            }
            required
            error={!!errors.name}
            helperText={errors.name}
          />
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
            type="url"
            id="avatar"
            size="small"
            label="Avatar"
            variant="outlined"
            value={userInfo.avatar}
            onChange={(e) =>
              setUserInfo((prev) => ({
                ...prev,
                avatar: e.target.value.trim(),
              }))
            }
            required
            error={!!errors.avatar}
            helperText={errors.avatar}
          />
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
            id="email"
            label="Email"
            variant="outlined"
            value={userInfo.email}
            onChange={(e) =>
              setUserInfo((prev) => ({
                ...prev,
                email: e.target.value.trim(),
              }))
            }
            required
            error={!!errors.email}
            helperText={errors.email}
          />
          <div className={passShow}>
            <TextField
              sx={{
                width: "100%",
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
              type={showPassword ? "text" : "password"}
              id="password"
              label="Password"
              variant="outlined"
              value={userInfo.password}
              onChange={(e) =>
                setUserInfo((prev) => ({
                  ...prev,
                  password: e.target.value.trim(),
                }))
              }
              required
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
          <Button
            style={{ borderRadius: "20px" }}
            type="submit"
            variant="contained"
          >
            Sign Up
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
            Already have an account?{" "}
            <span className={sign_up_span} onClick={() => navigate("/login")}>
              Sign in
            </span>
          </p>
        </form>
      </div>
    </section>
  );
}

export default SignUp;
