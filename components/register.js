import axios from "axios"
import { useState ,useRef } from "react"

export default function Register(){

    const [Username , setUsername] = useState('')
    const [Password , setPassword] = useState('')
    const [Email , setEmail] = useState('')

    const formRef = useRef(null)

    //const userData = {Username , Password , Email}

    const handleregistration = async (event)=>{
        event.preventDefault();
        console.log("api cAlled")
        console.log(Username , Password , Email);
        try{
            const response = await axios.post('https://node-todo-delta.vercel.app/api/register',{Username , Password , Email})
            alert(response.data)

            // Use the reset method to reset the form
            formRef.current.reset();

        // Alternatively, you can reset the state variables
        // setUsername('');
        // setPassword('');
        // setEmail('');
        }catch(error){
            console.log(error);
            throw error;
        }
        
    }

    return<>
        <div>
            <form ref={formRef} id="Form" onSubmit={handleregistration}>
                <div className="m-3 p-2">
                    <label id="username" className="mr-2">Username</label>
                    <input type="text" className="text-black p-2 rounded-md" id="useername" placeholder="Username" onChange={(e)=>{setUsername(e.target.value)}}></input>
                </div>
                <div className="m-3 p-2">
                    <label id="pass" className="mr-2">Password</label>
                    <input type="password" id="Pass" className="text-black p-2 rounded-md" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}></input>
                </div>
                <div className="m-3 p-2">
                    <label id="email" className="mr-2">Email</label>
                    <input type="text" id="email" className="text-black p-2 rounded-md" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}}></input>
                </div>
                <button className="m-3 p-2" type="submit">Register</button>
                
            </form> 
        </div>
    </>
}