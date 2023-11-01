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
            const response = await axios.post('/api/register',{Username , Password , Email})
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
                <div>
                    <label id="username">Username</label>
                    <input type="text" className="text-black" id="useername" placeholder="Username" onChange={(e)=>{setUsername(e.target.value)}}></input>
                </div>
                <div>
                    <label id="pass">Password</label>
                    <input type="password" id="Pass" className="text-black" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}></input>
                </div>
                <div>
                    <label id="email">Email</label>
                    <input type="text" id="email" className="text-black" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}}></input>
                </div>
                <button type="submit">Register</button>
                
            </form> 
        </div>
    </>
}