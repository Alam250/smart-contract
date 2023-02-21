import React from "react";
import Header from "./Header";
import Footer from "./footer";
import { BrowserRouter as Router } from "react-router-dom";
import "./styles.css";
import ReactDOM from "react-dom";
export default function App() {
  return (
    <React.StrictMode>
      <Header />
      <Footer />
    </React.StrictMode>
  );
}
