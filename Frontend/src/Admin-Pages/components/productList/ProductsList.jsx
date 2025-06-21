import { useEffect, useRef, useState } from "react"
import { ProductControllerIns } from "../../../controller/productController/Product.controller.js"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.css'

const ProductsList = () => {
    const [productsList, setProductsList] = useState([])
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        des: "",
        productImage: null
    })
    const [editId, setEditId] = useState("")
    const [isEdit, setIsEdit] = useState(false)
    const [isImageEdit, setIsImageEdit] = useState(false)
    const [globalLoading, setGlobalLoading] = useState(false)

    const fileInputRef = useRef(null)

    const getProductsList = async () => {
        const productsList = await ProductControllerIns.getProductsList()
        setProductsList(productsList.data)
    }

    const insertProductData = async () => {
        setGlobalLoading(true)
        try {
            const res = await ProductControllerIns.addProduct(formData)
            toast.success(res.message || "")
            setFormData({ name: "", price: "", des: "", productImage: null })
            fileInputRef.current.value = ""
            await getProductsList()
        } catch (error) {
            const errMessage = error?.response?.data?.message
            toast.error(errMessage || "Failed to add product.")
        } finally {
            setGlobalLoading(false)
        }
    }

    const getProductById = async (id) => {
        setGlobalLoading(true)
        try {
            const res = await ProductControllerIns.getProductById(id)
            setFormData({ name: res.data.name, price: res.data.price, des: res.data.des })
            setEditId(id)
            setIsEdit(true)
            setIsImageEdit(false)
        } catch (err) {
            toast.error("Error fetching product")
        } finally {
            setGlobalLoading(false)
        }
    }

    const updateProductDetails = async () => {
        setGlobalLoading(true)
        try {
            const res = await ProductControllerIns.updateProduct(editId, {
                name: formData.name,
                price: formData.price,
                des: formData.des
            })
            toast.success(res.message)
            setFormData({ name: "", price: "", des: "", productImage: null })
            await getProductsList()
            setIsEdit(false)
        } catch (err) {
            toast.error("Update failed.")
        } finally {
            setGlobalLoading(false)
        }
    }

    const getImage = async (id) => {
        setEditId(id)
        setIsImageEdit(true)
        setIsEdit(false)
    }

    const updateImage = async () => {
        setGlobalLoading(true)
        try {
            const res = await ProductControllerIns.updateProductImage(editId, {
                productImage: formData.productImage
            })
            toast.success(res.message)
            setFormData({ name: "", price: "", des: "", productImage: null })
            await getProductsList()
            setIsImageEdit(false)
        } catch (err) {
            toast.error("Image update failed.")
        } finally {
            setGlobalLoading(false)
        }
    }

    const deleteProduct = async (id) => {
        const confirm = window.confirm("Are you sure you want to delete this product?")
        if (!confirm) return

        setGlobalLoading(true)
        try {
            const res = await ProductControllerIns.deleteProduct(id)
            toast.success(res.message)
            await getProductsList()
        } catch (err) {
            toast.error("Failed to delete product.")
        } finally {
            setGlobalLoading(false)
        }
    }

    useEffect(() => {
        getProductsList()
    }, [])

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} />

            {/* Global Loading Overlay */}
            {globalLoading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="border-4 border-t-transparent border-white rounded-full w-12 h-12 animate-spin"></div>
                </div>
            )}

            <div className='pb-6 text-xl uppercase text-black'>
                <h1>Products List</h1>
                <hr className="border-t border-gray-600 mt-3" />
            </div>

            <div className='p-1 mb-2 flex  justify-between items-center'>
                <div className='flex flex-wrap justify-between gap-1 items-center [&>*]:mb-0'>
                    {!isImageEdit && (
                        <>
                            <div className='flex justify-between items-center w-[400px]'>
                                <label htmlFor="ProductName" className='mr-4 uppercase'>Product Name :</label>
                                <textarea
                                    placeholder='Product Name'
                                    rows={1}
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className='w-[190px] border-black border rounded-md p-1 mr-4'
                                />
                            </div>

                            <div className='flex items-center w-[400px]'>
                                <label htmlFor="Price" className='mr-4 uppercase'>Price:</label>
                                <input
                                    type="number"
                                    min={0}
                                    placeholder='Product Price'
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    className='w-[190px] border-black border rounded-md p-1 mr-4'
                                />
                            </div>

                            <div className='flex justify-between items-center w-[400px]'>
                                <label htmlFor="Discription" className='mr-4 uppercase'>Discription:</label>
                                <textarea
                                    rows={1}
                                    placeholder='Product Discription'
                                    value={formData.des}
                                    onChange={(e) => setFormData({ ...formData, des: e.target.value })}
                                    className='w-[190px] border-black border rounded-md p-1 mr-4'
                                />
                            </div>
                        </>
                    )}

                    {!isEdit && (
                        <div className='flex items-center w-[400px]'>
                            <label htmlFor="Image" className='mr-4 uppercase'>Image:</label>
                            <input
                                ref={fileInputRef}
                                type="file"
                                onChange={(e) => setFormData({ ...formData, productImage: e.target.files[0] })}
                                className='w-full border-black border rounded-md p-1 mr-4'
                            />
                        </div>
                    )}
                </div>

                <div className='flex flex-wrap gap-1 items-center'>
                    {!isEdit && !isImageEdit && (
                        <button
                            className='py-2 px-5 w-40 bg-gray-500 rounded-md text-white uppercase hover:bg-gray-700 duration-300  cursor-pointer'
                            onClick={insertProductData}
                            disabled={globalLoading}
                        >
                            {globalLoading ? "Adding..." : "Add Product"}
                        </button>
                    )}

                    {isEdit && (
                        <button
                            className='py-2 px-5 ml-2 bg-green-500 rounded-md text-white uppercase hover:bg-green-700 duration-300'
                            onClick={updateProductDetails}
                            disabled={globalLoading}
                        >
                            {globalLoading ? "Updating..." : "Update"}
                        </button>
                    )}

                    {isImageEdit && (
                        <button
                            className='py-2 px-5 ml-2 bg-green-500 rounded-md text-white uppercase hover:bg-green-700 duration-300'
                            onClick={updateImage}
                            disabled={globalLoading}
                        >
                            {globalLoading ? "Updating..." : "Update Image"}
                        </button>
                    )}
                </div>
            </div>

            <div className='p-1 mb-2 flex  items-center w-full'>
                <div className="w-full">
                    <table className='text-left w-full capitalize overflow-x-auto'>
                        <thead>
                            <tr className='[&>*]:p-2'>
                                <th className='border border-black'>ID</th>
                                <th className='border border-black'>Product Images</th>
                                <th className='border border-black'>Product Name</th>
                                <th className='border border-black'>Price</th>
                                <th className='border border-black'>Discription</th>
                                <th className='border border-black'>Status</th>
                                <th className='border border-black'>Edit</th>
                                <th className='border border-black'>Edit Image Only</th>
                                <th className='border border-black'>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(productsList || []).map((item, index) => (
                                <tr key={item._id}>
                                    <td className='border border-black p-2'>{index + 1}</td>
                                    <td className='border border-black p-2'>
                                        <img className="w-20 h-20" src={item.img} alt="" />
                                    </td>
                                    <td className='border border-black p-2'>{item.name}</td>
                                    <td className='border border-black p-2'>{item.price}</td>
                                    <td className='border border-black p-2'>{item.des}</td>
                                    <td className='border border-black p-2'>{item.status}</td>
                                    <td className='border border-black p-2'>
                                        <button
                                            className='px-5 py-2 rounded-lg bg-gray-700 text-white text-center'
                                            onClick={() => getProductById(item._id)}
                                        >
                                            Edit
                                        </button>
                                    </td>
                                    <td className='border w-36 border-black p-2'>
                                        <button
                                            className='px-5 py-2 rounded-lg bg-gray-700 text-white text-center'
                                            onClick={() => getImage(item._id)}
                                        >
                                            Edit Image
                                        </button>
                                    </td>
                                    <td className='border border-black p-2'>
                                        <button
                                            className='px-5 py-2 rounded-lg bg-red-700 text-white text-center'
                                            onClick={() => deleteProduct(item._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default ProductsList
