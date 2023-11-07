import { firestore } from "@/firebase/handleDatabase"
import { collection, doc, updateDoc } from "firebase/firestore"


const updateTodo = async(req,res)=>{
    if(req.method === "POST"){
        const {docId,updatedTodo} = req.body
        console.log(updatedTodo)
        const collectionRef = collection(firestore , 'TODOs')
        const documentRef = doc(collectionRef, docId)
        try
        {
            if(updatedTodo){
                await updateDoc(documentRef , {Todo:updatedTodo})
                res.status(200).json({message:'Updated successfully' , updated:true})
            }else{
                res.json({message:'Please give Todo'})
            }
            
        }
        catch(error){
            res.json({message:`Error occoured ${error}`})

        }

    }
}

export default updateTodo