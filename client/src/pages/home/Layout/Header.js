import React from "react";
import CartDrawer from "../../../components/Cart/CartDrawer";
import NavBar from "./NavBar/NavBar";
export default function Header() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <CartDrawer />
    </>
  );
}
