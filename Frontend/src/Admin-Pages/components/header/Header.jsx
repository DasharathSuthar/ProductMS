

const Header = () => {
    return (
        <header className='h-[87px] bg-gray-600 px-3 flex justify-end items-center '>
            <div className="container">
                <div className="row flex justify-end items-center  py-3">
                    <div className="admin-logo h-10 w-10 flex  items-center border-white mr-4">
                        <img src="/AdminLogo.jpg" alt="" className='rounded-full border text-center' />
                    </div>
                    <h1 className='font-bold text-white uppercase'>Admin</h1>
                </div>
            </div>
        </header>
    )
}

export default Header