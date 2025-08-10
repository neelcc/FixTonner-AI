import express from 'express'
import { userCredits, userLogin, userRegister  } from '../controllers/userController.js'
import userAuth from '../middlewares/auth.js'

const userRouter = express.Router()

userRouter.post('/register',userRegister)
userRouter.post('/login', userLogin )
userRouter.get('/credits' , userAuth, userCredits)

export default userRouter