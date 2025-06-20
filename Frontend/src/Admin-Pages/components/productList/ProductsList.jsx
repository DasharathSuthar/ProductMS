import { useEffect, useRef, useState } from "react"
import { ProductControllerIns } from "../../../controller/productController/Product.controller.js"


const ProductsList = () => {

    const [productsList, setProductsList] = useState([])
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        des: "",
        productImage: null
    })
    const [editId, setEditId] = useState("")

    const fileInputRef = useRef(null)

    const getProductsList = async () => {
        const productsList = await ProductControllerIns.getProductsList()
        setProductsList(productsList.data)
    }

    const insertProductData = async () => {
        await ProductControllerIns.addProduct(formData).then(res => {
            alert(res.message)
            setFormData({
                name: "",
                price: "",
                des: "",
                productImage: null
            })
            fileInputRef.current.value = ""
            getProductsList()
        }).catch(error => console.log(error));
    }

    const getProductById = async (id) => {
        await ProductControllerIns.getProductById(id).then(res => {
            setEditId(id)
            setFormData({
                name: res.data.name,
                price: res.data.price,
                des: res.data.des,
            })
            document.querySelector('#imageContainer').classList.add("hidden")
            document.querySelector('#AddBtn').classList.add('hidden')
            document.querySelector('#UpdateBtn').classList.remove('hidden')
        }).catch(error => console.log(error))
    }



    const updateProductDetails = async () => {
        await ProductControllerIns.updateProduct(editId, {
            name: formData.name,
            price: formData.price,
            des: formData.des
        }).then(res => {
            alert(res.message)
            setFormData({
                name: "",
                price: "",
                des: "",
                productImage: null
            })
            fileInputRef.current.value = ""
            document.querySelector('#imageContainer').classList.remove("hidden")
            document.querySelector('#AddBtn').classList.remove('hidden')
            document.querySelector('#UpdateBtn').classList.add('hidden')
            getProductsList()
        })
    }

    const getImage = async (id) => {
        setEditId(id)
        document.querySelector('#input1').classList.add('hidden')
        document.querySelector('#input2').classList.add('hidden')
        document.querySelector('#input3').classList.add('hidden')
        document.querySelector('#AddBtn').classList.add('hidden')
        document.querySelector('#UpdateImg').classList.remove('hidden')
    }

    const updateImage = async () => {
        await ProductControllerIns.updateProductImage(editId, { productImage: formData.productImage }).then(res => {
            alert(res.message)
            setFormData({
                name: "",
                price: "",
                des: "",
                productImage: null
            })
            fileInputRef.current.value = ""
            document.querySelector('#input1').classList.remove('hidden')
            document.querySelector('#input2').classList.remove('hidden')
            document.querySelector('#input3').classList.remove('hidden')
            document.querySelector('#AddBtn').classList.remove('hidden')
            document.querySelector('#UpdateImg').classList.add('hidden')
            getProductsList()
        })
    }

    const deleteProduct = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this Product?');
        if (!confirmed) return;

        await ProductControllerIns.deleteProduct(id).then(res => {
            alert(res.message)
            getProductsList()
        }).catch(err => {
            console.log(err);
            alert("Failed to delete product.");
        });
    }
    useEffect(() => {
        getProductsList()
    }, [])

    return (
        <>
            <div className='pb-6 text-xl uppercase text-black ' >
                <h1>Products List</h1>
                <hr className="border-t border-gray-600 mt-3" />
            </div>
            <div className='p-1 mb-2 flex justify-between items-center'>
                <div className='flex flex-wrap justify-between  gap-1  items-center [&>*]:mb-0  '>
                    <div id="input1" className=' flex justify-between items-center w-[400px]'>
                        <label htmlFor="ProductName" className='mr-4 uppercase'>Product Name : </label>
                        <textarea placeholder='Product Name' rows={1} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className='w-[190px] border-black border rounded-md p-1 mr-4' />
                    </div>

                    <div id="input2" className='flex   items-center w-[400px]'>
                        <label htmlFor="Price" className='mr-4 uppercase'>Price:</label>
                        <input type="number" min={0} placeholder='Product Price' value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className='w-[190px] border-black border rounded-md p-1 mr-4' />
                    </div>

                    <div id="input3" className='flex  justify-between items-center w-[400px]'>
                        <label htmlFor="Discription" className='mr-4 uppercase'>Discription:</label>
                        <textarea rows={1} placeholder='Product Discription' value={formData.des} onChange={(e) => setFormData({ ...formData, des: e.target.value })} className='w-[190px] border-black border rounded-md p-1 mr-4' />
                    </div>
                    <div id="imageContainer" className='flex  items-center w-[400px]'>
                        <label htmlFor="Image" className='mr-4 uppercase'>Image:</label>
                        <input ref={fileInputRef} type="file" onChange={(e) => setFormData({ ...formData, productImage: e.target.files[0] })} className='w-full border-black border rounded-md p-1 mr-4' />
                    </div>
                </div>

                <div className='flex flex-wrap  gap-1 items-center'>
                    <button
                        id='AddBtn'
                        className='py-2 px-5 w-40 bg-blue-500 rounded-md text-white uppercase hover:bg-blue-700 duration-300'
                        onClick={insertProductData}
                    >
                        Add Product
                    </button>
                    <button id='UpdateBtn' className='py-2 px-5 ml-2 hidden bg-green-500 rounded-md text-white uppercase hover:bg-green-700 duration-300' onClick={updateProductDetails} >Update</button>
                    <button id='UpdateImg' className='py-2 px-5 ml-2 hidden bg-green-500 rounded-md text-white uppercase hover:bg-green-700 duration-300' onClick={updateImage} >Update Image</button>
                </div>
            </div>
            <div className='p-1 mb-2 flex justify-between items-center w-full'>
                <div className="grid grid-cols-1 w-full">
                    <table className='text-left capitalize  overflow-x-auto'>
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
                            {(productsList || []).map((item, index) => {
                                return (<tr key={item._id} >
                                    <td className='border border-black p-2'>{index + 1}</td>
                                    <td className='border border-black p-2'>
                                        <img className="w-20 h-20" src={item.img} alt="" />
                                    </td>
                                    <td className='border border-black p-2'>
                                        {item.name}
                                    </td>
                                    <td className='border border-black p-2'>{item.price}</td>
                                    <td className='border border-black p-2'>
                                        {item.des}
                                    </td>
                                    <td className='border border-black p-2'>{item.status}</td>
                                    <td className='border border-black p-2'>
                                        <button className='px-5 py-2 rounded-lg bg-blue-700 text-white text-center
                                        ' onClick={() => getProductById(item._id)} >Edit</button>
                                    </td>
                                    <td className='border w-36 border-black p-2'>
                                        <button className='px-5 py-2  rounded-lg bg-blue-700 text-white text-center
                                        ' onClick={() => getImage(item._id)}>Edit Image</button>
                                    </td>
                                    <td className='border border-black p-2'>
                                        <button className='px-5 py-2 rounded-lg bg-red-700 text-white text-center' onClick={() => deleteProduct(item._id)}>Delete</button>
                                    </td>
                                </tr>)
                            })}
                        </tbody>
                    </table>
                </div>

            </div>
        </>
    )
}

export default ProductsList