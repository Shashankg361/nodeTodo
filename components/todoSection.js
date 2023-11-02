import { userState } from "@/pages/_app";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react"

export default function TodoSection(){
    const {loggedIn , setLoggedIn} = useContext(userState)
    const [loginAck , setLoginAck] = useState('Do Login')
    const [Todos , setTodos] = useState([])
    const [Todo , setTodo] = useState('');
    const [UserName , setUserName] = useState('')
    
    useEffect(()=>{
        fetchData()
    },[loggedIn])

    const fetchData = async ()=>{
        if (typeof window !== 'undefined') {
            const Username = localStorage.getItem('Username');
           setUserName(Username)
        }

        if(UserName){
            const response = await axios.post('/api/getTodo',{UserName})
            const data = response.data
            const docs = data.todoData
            data.forEach(doc => {
                console.log(doc.data())
            });
            setTodos(data)
            console.log('tooooods',Todos)
            setLoggedIn(data.message)
            data.message ? setLoginAck('Wellcom!! ',UserName): setLoginAck('Session expired Please Login')
        }else{
            setLoggedIn(false)
        }
    }

    
    const handleSubmit = async (event)=>{
        event.preventDefault()
        console.log(loggedIn)
        if(loggedIn){
            const response = await axios.post('/api/storeTodo',{Todo , UserName})
            const data = response.data
            console.log('todo - ' , data) 
            console.log(Todos)
            setTodos([...Todos , data.Todo])
            
            setLoginAck('Wellcom!! ',UserName)
        }else{
            setLoginAck('Do Login ',UserName)
        }
    }

    return<>
        <div className="flex flex-col align-center ">
            <div>
                <form onSubmit={handleSubmit} >
                    <input type="text" className="text-black" placeholder="Enter Your Todo" onChange={(e)=>setTodo(e.target.value)}></input>
                    <input type="submit"></input>
                </form>
            </div>
            
            <div className=" bg-white m-3 text-black ">
                <h1>{loginAck}</h1>
                {(Todos.length >0 && Todos.map((todoObj)=>{
                    return<h1>Your Work : {todoObj.Todo}</h1>
                }))}
            </div>
        </div>
    </>
}

export async function getServerSideProps(){

}