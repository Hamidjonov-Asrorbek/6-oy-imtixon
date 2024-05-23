import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import "./style.css";
import Header from "../Header";

export default function Layout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
