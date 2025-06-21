import { useEffect, useState } from 'react'
import Hero from '../hero/Hero'
import { ProductControllerIns } from '../../../controller/productController/Product.controller'
import ProductCard from './productCard/ProductCard'

const Products = () => {
    const [productList, setProductList] = useState([])

    const getProductsList = async () => {
        try {
            const productsList = await ProductControllerIns.getProductsList()
            setProductList(productsList.data)
        } catch (error) {
            console.error("Failed to fetch products", error)
        }
    }

    useEffect(() => {
        getProductsList()
    }, [])

    return (
        <>
            {/* Hero Section */}
            <Hero title="Products" description="here you can see what we have at the best rate." />

            {/* Products List */}
            <div className='w-full py-20 bg-gradient-to-b from-[#111132] to-[#0c0c1d]'>
                <div className='max-w-[1000px] mx-auto px-4'>
                    <div className='text-white font-semibold border-b border-white mb-6 pb-2 text-2xl capitalize'>
                        <h1>Products List</h1>
                    </div>

                    {/* Product Grid */}
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6'>
                        {productList.length > 0 ? (
                            productList.map((item) => (
                                <ProductCard
                                    key={item._id}
                                    id={item._id}
                                    img={item.img}
                                    name={item.name}
                                    description={item.des}
                                    price={item.price}
                                />
                            ))
                        ) : (
                            <p className="text-white col-span-full">No products found.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Products
