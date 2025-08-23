import express,{ Router,Request,Response } from "express";
import AdminController from "../controllers/adminController";
import AdminService from "../services/admin/adminService";
import UserRepository from "../repositories/user/userRepository";
import { AdminRepository } from "../repositories/admin/adminRepository";


const adminRoute : Router = express.Router()
//Repository
const userRepository = new UserRepository ()
const adminRepository = new AdminRepository ()
//Service
const adminService = new AdminService(adminRepository,userRepository)
// Controllers
const adminController = new AdminController (adminService)



adminRoute.post('/login',(req:Request,res:Response) =>{
  adminController.login(req,res)
})
adminRoute.post('/logOut',(req:Request,res:Response) => {
  adminController.logout(req,res)
})
adminRoute.get('/users',(req:Request,res:Response) => {
  adminController.getAllUsers(req,res)
})
adminRoute.post('/block-user',(req:Request,res:Response) => {
  adminController.blockUser(req,res)
})

export default adminRoute