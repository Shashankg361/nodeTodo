import { firestore } from "@/firebase/handleDatabase"
import { addDoc, collection, doc, getDoc } from "firebase/firestore"
//import getTodo from "./getTodo"

const storeTodoApi = async (req,res)=>{
    if(req.method == 'POST'){
        const {Todo , UserName} = req.body
        const UserData = {Todo :Todo , Username :UserName} 
        const response = await storedata(UserData)
        const getResponse = await getTodo(response)
        const StoredTodo = getResponse.data()
        return res.status(200).json({Data: StoredTodo ,message:'Data added succesfully'})
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
    
    try{
        const documentRef = doc(firestore , 'TODOs' , docId)
        const response = await getDoc(documentRef)
        
        return response

    }catch(error){
        throw error
    }
    
}

export default storeTodoApi