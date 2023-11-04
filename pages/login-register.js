import Login from "@/components/login"
import Register from "@/components/register"
import { useContext, useState } from "react"
import { userState } from "./_app"


export default function Login_register(){
    const {loggedIn , setLoggedIn} = useContext(userState)
    const [form , setForm] = useState(true)
    
    return<>
        <div className="m-5">
            <button className="p-3 bg-gray-50 border-2 rounded-lg border-red-50 text-black mr-3" onClick={()=>{setForm(true)}}>login</button>
            <button onClick={()=>{setForm(false)}}>Register</button>

            {form ? <Login  /> :<Register  />}           
            
        </div>
    </>
}