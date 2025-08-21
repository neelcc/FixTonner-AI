import express from 'express'
import { fixTone, loadCredits }    from '../controllers/projectController.js'
import userAuth from '../middlewares/auth.js'

const projectRouter = express.Router()

projectRouter.post('/fix-tone', userAuth , fixTone)
projectRouter.get('/load-credits', userAuth , loadCredits )

export default projectRouter