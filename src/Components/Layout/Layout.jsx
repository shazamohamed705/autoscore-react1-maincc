import React from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import ScrollToTopButton from "../ScrollToTopButton/ScrollToTopButton";

function Layout() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="mb-20 mt-28">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTopButton />
    </>
  );
}

export default Layout;
