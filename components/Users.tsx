import { useModalContext } from '@/context/modalContext';
import { useQuery } from '@apollo/client';
import { User } from '@prisma/client';
import { GET_USERS } from 'graphql/client/user';
import React from 'react';
import ModalUsers from './modals/ModalUsers';

const Users = () => {
  const { data, loading } = useQuery<{ users: User[] }>(GET_USERS);
  const { setOpenModalUsers } = useModalContext();
  return (
    <div className='flex h-full w-full flex-col justify-center gap-y-20 p-20'>
      <div className='flex w-full flex-row justify-center'>
        <h1 className='text-5xl'>Gestión de usuarios</h1>
      </div>
      <div className='flex h-full w-full flex-col justify-center gap-y-5 align-middle'>
        <div className='flex flex-row justify-end'>
          <button
            onClick={() => setOpenModalUsers(true)}
            className='rounded-md border border-solid border-slate-900 bg-slate-600 p-2 text-base text-zinc-50 hover:bg-slate-300 hover:text-zinc-700'
          >
            Editar usuario
          </button>
        </div>
        <div className='flex items-center justify-center'>
          {loading ? (
            <p>Cargando...</p>
          ) : (
            <table className='w-full border border-gray-700'>
              <thead>
                <tr className='bg-gray-500 text-left text-zinc-50'>
                  <th className='border-r border-gray-700 p-1'>Cédula</th>
                  <th className='border-r border-gray-700 p-1'>Nombre</th>
                  <th className='border-r border-gray-700 p-1'>
                    Fecha de creación
                  </th>
                  <th className='border-r border-gray-700 p-1'>Correo</th>
                  <th className='p-1'>Rol</th>
                </tr>
              </thead>
              <tbody>
                {data?.users.map((user: any) => (
                  <tr key={user.id} className='even:bg-gray-200'>
                    <td className='border-r border-gray-700 p-1'>{user.id}</td>
                    <td className='border-r border-gray-700 p-1'>
                      {user.name}
                    </td>
                    <td className='border-r border-gray-700 p-1'>
                      {user.createdAt}
                    </td>
                    <td className='border-r border-gray-700 p-1'>
                      {user.email}
                    </td>
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
  );
};

export { Users };
