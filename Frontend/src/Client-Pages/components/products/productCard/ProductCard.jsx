import { Link } from "react-router-dom"

const ProductCard = ({ id, name, img, description, price }) => {
    return (
        <>
            <Link to="/singleProduct"
                state={{ name, img, description, price, id }}
            >
                <div className='box p-2 border-none shadow-gray-700 shadow-sm w-48 bg-gradient-to-b from-[#0c0c1d] to-[#111132] rounded-lg flex flex-col justify-center gap-4'>
                    <div className='w-44 h-44'>
                        <img className='object-cover w-full h-full rounded-md' src={img} alt="img" />
                    </div>
                    <div className='text-white capitalize text-center p-2'>
                        <h2>{name}</h2>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default ProductCard