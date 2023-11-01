import { userState } from "@/pages/_app"
import Link from "next/link"
import { useContext } from "react"

export default function Nav(){
    const {loggedIn , setLoggedIn} = useContext(userState)
    const session=false
    return<>
        <div className="flex" style={{display:'flex', justifyContent:'space-between'}}>
            <div>
                <h1 className="cursor-pointer">TODO</h1>
            </div>
            <div>
                <Link href={'../login-register'}><button className="cursor-pointer">{session?<h1>LogOut</h1>:<h1>LogIn/Register</h1>}</button></Link>
            </div>
        </div>
    </>
}