import { GET_MATERIAL_NAMES } from '@/graphql/client/material';
import { useQuery } from '@apollo/client';
import React from 'react';

const Inventory = () => {
  const { data, loading: loadingMaterials } = useQuery(GET_MATERIAL_NAMES);
  return (
    <div className='flex h-full w-full flex-col justify-center gap-y-20 p-20'>
      <div className='flex w-full flex-row justify-center'>
        <h1 className='text-5xl'>Gestión de inventarios</h1>
      </div>
      <div className='flex h-full w-full flex-col justify-center gap-y-5 align-middle'>
        <div className='flex flex-row justify-between'>
          {/* TODO Un select con los nombres de los materiales */}
          {loadingMaterials ? (
            <p>Cargando la lista de materiales...</p>
          ) : (
            <select className='rounded-md border border-solid border-slate-900 bg-slate-600 p-2 text-base text-zinc-50 hover:bg-slate-300 hover:text-zinc-700'>
              {data.materials.map((material: any) => (
                <option key={material.id} value={material.id}>
                  {material.name}
                </option>
              ))}
            </select>
          )}
          <button className='rounded-md border border-solid border-slate-900 bg-slate-600 p-2 text-base text-zinc-50 hover:bg-slate-300 hover:text-zinc-700'>
            Agregar movimiento
          </button>
        </div>
        {/* TODO Una tabla con los movimientos de inventario */}
        {/* <div className='flex items-center justify-center'>
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
                {data.users.map((user: any) => (
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
                    <td className='p-1'>{user.rol}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div> */}
      </div>
    </div>
  );
};

export { Inventory };
