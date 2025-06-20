import { Router } from 'express'
import { verifyJWT } from '../middlewares/auth.middlewear.js'
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProductDetails, updateProductImage } from '../controllers/product.controller.js'
import { upload } from '../middlewares/multer.middlewear.js'

const router = Router()

router.route("/")
    .post(verifyJWT, upload.single('productImage'), createProduct)
    .get(getAllProducts)

router.route("/:id")
    .get(getProductById)
    .put(verifyJWT, updateProductDetails)
    .delete(verifyJWT, deleteProduct)

router.route("/updateImage/:id").put(verifyJWT,upload.single('productImage'),updateProductImage)

export default router