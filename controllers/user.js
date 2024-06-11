import User from "../models/user.js"
import {v4 as uuidv4} from 'uuid'
import { setUser } from "../service/auth.js";


const handleUserSignup = async (req, res)=>{
    const {name, email, password} = req.body
    await User.create({
        name,
        email,
        password
    });
    return res.redirect('/')
}

async function handleUserLogin(req, res){
    const { email, password} = req.body
    const user = await User.findOne({ email , password })
    // console.log(user);
    if(!user)
        return res.render("login", {
            error: "Invalid Username or password"
        })
    // const sessionId = uuidv4()
    const token = setUser(user)
    res.cookie('token', token)
    return res.redirect('/')
}


export  {
    handleUserSignup,
    handleUserLogin
}