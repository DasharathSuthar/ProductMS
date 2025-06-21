import { Link } from "react-router-dom";

const ProductCard = ({ id, name, img, description, price, removebtn, handleRemove }) => {
    return (
        <>
            <div className='w-full sm:w-[200px] md:w-[230px] p-3 bg-gradient-to-b from-[#0c0c1d] to-[#111132] rounded-xl shadow-md shadow-gray-800 flex flex-col items-center gap-4'>
                <Link
                    to="/singleProduct"
                    state={{ name, img, description, price, id }}
                    className="w-full flex flex-col items-center"
                >
                    <div className='w-full h-40 sm:h-44 md:h-48'>
                        <img
                            src={img}
                            alt="product"
                            className='w-full h-full object-cover rounded-md'
                        />
                    </div>
                    <div className='text-white text-center mt-2'>
                        <h2 className="text-base font-medium capitalize">{name}</h2>
                    </div>
                </Link>

                {removebtn && (
                    <button
                        onClick={() => handleRemove(id)}
                        className="w-full py-2 text-sm border hover:bg-gray-900 text-white font-semibold rounded-md transition"
                    >
                        {removebtn}
                    </button>
                )}
            </div>
        </>
    );
};

export default ProductCard;
