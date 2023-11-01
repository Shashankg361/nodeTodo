import { firestore } from "@/firebase/handleDatabase"
import { addDoc, collection, doc, getDoc } from "firebase/firestore"
import getTodo from "./getTodo"

export default async (req,res)=>{
    if(req.method == 'POST'){
        const {Todo , UserName} = req.body
        const UserData = {Todo :Todo , Username :UserName} 
        const response = storedata(UserData)
        console.log('Stored todo data' , response)
        const storedTodo = getTodo(response.id)
        return res.status(200).json({Data: storedTodo,message:'Data added succesfully'})
    }
}
const storedata = async(UserData)=>{
    try{
        const collectionRef = collection(firestore , 'TODOs')
    const storedTodo = await addDoc(collectionRef , UserData)
    return storedTodo.id
    }catch(error){
        throw error
    }
}

const getTodo = async(docId)=>{
    const documentRef = doc(firestore , 'TODOs' , docId)
    try{
        const response = await getDoc(documentRef)
        const StoredTodo = response.data()
        return StoredTodo

    }catch(error){
        throw error
    }
    
}