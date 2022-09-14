const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const combineRouter = require("./router");
const { PrismaClient } = require("@prisma/client");
const { use } = require("./api/auth");
const { login } = require("./api/auth/controller");
const port = 3000;

const prisma = new PrismaClient();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

combineRouter(app);

app.get("/",async (req,res) => {
   res.send("home");
})
app.get("/login",async (req,res) => {
   res.send("login");
})
app.get("/register",async (req,res) => {
   res.send("register");
})

app.get("/status", async (req, res) => {
   //    const user = await prisma.user.create({
   //       data: {
   //          id: "1",
   //          email: "test@test.com",
   //          password: "test",
   //          name: "name",
   //       },
   //    });
   //    console.log(user);

   res.json({ isActive: true });
});

//Register
app.post("/register",async(req,res,next)=>{
   const data = req.body;
   console.log(data);
     const id = req.body.id;
     const user = await prisma.user.findUnique({
         where: {
             id
         }
     });
     if (!user) {
      try {
         const user = await prisma.user.create({
             data : req.body,
         })
         res.json(user)
         console.log("Registered new user !")
         }catch(error){
             next(error)
         }
     }
     else
     {
         res.send("user is already registered !");
         console.log("user is already registered !");
     }
})

//Login 
app.post("/login",async(req,res,next)=>{

   const id = req.body.id;
   const password = req.body.password;

   const user = await prisma.user.findUnique({
      where: {
          id
      }
   });
   if (!user) {
      res.send('invalid creadentials !')
      console.log("invalid creadentials !");
   }
   try{
         if(password === user.password){
            console.log("logged in successfully");
            res.send("logged in successfully");
         }
         else {
            res.send('invalid creadentials !')
            console.log("invalid creadentials !");
         }
   }catch(error){
      next(error)
   }
})

app.listen(port, async () => {
   console.log("Connecting to mongodb please wait...");
   await prisma.$connect();
   console.log("Connected\nApp is listening at port ", process.env.PORT);
});