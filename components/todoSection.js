import { userState } from "@/pages/_app";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react"

export default function TodoSection(){
    const {loggedIn , setLoggedIn} = useContext(userState)
    const [loginAck , setLoginAck] = useState('Do Login')
    const [Todos , setTodos] = useState([])
    const [Todo , setTodo] = useState('');
    var UserName = ''
    const formRef = useRef(null)
    
    useEffect(()=>{
        
        if (typeof window !== 'undefined' && localStorage.getItem('Username') ) {
            //setUserName(localStorage.getItem('Username'))
            UserName= localStorage.getItem('Username')
        }
        //setUserName(username)
        if(UserName){
            fetchData()
        }
        
    },[])

    const fetchData = async ()=>{
        if(UserName){
            const response = await axios.post('/api/getTodo',{UserName})
            const data = response.data

            if(data.message){   
                const docs = data.docArray
                    docs.forEach(doc => {
                        setTodos(Todos =>[...Todos,doc.Todo])
                        //console.log(doc.Todo)
                    });
                    
            }
            setLoggedIn(data.message)
            data.message ? setLoginAck( `Wellcom!! ${UserName}`): setLoginAck('Session expired Please Login')
        }else{
            setLoggedIn(false)
        }
    }

    
    const handleSubmit = async (event)=>{
        event.preventDefault()
        formRef.current.reset()
        console.log(loggedIn)
        if(loggedIn){
            const response = await axios.post('/api/storeTodo',{Todo , UserName})
            const data = response.data
            const getData = data.Data
            console.log('todo - ' , getData.Todo) 
            
            setTodos([...Todos , getData.Todo])
            console.log(Todos)
            setLoginAck('Wellcom!! ',UserName)
        }else{
            setLoginAck('Do Login ',UserName)
        }
    }

    return<>
        <div className="flex flex-col align-center ">
            <div>
                <form onSubmit={handleSubmit} ref={formRef} >
                    <input id="GetTodo" type="text" className="text-black mr-2" placeholder="Enter Your Todo" onChange={(e)=>setTodo(e.target.value)}></input>
                    <input id="GetTodo" type="submit"></input>
                </form>
            </div>
            
            <div className=" bg-white m-3 text-black ">
                <h1>{loginAck}</h1>
                {loggedIn?
                    (
                    (Todos.length >0 && Todos.map((todoObj)=>{
                        return<h1 key={UserName}>Your Work : {todoObj}</h1>})))
                    :<h1>Please login</h1>    
                }
            </div>
        </div>
    </>
}
