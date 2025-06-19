import {Router} from 'express'
import { verifyJWT } from '../middlewares/auth.middlewear.js'
import { createProduct, getAllProducts } from '../controllers/product.controller.js'

const router = Router()

router.route("/createProduct").post(verifyJWT,createProduct)
router.route("/getAllProducts").get(getAllProducts)

export default router