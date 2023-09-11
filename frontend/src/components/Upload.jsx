import React, { useState, useEffect  } from 'react'
import { useNavigate, Link } from "react-router-dom";
import { useForm, Controller } from 'react-hook-form';
import logo1 from "../media/logo1.png";


export const Upload = (props) => {

  const [title, settitle] = useState("")
  const [price, setprice] = useState("")
  const [PhoneNo, setPhoneNo] = useState("")
  const [description, setdescription] = useState("")
  const [type, settype] = useState("")
  const [image, setimage] = useState("")

  const { register, handleSubmit } = useForm();
  const onSubmit = data => console.log(data);
  const loggedIn = window.localStorage.getItem("loggedIn");

  useEffect(() => { 
      const token = window.localStorage.getItem("token");
      try {
        fetch("https://bhangaar.onrender.com/checkLogged", {
          method:"POST",
          crossDomain:true, 
          headers:{
            "Content-Type":"application/json",
            Accept:"application/json",
            "Access-Control-Allow-Origin":"*",
          },
          body:JSON.stringify({
            token
          })
        }).then((res) => res.json())
          .then((data) =>{
            console.log(data, "user");
            if(data.status != "loggedIn"){
              window.localStorage.clear();
              alert("Please Log In to upload your product");
              navigate("../Login");
            }else{
  
            }
          });
      } catch (error) {
        console.log("we got an error");
      }
  }, []);


  const setvalues = (e) =>{
    e.preventDefault();
    const email = window.localStorage.getItem("email");
    if(!loggedIn){
      alert("please log in to upload your product");
      navigate("../Login");
    }else{
    try {
      fetch("https://bhangaar.onrender.com/upload", {
        method:"POST",
        crossDomain:true, 
        headers:{
          "Content-Type":"application/json",
          Accept:"application/json",
          "Access-Control-Allow-Origin":"*",
        },
        body:JSON.stringify({
          title, 
          price, 
          PhoneNo, 
          description, 
          type, 
          email,
          image
        })
      }).then((res) => res.json())
        .then((data) =>{
          console.log(data, "user");
          if(data.status == "Uploaded"){
            alert("Uploaded your product");
            navigate("../User");
          }else{
            console.log("we could not upload");
          }
        });
    } catch (error) {
      console.log("we got an error");
    }
    }
  }


  const navigate = useNavigate();
  

  function convertToBase64(e){
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setimage(reader.result);
    };
    reader.onerror = error => {
      console.log("Error is ", error)
    }
  }

  return (
    <section class="bg-gray-50 dark:bg-gray-900 py-16">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <Link to="../Home" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img class="w-8 h-8 mr-2" src={logo1} alt="logo"/>
            ReSold
        </Link>
  
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Sell your Product
                </h1>
                <form  onSubmit={setvalues} class="space-y-4 md:space-y-6" action="#">
                    <div>
                      <label for="floatingTextarea" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white floatingInput'>Title for the product</label>
                      <input class="form-control form-control form-control-lg bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value = {title} onChange={(e) => settitle(e.target.value)} placeholder="Title" id="title"></input>
                    </div>

                    <div class="form-outline flex-fill mb-0">
                     <select value = {type} onChange={(e) => settype(e.target.value)} id='type' class="form-select form-select-lg mb-3 form-control form-control form-control-lg bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" aria-label=".form-select-lg example">
                         <option selected>Product Catogory</option>
                         <option value="Cycle">Cycle</option>
                         <option value="Cooler">Cooler</option>
                         <option value="Sports Equipment">Sports Equipment</option>
                         <option value="Electornic devices">Electornic devices</option>
                         <option value="Stationary and Books">Stationary and Books</option>
                     </select>
                    </div>

                    <div class="form-outline mb-3">
                      <label for="form-label" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white floatingInput">Expected Price</label>
                      <input value = {price} type="text" class="form-control form-control form-control-lg bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="price" placeholder="Price" onChange={(e) => setprice(e.target.value)}/>
                    </div>

                    <div class="form-outline mb-3">
                      <label for="floatingInput" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white floatingInput'>Phone Number</label>
                      <input value = {PhoneNo} type="text" class="form-control form-control form-control form-control-lg bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="PhoneNo" placeholder="PhoneNo" onChange={(e) => setPhoneNo(e.target.value)}/>
                    </div>
                    <div class="form-outline mb-3">
                      <label for="floatingInput" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white floatingInput'>Description for the product</label>
                      <textarea class="form-control form-control form-control form-control form-control-lg bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={description} onChange={(e) => setdescription(e.target.value)} placeholder="Description for the product" id="description"></textarea>                  
                    </div>

                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload file</label>
                    <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="myfile" onChange={convertToBase64} name="myfile" type="file"/>
                  
                    <div class="flex items-center justify-between">
                        <div class="flex items-start">
                        </div>
                    </div>
                    
                    <button type="submit" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Upload your Product</button>
                    
                </form>
            </div>
        </div>
    </div>
  </section>

  )
  
}
