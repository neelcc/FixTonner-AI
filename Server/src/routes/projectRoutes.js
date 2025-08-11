import express from 'express'
import fixTone from '../controllers/projectController.js'
import userAuth from '../middlewares/auth.js'

const projectRouter = express.Router()

projectRouter.post('/fix-tone', userAuth , fixTone)

export default projectRouter