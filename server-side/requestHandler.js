import userSchema from './models/user.model.js'
import profileSchema from './models/userData.model.js'
import postSchema from './models/post.model.js'


import bcrypt from 'bcrypt'
import pkg from "jsonwebtoken";
import nodemailer from "nodemailer"
const {sign}=pkg;

const transporter = nodemailer.createTransport({
   service:"gmail",
    auth: {
      user: "safakallianthodi6@gmail.com",
      pass: "oguo fhcw oszh bnul",
    },
  });

export async function signUp(req,res) {
   const {username,email,password,cpassword}=req.body;
   if(!(username&&email&&password&&cpassword))
        return res.status(404).send({msg:"Fields are empty"})
    const userEmail = await userSchema.findOne({email})
    // if(userEmail)
    //     return res.status(404).send({msg:"Email already exists"})
    bcrypt
    .hash(password,10)
    .then((hashedPassword)=>{
        userSchema
        .create({username,password:hashedPassword,email})
        .then(()=>{
             res.status(200).send({msg:"Successfully registered"})
        })
        .catch((error)=>{
            return res.status(404).send({msg:"Not registered"})
        })
    })
   
    
     
       
   
}


export async function signIn(req,res){
    try {
        const {email,password}=req.body
    // console.log(email,password);
    if(!(email&&password))
        return res.status(404).send({msg:"Fields are empty"})
    const user= await userSchema.findOne({email})
    // console.log(user);
    if(!user){
        return res.status(404).send({msg:"Invalid email"})
    }
    const success = await bcrypt.compare(password,user.password)
    // console.log(success);
    if(!success)
        return res.status(404).send({msg:"Invalid password"})
    const token = await sign({userId:user._id},process.env.JWT_KEY,{expiresIn:"24h"})
    // console.log(token);
    res.status(200).send({msg:"Successfully logged in",token})
    } catch (error) {
        console.log(error);  
    }
}

//verify email
export async function checkEmail(req,res) {
   try {
    const {email}=req.body
    // const userEmail = await userSchema.findOne({email})
    // if(userEmail)
    //    {
    //     res.status(400).send({msg:"Email already exists"})
    //    }

    const info = await transporter.sendMail({
        from: 'safakallianthodi6@gmail.com', // sender address
        to: `${email}`, // list of receivers
        subject: "EMAIL VERIFICATION", // Subject line
        text: "PLEASE VERIFY", // plain text body
        html: `<!DOCTYPE html>
        
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            color: #333;
        }
        .email-container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            border: 1px solid #ddd;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
        }
        .btn {
            display: inline-block;
            background-color: #000000;
            color: #ffffff;
            text-decoration: none;
            padding: 15px 30px;
            margin-top: 20px;
            border-radius: 4px;
            font-size: 18px;
            text-align: center;
        }
    </style>
</head>
<body>

    <div class="email-container">
        <p>Hello,</p>
        <p>Please verify your email address by clicking the button below.</p>
        <a href="http://localhost:3001/signup" class="btn">Verify Your Account</a>
    </div>

</body>
</html>`, // html body
      });
    //   console.log("Message sent: %s", info.messageId)
         res.status(201).send({msg:"Confirmation mail successfully sent"});
      
       
    
   } catch (error) {
    res.status(404).send({msg:error});

    
   }
   
}

export async function getUser(req,res) {
   try {
     // console.log(req.user.userId);
     const _id=req.user.userId
     // console.log(_id);
     const user = await userSchema.findOne({_id})
    //  console.log(user.username);
     const profile=await profileSchema.findOne({userID:_id})
    //  console.log(profile);
     res.status(200).send({username:user.username,profile});
   } catch (error) {
        res.status(400).send({ msg: error});
   }
}

//profile data
export async function getUserData(req,res) {
   try {
    // console.log(req.user.userId);
    const _id=req.user.userId
    const profileData= await profileSchema.findOne({userID:_id})
    const userData=await userSchema.findOne({_id:_id},{username:1,email:1})                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           

    res.status(200).send({profileData,userData:userData})
   } catch (error) {
    res.status(404).send(error)
   }
    
}



export async function editUserData(req,res) {
    const {username,email,gender,bio,phone,profile}=req.body
    // console.log(req.user.userId);
    const _id =req.user.userId
    console.log(_id);
    
    const user = await profileSchema.findOne({userID:_id})
    console.log(user);
    if(user){
        await userSchema.updateOne({_id},{$set:{username,email}}).then(async()=>{
            await profileSchema.updateOne({userID:_id},{$set:{gender,phone,bio,profile}}).then(()=>{
               return res.status(201).send({msg:"Updated Successfully!!"})
            }).catch((error)=>{
               return res.status(404).send({msg:error})
            })

        }).catch((error)=>{
           return res.status(404).send({msg:error})
        })

    }
   else{
    await userSchema.updateOne({_id},{$set:{username,email}})
    await profileSchema.create({gender,phone,profile,bio,userID:_id}).then(()=>{
        res.status(201).send({msg:"Created Successfully!!"})
    }).catch((error)=>{
        res.status(404).send({msg:error})
    })
   }
 }


//delete user data
export async function deleteData(req,res) {
    try {
        const {_id}=req.params;
        // console.log(_id);
        await userSchema.deleteOne({_id}).then(async()=>{
            await profileSchema.deleteOne({userID:_id}).then(()=>{
                res.status(200).send({msg:"Deleted successfully"})
            }).catch((error)=>{
                res.status(404).send({msg:error})
            })
        }).catch((error)=>{
        res.status(404).send({msg:error})
        })

    } catch (error) {
        res.status(404).send({msg:error})  
    }
 }

 // add post 
 export async function addPost(req,res) {
    const {description,postedTime,postedDate,images}=req.body
    const _id=req.user.userId
    await postSchema.create({description,postedTime,postedDate,images,userID:_id}).then(()=>{
        res.status(201).send({msg:"Created Successfully!!"})
    }).catch((error)=>{
        res.status(404).send({msg:error})
    })
 }


 // get post 
 export async function getPost(req,res) {
    try {
        const _id=req.user.userId
        const post = await postSchema.find({userID:_id})
        return res.status(200).send(post)
    } catch (error){
        res.status(404).send({msg:error})
    }
 }
 




