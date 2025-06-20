import { Router } from 'express'
import { changePassword, getAllUsers, getCurrentUser, loginUser, logoutUser, registerUser } from '../controllers/user.controller.js'
import { verifyJWT } from '../middlewares/auth.middlewear.js'

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

//secure Routes
router.route("/").get(getAllUsers)
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/currentUser").get(verifyJWT, getCurrentUser)
router.route("/changePassword").post(verifyJWT, changePassword)

export default router