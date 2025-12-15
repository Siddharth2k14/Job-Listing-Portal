import React from "react";
import { Outlet } from "react-router-dom";
import NavR from "./NavR"; // The navbar we designed for recruiters

export default function LayoutR() {
  return (
    <div>
      <NavR />
      <Outlet /> {/* Nested recruiter routes will render here */}
    </div>
  );
}

