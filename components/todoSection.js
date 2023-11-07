import { userState } from "@/pages/_app";
import axios from "axios";
import { createRef } from "react";
import { useContext, useEffect, useRef, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faCopyright } from "@fortawesome/free-regular-svg-icons";
import { faCircleMinus, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
//import { count } from "firebase/firestore";
var UserName = ''

export default function TodoSection(){
    const {loggedIn , setLoggedIn } = useContext(userState)
    const [loginAck , setLoginAck] = useState('Do Login')
    const [Todos , setTodos] = useState({})
    const [Todo , setTodo] = useState('');
    const [updatedTodo , setUpdatedTodo ]= useState('')
    const [key , setKey] = useState('')
    const UpdateTodofrom = useRef(null)
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
            console.log('entered')
            const response = await axios.post('https://node-todo-delta.vercel.app/api/getTodo',{UserName})
            const data = response.data
            
            if(data.message){   
                setTodos(data.hashmap)
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
            
            const response = await axios.post('https://node-todo-delta.vercel.app/api/storeTodo',{Todo , UserName})
            const data = response.data
            const getData = data.Data
            console.log('todo - ' , getData.Todo , 'with id ',data.id ,data.message) 
            
            setTodos({...Todos , [data.id]:getData.Todo})
            setLoginAck('Wellcom!! ',UserName)
        }else{
            setLoginAck('Do Login ',UserName)
        }
    }

    const updateTodosState = (key)=>{
        setKey(key)
        console.log('key ', key)
        UpdateTodofrom.current.classList.remove('hidden')
    }

    const updateTodo = async()=>{
        const docId = key
        console.log('docID ',docId)
        try{
            const response = await axios.post('https://node-todo-delta.vercel.app/api/updateTodo',{docId,updatedTodo})
            if(response.data.updated){
            updateTodoHashmap(docId)
            }
            console.log(response.data.message)
            alert(response.data.message)
        }catch(error){
            console.log(error)
        }
        UpdateTodofrom.current.classList.add('hidden')
    }
    const updateTodoHashmap = (docId)=>{
        setTodos(prevState=>({
            ...prevState,
            [docId]:updatedTodo
        }))
    }
    const cancelFunc = ()=>{
        UpdateTodofrom.current.classList.add('hidden')
    }
    const deleteTodo =async (key)=>{
        try{
            const response = await axios.post('https://node-todo-delta.vercel.app/api/deleteDoc', {key})
            const data = response.data
            deleteTodos(key)
            console.log(data.message)
            alert(data.message)
        }catch(error){
            console.log(error)
        }
    }
    const deleteTodos = (key)=>{
        setTodos((prevState)=>{
            const temp = {...prevState}
            delete temp[key]
            return temp
        })
    }

    return<>
        <div className="flex flex-col items-center justify-center m-4">
            <div>
                <form onSubmit={handleSubmit} ref={formRef} >
                    <input id="GetTodo" type="text" className="text-black mr-2 rounded-lg p-2" placeholder="Enter Your Todo" onChange={(e)=>setTodo(e.target.value)}></input>
                    <input id="GetTodo" type="submit"></input>
                </form>
            </div>
            
            <div className=" bg-white m-3 text-black p-5">
                <h1>{loginAck}</h1>
                {loggedIn?
                    (
                    (Object.keys(Todos).length >0 && Object.entries(Todos).map(([key , value],index)=>{
                        
                        return<div key={index} className="flex justify-between items-center">
                            <div className="">
                                <h1 >Your Work : {value}</h1>
                                <div><span className="mr-2 ml-2 cursor-pointer" onClick={()=>updateTodosState(key)}><FontAwesomeIcon icon={faPenToSquare} style={{color: "##0b4d70", width:"27px" ,height:"27px"}} ></FontAwesomeIcon></span>
                                <span className="cursor-pointer"><FontAwesomeIcon onClick={()=>deleteTodo(key)} icon={faCircleMinus} style={{color: "##0b4d70", width:"27px" ,height:"27px"}}></FontAwesomeIcon></span>
                                </div>
                            </div>
                            
                            </div>})))
                    :<h1>Please login</h1>    
                }
            </div>
            <div ref={UpdateTodofrom} className="fixed top-0 left-0 bg-slate-900 opacity-95 flex flex-col justify-center items-center w-screen h-screen hidden">
                <div className="bg-white opacity-100 p-5 w-2/5 h-1/5 flex-col ">
                    <input type="text" className="text-black border-4 border-black rounded-lg m-2" onChange={(e)=>setUpdatedTodo(e.target.value)} placeholder="Update todo"></input>
                    <div className="m-2">
                        <input className="text-black p-2 mr-3 border-4 border-black rounded-lg" onClick={updateTodo} type="submit"></input>
                        <button className="text-black p-2 border-4 border-black rounded-lg" onClick={cancelFunc} >Cancel</button>
                    </div>
                    
                </div>
            </div>
        </div>
    </>
}
