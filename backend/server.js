const express =require("express")
const app=express()
const connectDB=require("./config/connectDB")
const cors=require("cors")
require("dotenv").config()

connectDB()
const port=process.env.PORT||5000
//global middlewares
app.use(express.json())
app.use(cors())
//Routes
app.use("/user",require("./routes/userRoutes"))
app.listen(port,(error)=>{
    error?console.log(error):console.log(`server is running at ${port}`);;
})
