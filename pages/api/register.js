import { firestore } from "@/firebase/handleDatabase"
import { collection , addDoc } from "firebase/firestore"
const bcrypt = require('bcrypt')

export default async (req , res)=>{
    if(req.method === "POST"){
        const {Username , Password , Email}  = req.body
        const response = await handleregistration(Username , Password , Email)
        console.log(response)
    }
    res.status(200).json({message:"Successfully registred"})

}

const handleregistration = async (Username , Password , Email)=>{

    try
    {const saltRounds = 10
    const salt = bcrypt.genSaltSync(saltRounds)
    const saltedPassword = Password + salt ;

    const hashedPassword = bcrypt.hashSync(saltedPassword , saltRounds)

    const userData = {Username , hashedPassword , Email ,salt}
    const collectionRef = collection(firestore , 'User');
    const addDocs = await addDoc(collectionRef , userData);
    console.log(addDocs.id);
    return addDocs.id;
}
    catch(err){
        console.error(err)
        throw err
    }

}