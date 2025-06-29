import {JWT_SECRET, users} from "../server.js"
import jwt from "jsonwebtoken"

function getDataFromMemory(username){
    const user=users.find(x=>x.username==username);
    return user;
}
function userData(req, res) {
    try{
    let token=req.headers.authorization;
    let data=jwt.verify(token,JWT_SECRET);  
    let user=getDataFromMemory(data.username);  
    res.json(user);
    }
    catch(err){
        res.json({err:"something went wrong"})
    }
}
export { userData };