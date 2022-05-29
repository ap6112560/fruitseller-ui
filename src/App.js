import './App.css';
import React from "react";
import Products from "./components/Products/Products";
import Admin from "./components/Admin/Admin";
import User from "./components/User/User";
import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";

function App() {
  return (
    <Router>
      <Link name='products' to={"/products"}>Products</Link>
      &nbsp;
      <Link name='user' to={"/user"}>User</Link>
      &nbsp;
      <Link name='admin' to={"/admin"}>Admin</Link>
      <Routes>
        <Route path={"/products"} element={<Products/>}/>
        <Route path={"/user"} element={<User/>}/>
        <Route path={"/admin"} element={<Admin/>}/>
        ,
      </Routes>
    </Router>
  );
}

export default App;
