import { firestore } from "@/firebase/handleDatabase"
import { collection, getDocs, query, where } from "firebase/firestore"
const jwt = require('jsonwebtoken')

export default async(req , res)=>{
    if(req.method === 'POST'){
        const {UserName} = req.body
        //console.log('Name ',UserName)
        const collectionRef = collection(firestore , 'LoginUsersTokens')
        const q = query(collectionRef , where('Username' , '==' ,UserName ))
        const snapshot = await getDocs(q)
        const document = snapshot.docs
        //console.log('docu ', document)
        document.forEach((doc)=>{
            console.log('Datataaaa - ',doc.data())
        })
        const data = document[0].data()
        if(validateToken(data)){
            const todoData = getTodoDoc(UserName)
            console.log(todoData)
            res.status(200).json({todoData , message:true})
        }else{
            res.json({ message: false });
        }
    }

}

const validateToken = (data)=>{
    const token = data.token
    const secretKey = data.secretKey
    const decoded = jwt.verify(token , secretKey)
    if(decoded.exp <= Date.now() / 1000){
        return false
    }else{
        return true
    }
}
1
const getTodoDoc = async (UserName)=>{
    const collectionRef = collection(firestore , 'TODOs')
    const q = query(collectionRef , 'Username' , '==' , UserName)
    const todoData = await getDocs(q)
    const doucment = todoData.docs
    return doucment
}