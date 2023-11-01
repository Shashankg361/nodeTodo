import { firestore } from "@/firebase/handleDatabase"
import { addDoc, collection ,getDocs,query , where} from "firebase/firestore"


const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const secretKey = crypto.randomBytes(32).toString('hex'); // 32 bytes (256 bits)
console.log('Generated secret key:', secretKey);

export default async(req,res)=>{

    if(req.method === 'POST'){
        const {UserName , Password} =req.body
        console.log("username - ",UserName)
        const data = await handleDatabase({UserName , Password})

        console.log("snapshot - ",data[0].data())
        if(data){
            var createSession = calculation(data , Password);
        }else{
            res.json({message :'Get yourself register'})
        }
        
        //console.log(data[0].data)

        if(createSession){
            addToken(UserName)
            res.status(200).json({ Username: UserName, message:true});
        }else{
            res.status(401).json({message:"Incorrect Password"})
        }
    }
}

const handleDatabase = async ({UserName , Password})=>{
    console.log(UserName , Password)
    try{
        const collectionRef = collection(firestore , 'User')
        const q = query(collectionRef , where('Username' , '==' ,UserName))
        const querySanpshot = await getDocs(q);
        if(!querySanpshot.empty){
            const document = querySanpshot.docs
            console.log('doc',document[0].data())
            document.forEach((doc)=>{
                console.log('Data ',doc.data())
            })
            
            return document
        }else{
            return false
        }
        
    }
    catch(error){
        console.error(error)
        throw error
    }
        
}

const calculation = (doc ,Password)=>{

    const data = doc[0].data()
    const storedHashedPassword = data.hashedPassword 
    const storedSalt = data.salt

    const loginPassword = Password

    const saltedLoginPassword = loginPassword + storedSalt
    console.log('saltedLoginPassword - ',saltedLoginPassword , 'storedHashedPassword - ',storedHashedPassword )

    const matchedPassword = bcrypt.compareSync(saltedLoginPassword ,storedHashedPassword )

    if(matchedPassword){
        return true
    }else{
        return false
    }

}

const addToken = async(UserName)=>{
        const collectionRef = collection(firestore , 'LoginUsersTokens')
        const q = query(collectionRef , where('username','==' , UserName))
        const token = jwt.sign({ Username: UserName }, secretKey, { expiresIn: '1h' });
        const tokendata = {Username: UserName , token :token , secretKey : secretKey}
        const response = getDocs(q)
        const doucment = response.docs
        if(!doucment)
        { try
        {const storeToken = await addDoc(collectionRef , tokendata)
        console.log('Token created successfully with doc id ' , storeToken.id)}
        catch(error){
            console.log('error occurred ', error)
        }
        } else{
            const documentRef = collectionRef.doc(document[0].id)
            try
            {await documentRef.updated(tokendata.token , tokendata.secretKey)
                console.log('token updated successfully ')
            }
            catch(error){
                console.log('error occured', error)
            }
        }
}