import express,{ Router,Request,Response } from "express";


const adminRoute : Router = express.Router()



adminRoute.post('/login',(req:Request,res:Response) =>{
  adminController.login(req,res)
})

export default adminRoute