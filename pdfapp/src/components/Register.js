import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {

   const [Name,setName] = useState("");
   const [email,setEmail] = useState("");
   const [password,setPassword] = useState("");
   const navigate = useNavigate();

   const handleSubmit= async (e) => {
      e.preventDefault();
      const URL = `http://localhost:8080/api/register`;
      const response = await fetch(URL,{
        method: 'POST',
        headers:{
         'Content-Type':'application/json',
        },
        body:JSON.stringify({
              Name,
              email,
              password
            }),
      })

      const data = await response.json();
      console.log(data,"userdata1");
      navigate('/login');

   }

    return(
        <>
            <h1> Resgister Form </h1>
            <form onSubmit={handleSubmit}>
               <label>Enter your Name:
                  <input 
                  type="text"
                  placeholder='name'
                  value={Name}
                  onChange={(e)=>{setName(e.target.value)}} />
               </label>
              
               <label>Enter your Email:
               <input 
                  type="Email"
                  placeholder='email'
                  value={email}
                  onChange={(e)=>{setEmail(e.target.value)}} />
               </label>
               <label>Enter your Password:
                  <input 
                  type="Password"
                  placeholder='password'
                  value={password}
                  onChange={(e)=>{setPassword(e.target.value)}} />
               </label>

               <input type="submit" value="Register"/>
            </form>
        </>
    )
}

export default Register;
