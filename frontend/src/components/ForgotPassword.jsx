import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import logo1 from "../media/logo1.png";


export const ForgotPassword = (props) => {
  
  const [email, setEmail] = useState("");
  const setvalues = (e) =>{
    e.preventDefault();

    console.log(email);
    
    try {
      fetch("http://localhost:5000/forgotpassword", {
        method:"POST",
        crossDomain:true, 
        headers:{
          "Content-Type":"application/json",
          Accept:"application/json",
          "Access-Control-Allow-Origin":"*",
        },
        body:JSON.stringify({
          email:email
        })
      }).then((res) => res.json())
        .then((data) =>{
            if(data.status == "Otp"){
              alert("Otp has been sent to your email");
            }else{
              alert(data.status);
            }

            if(data.status == "Otp"){
              window.localStorage.setItem("email", data.email);
              window.localStorage.setItem("etoken", data.etoken);
              window.location.href="./Otp";
            }
        });
    } catch (error) {
      console.log("we got an error");
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
                        <label class="form-label block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="form3Example3c">Your Email</label>
                        <input value = {email} type="email" onChange={(e) => setEmail(e.target.value)} placeholder='Enter your Registered Email' id='email' class="form-control form-control-lg bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 form-control form-control-lg" />
                
                    </div>
                    
                    <button type="submit" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Reset Password</button>
                    <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                        Already have an account? <a href="./Login" class="font-medium text-blue-600 hover:underline dark:text-blue-500">Sign in</a>
                    </p>
                </form>
            </div>
        </div>
    </div>
  </section>

  )
  
}


