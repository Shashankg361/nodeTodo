import { firestore } from "@/firebase/handleDatabase"
import { collection, getDocs, query, where } from "firebase/firestore"
const jwt = require('jsonwebtoken')

const getTodoApi = async(req , res)=>{
    if(req.method === 'POST'){
        const {UserName} = req.body
        console.log('gettodo Name ',UserName)
        const collectionRef = collection(firestore , 'LoginUsersTokens')
        const q = query(collectionRef , where('Username' , '==' ,UserName ))
        const snapshot = await getDocs(q)
        const document = snapshot.docs
        //console.log('docu ', document)
        /*document.forEach((doc)=>{
            console.log('Datataaaa - ',doc.data())
        })*/
        const data = document[0].data()
        if(!validateToken(data)){
            const hashmap = new Map()
            const todoData = await getTodoDoc(UserName)
            const document = todoData.docs
            document.forEach((doc)=>{
                hashmap.set(doc.id,doc.data().Todo)
            })
            const objHashmap = Object.fromEntries(hashmap)
            res.status(200).json({hashmap:objHashmap , message:true})
        }else{
            res.json({ message: false });1
        }
    }

}

const validateToken = (data)=>{
    const token = data.token
    const secretKey = data.secretKey
    try{
        const decoded = jwt.verify(token , secretKey)
        return false
    }catch(error){
        return true
    }
    
    
}

const getTodoDoc = async (UserName)=>{
    const collectionRef = collection(firestore , 'TODOs')
    const q = query(collectionRef , where('Username' , '==' , UserName))
    const todoData = await getDocs(q)
    
    return todoData
}

export default getTodoApi