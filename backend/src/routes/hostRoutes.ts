import express,{ Router } from "express";
import { hostRepository } from "../repositories/host/hostRepository";
import { HostControlller } from "../controllers/hostController";
import { HostService } from "../services/host/hostService";

const hostRoute : Router = express.Router()
const HostRepository = new hostRepository()
const hostService = new HostService(HostRepository)
const hostController = new HostControlller(hostService)

hostRoute.post('/host-request',(req,res)=>hostController.requestHost(req,res))



export default hostRoute