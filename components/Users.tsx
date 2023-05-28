import { useModalContext } from '@/context/modalContext';
import { useQuery } from '@apollo/client';
import { User } from '@prisma/client';
import { GET_USERS } from 'graphql/client/user';
import React from 'react'
import ModalUsers from './modals/ModalUsers';

const Users = () => {
    const { data, loading } = useQuery<{ users: User[] }>(GET_USERS);
    const { openModalUsers, setOpenModalUsers } = useModalContext();
    return (
        <div className='flex flex-col justify-center w-full h-full gap-y-20 p-20'>
            <div className="flex flex-row justify-center w-full">
                <h1 className='text-5xl'>Gestión de usuarios</h1>
            </div>
            <div className="flex flex-col justify-center align-middle w-full h-full gap-y-5">
                <div className="flex flex-row justify-end">
                    <button
                    onClick={() => setOpenModalUsers(true)}
                    className="border border-solid border-slate-900 bg-slate-600 rounded-md p-2 text-base hover:bg-slate-300 text-zinc-50 hover:text-zinc-700">Editar usuario</button>
                </div>
                <div className="flex justify-center items-center">
                    {loading ? (
                        <p>Cargando...</p>
                    ) : (
                        <table className="w-full border border-gray-700">
                            <thead>
                                <tr className='bg-gray-500 text-zinc-50 text-left'>
                                    <th className='border-r border-gray-700 p-1'>Cédula</th>
                                    <th className='border-r border-gray-700 p-1'>Nombre</th>
                                    <th className='border-r border-gray-700 p-1'>Fecha de creación</th>
                                    <th className='border-r border-gray-700 p-1'>Correo</th>
                                    <th className='p-1'>Rol</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.users.map((user: any) => (
                                    <tr key={user.id} className='even:bg-gray-200'>
                                        <td className='border-r border-gray-700 p-1'>{user.id}</td>
                                        <td className='border-r border-gray-700 p-1'>{user.name}</td>
                                        <td className='border-r border-gray-700 p-1'>{user.createdAt}</td>
                                        <td className='border-r border-gray-700 p-1'>{user.email}</td>
                                        <td className='p-1'>{user.role.name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
            <ModalUsers />
        </div>
    )
}

export default Users;