import { Link } from "react-router-dom"

const ProductCard = ({ id, name, img, description, price }) => {
    return (
        <>
            <Link to="/singleProduct"
                state={{ name, img, description, price, id }}
            >
                <div className='box p-2 border-none shadow-md w-48 bg-gray-800  rounded-lg flex flex-col justify-center gap-4'>
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