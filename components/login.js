import { userState } from "@/pages/_app"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useRef } from "react"
import { useRouter } from "next/router"
export const TodoCount = null
export default function Login(){
    const {loggedIn , setLoggedIn} = useContext(userState)
    var [passwordVerified , setPasswordVerified] = useState(true)
    const [UserName , setUsername] = useState('')
    const [Password , setPassword] = useState('')
    const loginform = useRef(null)
    const router = useRouter()
     useEffect(()=>{
            if(loggedIn){
                router.push('/')
        }
    },[loggedIn , router])

    const handleSubmit = async (event) =>{
        try
        {event.preventDefault()
        loginform.current.reset()
        const response = await axios.post('https://node-todo-delta.vercel.app/api/login',{UserName , Password})
        localStorage.setItem("Username" , response.data.Username)
        localStorage.setItem("count" , response.data.todoCount)
        setLoggedIn(response.data.message)
        setPasswordVerified(response.data.message)

    }catch(error){
        console.error(error)
        throw error
    }
    } 

    return<>
        <div className="flex flex-col items-center ">
            <form onSubmit={handleSubmit} ref={loginform}>
                <div className="flex flex-col">
                    <label id="username" className="mb-2 mt-2">Username</label>
                    <input type="text" className="p-2 text-black" id="useername" placeholder="Username/Email" onChange={(e)=>{setUsername(e.target.value)}}></input>
                </div>
                <div className="flex flex-col ">
                    <label id="Password" className="mb-2 mt-2">Password</label>
                    <input type="password" className="text-black p-2" id="Password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}></input>
                </div>
                <div>{!passwordVerified && <h1>Incorrect Password</h1>}</div>
                <input type="submit" className="mt-2 p-3 cursor-pointer rounded"></input>
                
            </form> 
        </div>
    </>
}