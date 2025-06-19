import { Router } from 'express'
import { verifyJWT } from '../middlewares/auth.middlewear.js'
import { addWishItem, getWishList, removeWishList } from '../controllers/wishList.controller.js'

const router = Router()

router.route("/list").get(verifyJWT, getWishList)
router.route("/addList").post(verifyJWT, addWishItem)
router.route("/removeList/:id").delete(verifyJWT, removeWishList)

export default router