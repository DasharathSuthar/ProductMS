

const Sidebar = () => {
    return (
        <aside className='bg-black w-64 h-full '>
            <div className="container  ">
                <a href="/dashboard" className='p-3 flex items-center h-[87px] bg-gray-600'>
                    <h1 className='text-white font-semibold uppercase text-4xl '>ProdcutMS</h1>
                </a>
                <ul className='flex flex-col py-4 text-white uppercase '>
                    <li className='nav-list'><a href="/admin/dashboard" className='py-2 block'><i className='mr-4 fas fa-fw fa-tachometer-alt'></i>Dashboard</a></li>
                    <li className='nav-list'><a href="/admin/productList" className='py-2 block'><i className="fa-solid fa-list-ul"></i>Products List</a></li>
                    <li className='nav-list'><a href="/admin/users" className='py-2 block'><i className="fa-solid fa-users"></i>Users</a></li>
                </ul>
            </div>
        </aside>
    )
}

export default Sidebar