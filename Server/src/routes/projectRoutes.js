import express from 'express'
import { delHistory, fixTone, getHistory, loadCredits }    from '../controllers/projectController.js'
import userAuth from '../middlewares/auth.js'

const projectRouter = express.Router()

projectRouter.post('/fix-tone', userAuth , fixTone)
projectRouter.get('/load-credits', userAuth , loadCredits )
projectRouter.get('/history', userAuth , getHistory )
projectRouter.put('/del-history', userAuth , delHistory )

export default projectRouter