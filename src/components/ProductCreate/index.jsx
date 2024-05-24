import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { section, login_page } from "./style.module.css";
import { useNavigate } from "react-router-dom";
function ProductCreate() {
  const navigate = useNavigate();
  const [productsInfo, setproductsInfo] = useState({
    name: "",
    category: "",
    price: "",
    link: "",
    desc: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = JSON.parse(localStorage.getItem("products")) ?? [];
    setproductsInfo((...prev) => ({
      ...prev,
      name: "",
      category: "",
      price: "",
      link: "",
      desc: "",
    }));
    try {
      const req = await fetch("https://api.escuelajs.co/api/v1/products", {
        method: "POST",
        headers: {
          Access: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...productsInfo }),
      });
      const data = await req.json();
      localStorage.setItem("products", JSON.stringify([...product, data]));
      localStorage.setItem("product", JSON.stringify(data));
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    console.log(productsInfo);
  };
  return (
    <section className={section}>
      <h1
        style={{
          color: "#fff",
          fontSize: "30px",
          fontFamily: "Poppins",
          textAlign: "left",
          marginBottom: "20px",
        }}
      >
        Create Products
      </h1>
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
            label="Product name"
            variant="outlined"
            value={productsInfo.name}
            onChange={(e) =>
              setproductsInfo((prev) => ({ ...prev, name: e.target.value }))
            }
            required
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
            type="number"
            id="category"
            size="small"
            label="Product category"
            variant="outlined"
            value={productsInfo.category}
            onChange={(e) =>
              setproductsInfo((prev) => ({
                ...prev,
                category: e.target.value,
              }))
            }
            required
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
            type="number"
            id="price"
            size="small"
            label="Product price"
            variant="outlined"
            value={productsInfo.price}
            onChange={(e) =>
              setproductsInfo((prev) => ({
                ...prev,
                price: e.target.value.trim(),
              }))
            }
            required
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
            id="link"
            size="small"
            label="Product image link"
            variant="outlined"
            value={productsInfo.link}
            onChange={(e) =>
              setproductsInfo((prev) => ({
                ...prev,
                link: e.target.value.trim(),
              }))
            }
            required
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
            type="text"
            id="desc"
            label="Product description"
            variant="outlined"
            value={productsInfo.desc}
            onChange={(e) =>
              setproductsInfo((prev) => ({ ...prev, desc: e.target.value }))
            }
            required
          />
          <Button
            style={{ borderRadius: "20px" }}
            type="submit"
            variant="contained"
          >
            Create
          </Button>
        </form>
      </div>
    </section>
  );
}

export default ProductCreate;
