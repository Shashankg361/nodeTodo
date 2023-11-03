import { userState } from "@/pages/_app"
import Link from "next/link"
import { useContext } from "react"

export default function Nav(){
    const {loggedIn , setLoggedIn} = useContext(userState)
    //const session=false
    const logout = ()=>{
        setLoggedIn(false)
        localStorage.removeItem('Username')
        console.log(loggedIn)
    }

    return<>
        <div className="flex" style={{display:'flex', justifyContent:'space-between'}}>
            <div>
                <h1 className="cursor-pointer">TODO</h1>
            </div>
            <div>
                { loggedIn ? 
                    <button className="cursor-pointer text-black bg-red-700" onClick={logout}>LogOut</button>
                    :<Link href={'../login-register'}><button className="cursor-pointer"><h1>Login/Register</h1></button></Link>
                }
                
            </div>
        </div>
    </>
}