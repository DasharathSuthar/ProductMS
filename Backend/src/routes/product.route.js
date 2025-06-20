import { Router } from 'express'
import { verifyJWT } from '../middlewares/auth.middlewear.js'
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProductDetails } from '../controllers/product.controller.js'
import { upload } from '../middlewares/multer.middlewear.js'

const router = Router()

router.route("/")
    .post(verifyJWT, upload.single('productImage'), createProduct)
    .get(getAllProducts)

router.route("/:id")
    .get(getProductById)
    .put(verifyJWT, updateProductDetails)
    .delete(verifyJWT, deleteProduct)


export default router