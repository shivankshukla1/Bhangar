import { useNavigate, useParams, Link } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import logo1 from "../media/logo1.png";


export const ProductDetails = () => {
    const params = useParams();
    const loggedIn = window.localStorage.getItem("loggedIn");
    const [products, setproducts] = useState("");
    const navigate = useNavigate();
    
    function Log_out() {
        window.localStorage.clear();
        window.localStorage.setItem('loggedIn', false);
        navigate("../");
    }

    const details = (e) => () =>{
        navigate(`/ProductDetails/${e}`);
    }
    function Log_in(){
      navigate("../Login");
    }

    useEffect(() => {
        try {
            fetch("https://bhangaar.onrender.com/product_details", {
            method:"POST",
            crossDomain:true, 
            headers:{
                "Content-Type":"application/json",
                Accept:"application/json",
                "Access-Control-Allow-Origin":"*",
            },
            body:JSON.stringify({
                product_id:params.product_id,
            })
            }).then((res) => res.json())
            .then((data) =>{
                setproducts(data);
            });
        } catch (error) {      
            console.log("we got an error");
        }
    }, []);



    return (
        <div class="bg-blue-100">
<nav class="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

          <Link to="../Home" class="flex items-center">
              <img src={logo1} class="h-8 mr-3" alt="Flowbite Logo" />
              <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">ReSold</span>
          </Link>

          <button data-collapse-toggle="navbar-multi-level" type="button" class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-multi-level" aria-expanded="false">
          <span class="sr-only">Open main menu</span>
          <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
          </button>
          
          <div class="hidden w-full md:block md:w-auto text-center" id="navbar-multi-level">
          <ul class="items-center flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li>
              <Link to="../Home" class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</Link>
          </li>
          <li>
              <button id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" class="flex items-center justify-between w-full py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">Categories<svg class="w-5 h-5 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></button>
              <div id="dropdownNavbar" class="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                  <ul class="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                      <li>
                          <Link to="../SportsEquipment" class="block px-4 text-left py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sports Equipment</Link>
                      </li>
                      <li>
                          <Link to="../Electronic_devices" class="block px-4 text-left py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Electronic Devices</Link>
                      </li>
                      <li>
                          <Link to="../StationaryAndBooks" class="block px-4 text-left py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Stationary & Books</Link>
                      </li>
                      <li>
                      <Link to="../Cycle" class="block px-4 text-left py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Cycle</Link>
                      </li>
                      <li>
                      <Link to="../Cooler" class="block px-4 text-left py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Cooler</Link>
                      </li>

                  </ul>
              </div>
          </li>
          <li>
              <Link to="../Upload" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Sell Your Product</Link>
          </li>
          <li>
              <Link to="../User" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Your Products</Link>
          </li>
          <li>
          <div>
            {loggedIn == "true" ? (<button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' onClick={Log_out}>Log Out</button>) : (<button className = "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={Log_in}>Log In</button>)}
          </div>
          </li>
          </ul>  

          </div>

      </div>
      </nav>
      
        <div class="h-min-screen pt-24 container mx-auto p-6  max-w-screen-xl items-center justify-between mx-auto p-4">
        {

            products && products.map((product) => (
            <div>
                <section class="text-gray-700 body-font overflow-hidden bg-white">
                <div class="container px-5 py-5 mx-auto">
                    <div class="lg:w-4/5 mx-auto flex flex-wrap">
                    <img alt="ecommerce" class="p-3 lg:w-1/2 w-full object-cover object-center rounded border border-gray-200" src={product.image}/>
                    <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        <h2 class="text-sm title-font text-gray-500 tracking-widest">ID : {product.product_id}</h2>
                        <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">₹   {product.price}/-</h1>
                        <p class="leading-relaxed text-2xl tracking-widest font-semibold">{product.title}</p>
                        <div class="tracking-widest font-light flex items-center text-lg mb-5">
                                Type : {product.type}
                        </div>
                        <div class="tracking-widest mt-6 items-center pb-5 border-b-2 text-lg border-gray-200 mb-5">
                                About : 
                                <br />
                                <div className="pl-2">{product.description}</div>
                        </div>



                        <div class="tracking-widest p-5 mt-6 items-center pb-5 border-2 text-lg border-gray-200 mb-5">
                            <h1 class="text-gray-900 text-xl title-font font-medium mb-1 ">Contact Details : </h1>
                        
                            Email : {product.email} 
                            <br />
                            Phone No: {product.PhoneNo}
                        </div>
                    </div>


                    
                    </div>
                </div>


                
                </section>                
            </div>
            ))

        }
        
        </div>


        <footer class="text-center text-white" style={{backgroundColor:"#0a4275", color:"white"}}>

<div class="container pt-9">
  <div class="mb-9 flex justify-center">
    <Link to=".#!" class="mr-9 text-neutral-800 dark:text-neutral-200">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4"
        fill="currentColor"
        viewBox="0 0 24 24">
        <path
          d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
      </svg>
    </Link>
    <Link to=".#!" class="mr-9 text-neutral-800 dark:text-neutral-200">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4"
        fill="currentColor"
        viewBox="0 0 24 24">
        <path
          d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
      </svg>
    </Link>
    <Link to=".#!" class="mr-9 text-neutral-800 dark:text-neutral-200">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        fill="currentColor"
        viewBox="0 0 24 24">
        <path
          d="M7 11v2.4h3.97c-.16 1.029-1.2 3.02-3.97 3.02-2.39 0-4.34-1.979-4.34-4.42 0-2.44 1.95-4.42 4.34-4.42 1.36 0 2.27.58 2.79 1.08l1.9-1.83c-1.22-1.14-2.8-1.83-4.69-1.83-3.87 0-7 3.13-7 7s3.13 7 7 7c4.04 0 6.721-2.84 6.721-6.84 0-.46-.051-.81-.111-1.16h-6.61zm0 0 17 2h-3v3h-2v-3h-3v-2h3v-3h2v3h3v2z"
          fill-rule="evenodd"
          clip-rule="evenodd" />
      </svg>
    </Link>
    <Link to=".#!" class="mr-9 text-neutral-800 dark:text-neutral-200">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4"
        fill="currentColor"
        viewBox="0 0 24 24">
        <path
          d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    </Link>
    <Link to=".#!" class="mr-9 text-neutral-800 dark:text-neutral-200">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4"
        fill="currentColor"
        viewBox="0 0 24 24">
        <path
          d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
      </svg>
    </Link>
    <Link to=".#!" class="text-neutral-800 dark:text-neutral-200">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4"
        fill="currentColor"
        viewBox="0 0 24 24">
        <path
          d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    </Link>
  </div>
</div>


<div class="p-4 text-center bg-white dark:bg-gray-900">
  © 2023 Copyright :
  ReSold
</div>
</footer>


        </div>  
   )
}
