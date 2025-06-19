import React from 'react'

const Sidebar = () => {
    return (
        <aside className='bg-black w-64 h-dvh '>
            <div className="container  ">
                <a href="/dashboard" className='p-3 flex items-center h-[87px] bg-gray-600'>
                    <h1 className='text-white font-semibold uppercase text-4xl '>ProdcutMS</h1>
                </a>
                <ul className='flex flex-col py-4 text-white uppercase '>
                    <li className='nav-list'><a href="/admin/dashboard" className='py-2 block'><i className='mr-4 fas fa-fw fa-tachometer-alt'></i>Dashboard</a></li>
                </ul>
            </div>
        </aside>
    )
}

export default Sidebar