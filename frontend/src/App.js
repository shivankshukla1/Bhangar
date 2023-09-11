import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import React, {useState} from 'react';
import './App.css';

import { Register } from './components/Register';
import { Login } from './components/login';
import { Home } from "./components/Home";
import { UserDetails } from "./components/Userdetails";
import { ForgotPassword } from "./components/ForgotPassword";
import { Otp } from "./components/Otp";
import { Upload } from "./components/Upload";
import { Cycle } from "./components/Cycle";
import { Cooler } from "./components/Cooler";
import { Electronic_devices } from "./components/ElectronicDevices";
import { ProductDetails } from "./components/ProductDetails";
import { SportsEquipment } from "./components/SportsEquipment";
import { StationaryAndBooks } from "./components/StationaryAndBooks";
import { EmailVerification } from "./components/EmailVerification";
import { Edit } from "./components/Edit";
function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  console.log("islogged is ", isLoggedIn);
  return (
    <BrowserRouter>
      <Routes>

        <Route exact path="/" element={<Home />}></Route> 
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/home" element={<Home />}></Route>
        <Route exact path="/register" element={<Register />}></Route>
        <Route exact path="/user" element={<UserDetails />}></Route>
        <Route exact path="/ForgotPassword" element={<ForgotPassword />}></Route>
        <Route exact path="/Otp" element={<Otp />}></Route>
        <Route exact path="/Upload" element={<Upload />}></Route>
        <Route exact path="/Cooler" element={<Cooler />}></Route>
        <Route exact path="/Cycle" element={<Cycle />}></Route>
        <Route exact path="/Electronic_devices" element={<Electronic_devices />}></Route>
        <Route exact path="/StationaryAndBooks" element={<StationaryAndBooks />}></Route>
        <Route exact path="/SportsEquipment" element={<SportsEquipment />}></Route>
        <Route exact path="/ProductDetails/:product_id" element={<ProductDetails />}></Route>
        <Route exact path="/EmailVerification/:verificationToken" element={<EmailVerification />}></Route>
        <Route exact path="/Edit/:product_id" element={<Edit/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;

