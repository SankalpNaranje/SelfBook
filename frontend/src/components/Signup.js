import React, { useState } from 'react'
import { useNavigate} from "react-router-dom";

export default function Signup(props) {
    const [credentials ,setCredentials]= useState({name:"",email:"",password:"",cpassword:""})
    let history = useNavigate(); 

    const handleSubmit= async(e)=>{
        e.preventDefault();
        const {name,email,password}=credentials;
        const response = await fetch("https://self-book-backend.vercel.app/api/auth/createuser", {
            method: "POST", 
            headers: {
              "Content-Type": "application/json"
             
            },
            body: JSON.stringify({name,email,password}) 
          });
          const json = await response.json()
          console.log(json);
          if(json.success){
          // save the auth-token and redirect
            localStorage.setItem('token', json.authToken);
            history("/home");
            props.showAlert(" Account Created Successfully " ,"success")
          }
          else{
            props.showAlert("Invalid Credentials" ,"danger")
          }
          
          
    }

    const onChange = (e)=>{
        setCredentials({
            ...credentials ,[e.target.name]:e.target.value
        })
    }

  return (
    <div className='container mt-3'>
      <h2>Create an Account Now !!</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">User Name</label>
                <input type="text" className="form-control" id="name" name='name' onChange={onChange} aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name='email' onChange={onChange} aria-describedby="emailHelp"/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" name='password' onChange={onChange} minLength={5} required id="password"/>
            </div>
            <div className="mb-3">
                <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" name='cpassword' onChange={onChange} minLength={5} required id="cpassword"/>
            </div>
            
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}
