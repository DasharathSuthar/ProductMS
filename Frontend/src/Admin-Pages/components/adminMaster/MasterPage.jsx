import { Outlet } from 'react-router-dom'
import Sidebar from '../sidebar/Sidebar'
import Header from '../header/Header'

const MasterPage = () => {
    return (
        <div className="flex ">
            <div className='h-screen'> <Sidebar></Sidebar></div>
            <div className="flex-1 bg-gray-200">
                <Header></Header>
                <div className="p-10 ">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    )
}

export default MasterPage