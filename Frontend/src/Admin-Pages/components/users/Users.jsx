import React, { useEffect, useState } from 'react'
import { UserControllerIns } from '../../../controller/userController/user.controller'

const Users = () => {
  const [usersList, setUsersList] = useState([])

  const getUsersList = async () => {
    const users = await UserControllerIns.getAllUsers() 
    setUsersList(users.data)
  }

  useEffect(() => {
    getUsersList()
  }, [])

  return (
    <>
      <div className='pb-6 text-xl uppercase text-black ' >
        <h1>Products List</h1>
        <hr className="border-t border-gray-600 mt-3" />
      </div>
      <div className='p-1 mb-2 flex justify-between items-center w-full'>
        <div className="grid grid-cols-1 w-full">
          <table className='text-left  overflow-x-auto'>
            <thead>
              <tr className='[&>*]:p-2'>
                <th className='border border-black'>ID</th>
                <th className='border border-black'>Username</th>
                <th className='border border-black'>Full Name</th>
                <th className='border border-black'>Email</th>
                <th className='border border-black'>Role</th>

              </tr>
            </thead>
            <tbody>
              {(usersList || []).map((item, index) => {
                return (<tr key={item._id} >
                  <td className='border border-black p-2'>{item._id}</td>

                  <td className='border border-black p-2'>
                    {item.username}
                  </td>
                  <td className='border border-black p-2'>
                    {item.fullName}
                  </td>
                  <td className='border border-black p-2'>{item.email}</td>
                  <td className='border border-black p-2'>{item.role}</td>

                </tr>)
              })}
            </tbody>
          </table>
        </div>

      </div>
    </>
  )
}

export default Users