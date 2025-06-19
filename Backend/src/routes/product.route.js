import { Router } from 'express'
import { verifyJWT } from '../middlewares/auth.middlewear.js'
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProductDetails } from '../controllers/product.controller.js'

const router = Router()

router.route("/createProduct").post(verifyJWT, createProduct)
router.route("/getAllProducts").get(getAllProducts)
router.route("/productById/:id").get(getProductById)
router.route("/updateProduct/:id").put(verifyJWT, updateProductDetails)
router.route("/deleteProduct/:id").delete(verifyJWT, deleteProduct)

export default router