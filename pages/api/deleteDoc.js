import { firestore } from "@/firebase/handleDatabase"
import { deleteDoc, doc } from "firebase/firestore"

const deleteTodo = async(req , res)=>{
    if(req.method === 'POST'){
        const {key} = req.body
        const documentRef = doc(firestore , 'TODOs' ,key)
        try{
            await deleteDoc(documentRef)
            res.status(200).json({message:"Todo deleted"})
        }catch(error){
            res.json({message:"error"})
        }
    }
}

export default deleteTodo