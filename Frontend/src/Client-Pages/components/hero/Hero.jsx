import React from 'react'

const Hero = ({ title, description }) => {
    return (
        <>
            <div className='hero relative overflow-hidden h-screen bg-gradient-to-b from-[#0c0c1d] to-[#111132] '>
                <div className="wrapper max-w-[1000px] h-full m-auto">
                    <div className="h-full flex w-1/2 flex-col justify-center gap-10"  >
                        <h2 className="text-3xl text-purple-800 uppercase tracking-[10px] " >{title}</h2>
                        <h1 className="text-5xl font-bold text-white capitalize"  >{description}</h1>
                        { (title == "Suthar Dasharath") && <div className="z-10">
                            <button className="p-5 border text-white mr-4 border-white rounded-lg cursor-pointer font-semibold w-48" >See the Products</button>
                            <button className="p-5 border border-white bg-white text-black font-semibold rounded-lg cursor-pointer w-48" >Contact Me</button>
                        </div>}
                    </div>
                </div>
                <div className="absolute text-[50vh] w-1/2 text-black opacity-10 whitespace-nowrap -bottom-28"  >
                    ProductMS
                </div>
            </div>
        </>
    )
}

export default Hero