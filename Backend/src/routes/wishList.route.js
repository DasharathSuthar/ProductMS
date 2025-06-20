import { Router } from 'express'
import { verifyJWT } from '../middlewares/auth.middlewear.js'
import { addWishItem, getWishList, removeWishList } from '../controllers/wishList.controller.js'

const router = Router()

router.route("/")
    .get(verifyJWT, getWishList)
    .post(verifyJWT, addWishItem)

router.route("/:id").delete(verifyJWT, removeWishList)

export default router