import { userState } from "@/pages/_app";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react"

export default function TodoSection(){
    const {loggedIn , setLoggedIn} = useContext(userState)
    const [loginAck , setLoginAck] = useState('Do Login')
    const [Todos , setTodos] = useState([])
    const [Todo , setTodo] = useState('');
    var UserName = ''
    
    useEffect(()=>{
        
        if (typeof window !== 'undefined' && localStorage.getItem('Username') ) {
            //setUserName(localStorage.getItem('Username'))
            UserName= localStorage.getItem('Username')
            console.log('I am in useEffect',UserName)
        }
        //setUserName(username)
        console.log(UserName)
        if(UserName){
            console.log('TodoStore - ',UserName)
            fetchData()
        }
        
    },[])

    const fetchData = async ()=>{
        console.log('Useeffect working')
        if(UserName){
            console.log(UserName)
            const response = await axios.post('/api/getTodo',{UserName})
            const data = response.data

            if(data.message){   
                const docs = data.docArray
                console.log(docs)
                
                    docs.forEach(doc => {
                        setTodos(Todos =>[...Todos,doc.Todo])
                        console.log(doc.Todo)
                    });
                
                console.log('tooooods',Todos)
            }
            setLoggedIn(data.message)
            data.message ? setLoginAck( `Wellcom!! ${UserName}`): setLoginAck('Session expired Please Login')
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
                <form onSubmit={handleSubmit} >
                    <input type="text" className="text-black" placeholder="Enter Your Todo" onChange={(e)=>setTodo(e.target.value)}></input>
                    <input type="submit"></input>
                </form>
            </div>
            
            <div className=" bg-white m-3 text-black ">
                <h1>{loginAck}</h1>
                {loggedIn?
                    (
                    (Todos.length >0 && Todos.map((todoObj)=>{
                        return<h1>Your Work : {todoObj}</h1>})))
                    :<h1>Please login</h1>    
                }
            </div>
        </div>
    </>
}

export async function getServerSideProps(){

}