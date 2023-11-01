
import { userState } from "@/pages/_app"
import axios from "axios"
import { useContext, useState } from "react"
import { useRef } from "react"
import { useRouter } from "next/router"

export default function Login(){
    const {loggedIn , setLoggedIn} = useContext(userState)

    const [UserName , setUsername] = useState('')
    const [Password , setPassword] = useState('')
    const loginform = useRef(null)
    const router = useRouter()

    console.log('user ' , UserName  )

    const handleSubmit = async (event) =>{
        try
        {event.preventDefault()
        loginform.current.reset()
        const response = await axios.post('/api/login',{UserName , Password})
        localStorage.setItem("Username" , response.data.Username)
        setLoggedIn(response.data.message)
        console.log('loooooog', loggedIn)
        console.log('message ' , response.data.message)

        console.log('login ',loggedIn)
        if(loggedIn){
            router.push('/')
        }
    
    }catch(error){
        console.error(error)
        throw error
    }
    } 

    return<>
        <div>
            <form onSubmit={handleSubmit} ref={loginform}>
                <div className="flex flex-col aling-start ">
                    <label id="username" className="p-2">Username</label>
                    <input type="text" className="p-2 text-black" id="useername" placeholder="Username/Email" onChange={(e)=>{setUsername(e.target.value)}}></input>
                </div>
                <div>
                    <label id="Password">Password</label>
                    <input type="password" className="m-2 text-black" id="Password" placeholder="Username/Email" onChange={(e)=>{setPassword(e.target.value)}}></input>
                </div>
                <input type="submit"></input>
                
            </form> 
        </div>
    </>
}