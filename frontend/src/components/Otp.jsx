import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import logo1 from "../media/logo1.png";


export const Otp = (props) => {
  
  const [OTP, setOTP] = useState("");
  const [password, setPassword] = useState("")
  const email = window.localStorage.getItem("email");
  const etoken = window.localStorage.getItem("etoken");
  // console.log(etoken);
  const setvalues = (e) =>{
    e.preventDefault();
    if(password == ""){
      alert("The Password cannot be empty");
    }else{

    
    try {
      fetch("http://localhost:5000/otp_verification", {
        method:"POST",
        crossDomain:true, 
        headers:{
          "Content-Type":"application/json",
          Accept:"application/json",
          "Access-Control-Allow-Origin":"*",
        },
        body:JSON.stringify({
          OTP:OTP,
          email:email,
          password:password,
          etoken:etoken
        })
      }).then((res) => res.json())
        .then((data) =>{
  
            if(data.status == "verified"){
              alert("The password has been updated");
              window.location.href="./login";
            }else{
              alert("You Entered wrong OTP");
              window.location.href="./ForgotPassword";
              window.localStorage.clear();
            }
             
        });
    } catch (error) {
      console.log("we got an error");
    }
    }
  }
  const navigate = useNavigate();
  function handleClick() {
    navigate("/login");
  }


  return (

    <section class="bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <a href="./Home" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img class="w-8 h-8 mr-2" src={logo1} alt="logo"/>
            Bhangar
        </a>
  
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Reset Password
                </h1>
                <form  onSubmit={setvalues} class="space-y-4 md:space-y-6" action="#">
                    <div>
                        <label class="form-label block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="form3Example3c">One Time Password</label>
                        <input value = {OTP} type="OTP" onChange={(e) => setOTP(e.target.value)} placeholder='Enter your OTP' id='OTP' class="form-control form-control-lg form-control form-control-lg bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />                           
                    </div>
                    
                    <div class="form-outline mb-3">
                    <label class="form-label block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="form3Example4c">New Password</label>
                      <input value = {password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Enter your new password' id='password' class="form-control form-control-lg form-control form-control-lg bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                   </div>
                    <div class="flex items-center justify-between">
                        <div class="flex items-start">
                        </div>
                    </div>
                    <button type="submit" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create your Password</button>
                    
                </form>
            </div>
        </div>
    </div>
  </section>


  )
  
}
