import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import "./style.css";
import Header from "../Header";
import Products from "../Products";
import ProductCreate from "../ProductCreate";

export default function Layout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
        <Products />
      </main>
    </div>
  );
}
