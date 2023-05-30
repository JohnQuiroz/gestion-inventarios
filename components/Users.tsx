import { useModalContext } from '@/context/modalContext';
import { useQuery } from '@apollo/client';
import { User } from '@prisma/client';
import { GET_USERS } from 'graphql/client/user';
import React from 'react';
import { ModalUsers } from './modals/ModalUsers';

const Users = () => {
  const { data, loading } = useQuery<{ users: User[] }>(GET_USERS);
  const { setOpenModalUsers } = useModalContext();
  return (
    <div className='page'>
      <div className='title-page'>
        <h1 className='text-5xl'>Gestión de usuarios</h1>
      </div>
      <div className='main-container'>
        <div className='flex flex-row justify-end'>
          <button
            onClick={() => setOpenModalUsers(true)}
            className='primary-button'
          >
            Editar usuario
          </button>
        </div>
        <div className='table-container'>
          {loading ? (
            <p>Cargando...</p>
          ) : (
            <table>
              <thead>
                <tr className='table-header'>
                  <th className='table-border'>Cédula</th>
                  <th className='table-border'>Nombre</th>
                  <th className='table-border'>Fecha de creación</th>
                  <th className='table-border'>Correo</th>
                  <th className='table-border'>Rol</th>
                </tr>
              </thead>
              <tbody>
                {data?.users.map((user: any) => (
                  <tr key={user.id} className='even:bg-gray-200'>
                    <td className='table-border'>{user.id}</td>
                    <td className='table-border'>{user.name}</td>
                    <td className='table-border'>{user.createdAt}</td>
                    <td className='table-border'>{user.email}</td>
                    <td className='table-border'>{user.role.name}</td>
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
