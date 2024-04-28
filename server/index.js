const express = require("express");
const bodyParser=require("body-parser");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const middleware =require('./middleware')
const DevUser=require('./devusermodel');
const Review =require('./reviewmodel');
const app = express();
const cors = require('cors');
app.use(bodyParser.json());

// app.use(cors({origin:'*'}));

app.use(cors(
    {   
        origin:["https://mern-deploy-frontend-inky.vercel.app"],
        methods:["POST","GET","PUT","DELETE"],
        credentials:true
    }));

    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', 'https://mern-deploy-frontend-inky.vercel.app');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        next();
      });
      

    

mongoose
  .connect(
    "mongodb+srv://bhuvanesh1440:Bhuvi86400@cluster0.gc387f9.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0",
    // { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("connected to database");
  });

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post('/register',async (req,res) =>{
    try{
        
        const {fullname,email,mobile,skill,password,confirmpassword}=req.body;
        // const exist = await DevUser.findOne({email});
        const exist = await DevUser.findOne({ $or: [{ email }, { mobile }] });
        
        if(exist){
            return res.status(400).send("User already Registred")
            
        }
        if(password!=confirmpassword){
            console.log(password);
            console.log(confirmpassword);
            return res.status(400).send("Password does not match")
        }

        let newUser = new DevUser({
            fullname,email,mobile,skill,password,confirmpassword
        })
        newUser.save();
        
        return res.status(200).send('User Registered Successfully');

    }catch(err){
        console.log(err);
        return res.status(500).send('Server Error');
    }
})


app.post("/login", async (req,res)=>{
    try{
        const {email, password} = req.body;
        const exist =await DevUser.findOne({email});
        if(!exist){
            return res.status(400).send("User not exist");
        }
        console.log(exist.password);
        console.log(password);
        if(exist.password!=password){
            return res.status(400).send("Password Invalid");
        }

        let payload ={
            user :
            {
                id :exist.id
            }
        }
        jwt.sign(payload,'jwtPassword',{expiresIn:'1h'},(error,token)=>{
            
            if(error) throw error;

            return res.json({token})

        })

        // return res.status(200).send('Login Successful');
    }catch(err){
        console.log(err);
        return res.status(500).send('Server Error');
    }
})

app.get("/allprofiles",middleware, async (req,res)=>{
    try{
        let allprofiles = await DevUser.find();
        return res.status(200).json(allprofiles);
    }catch(err){
        console.log(err);
        return res.status(500).send("Server Error");
    }
})

app.get('/myprofile',middleware,async (req,res)=>{
    try{
        let user = await DevUser.findById(req.user.id);
        return res.status(200).json(user);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error');
    }
})


//Reviews

app.post('/addreview',middleware, async (req,res)=>{
    try{
        const {taskworker,ratings}=req.body;

        const exist = await DevUser.findById(req.user.id);
        
        const newreview =new Review({
            taskprovider:exist.fullname,
            taskworker,ratings
        });
        newreview.save();
        return res.status(200).send("Review updated successfully");
    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error');
    }
})

// middleware always provides u an id (login user id)
// app.get("/myreview",middleware, async (req,res)=>{
//     try{
//         let allreviews = await Review.find();

//         let myreviews = allreviews.filter(review =>Review.taskworker.toString()=== req.user.id.toString());

//         return res.status(200).json(myreviews)
//     }
//     catch(err){
//         console.log(err);
//         return res.status(500).send('Server Error');
//     }
// })

app.get("/myreview", middleware, async (req, res) => {
    try {
      // Assuming req.user.id contains the user's ID
      const allReviews = await Review.find({ taskworker: req.user.id });
  
      return res.status(200).json(allReviews);
    } catch (err) {
      console.log(err);
      return res.status(500).send('Server Error');
    }
  });
  

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});



