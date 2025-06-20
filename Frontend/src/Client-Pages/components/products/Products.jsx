import { useEffect, useState } from 'react'
import Hero from '../hero/Hero'
import { ProductControllerIns } from '../../../controller/productController/Product.controller'
import ProductCard from './productCard/ProductCard'

const Products = () => {

    const [productList, setProductList] = useState([])
    const getProductsList = async () => {
        const productsList = await ProductControllerIns.getProductsList()
        setProductList(productsList.data)
    }

    useEffect(() => {
        getProductsList()
    }, [])
    return (
        <>
            <div>
                <Hero title="Products" description="here you can see what we have at the best rate." />
            </div>
            <div className='w-full py-20  bg-gradient-to-b from-[#111132] to-[#0c0c1d]'>
                <div className='max-w-[1000px]  mx-auto h-[100vh]'>
                    <div className='text-white font-semibold border-b mb-6 border-white pb-2 text-2xl capitalize'>
                        <h1>Products List</h1>
                    </div>
                    <div className='flex items-center flex-wrap gap-2'>
                        {(productList || []).map((item) => (
                            <ProductCard key={item._id} img={item.img} name={item.name} description={item.des} price={item.price} />

                        ))}

                    </div>
                </div>
            </div>
        </>
    )
}

export default Products