import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import logo1 from "../media/logo1.png";


export const Register = (props) => {
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setfullName] = useState("")
  const setvalues = (e) =>{
    e.preventDefault();
    console.log(email + password + fullName);
    if(email.length == 0 || password.length == 0 || fullName.length == 0){
      alert("Fill the missing values");
    }else{
    try {
      fetch("http://localhost:5000/register", {
        method:"POST",
        crossDomain:true, 
        headers:{
          "Content-Type":"application/json",
          Accept:"application/json",
          "Access-Control-Allow-Origin":"*",
        },
        body:JSON.stringify({
          name:fullName,
          email:email,
          password:password
        })
      }).then((res) => res.json())
        .then((data) =>{
          if(data.status == "UserExists"){
            alert("Email ID is already registered");
          }else if(data.status == "Ok"){
            alert("You have successfully registered");
          }else{
            alert("User Register but email not verified");
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
                    Create an Account
                </h1>
                <form  onSubmit={setvalues} class="space-y-4 md:space-y-6" action="#">
                    <div>
                     <label class="form-label block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="form3Example1c">Your Name</label>
                      <input value = {fullName} type="text" onChange={(e) => setfullName(e.target.value)} placeholder='Enter your Full Name' id='fullName' class="form-control form-control-lg bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 form-control form-control-lg" />
                    </div>
                    <div>
                        <label class="form-label" for="form3Example3" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Email address</label>
                        <input type="email" id="email" value = {email} onChange={(e) => setEmail(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 form-control form-control-lg" placeholder="Enter a valid email address" />
                    </div>
                    
                    <div class="form-outline mb-3">
                      <label class="form-label block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="form3Example4">Password</label>
                      <input type="password" id="password" class="form-control form-control-lg bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter password" value = {password} onChange={(e) => setPassword(e.target.value)}/>                  
                    </div>
                    <div class="flex items-center justify-between">
                    </div>
                    <button type="submit" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign up</button>
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



