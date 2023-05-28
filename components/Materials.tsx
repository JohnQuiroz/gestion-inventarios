import { GET_MATERIALS } from '@/graphql/client/material';
import { useQuery } from '@apollo/client';
import React from 'react';
import { Material } from 'prisma/prisma-client';
import { useModalContext } from '@/context/modalContext';
import PrivateComponent from './PrivateComponent';
import ModalMaterials from './modals/ModalMaterials';

const Materials = () => {
  const { setOpenModalMaterials } = useModalContext();
  const { data: dataMaterials, loading: loadingMaterials } = useQuery<{
    materials: Material[];
  }>(GET_MATERIALS);
  return (
    <div className='flex h-full w-full flex-col justify-center gap-y-20 p-20'>
      <div className='flex w-full flex-row justify-center'>
        <h1 className='text-5xl'>Gestión de materiales</h1>
      </div>
      <div className='flex h-full w-full flex-col justify-center gap-y-5 align-middle'>
        <div className='flex flex-row justify-end'>
          <PrivateComponent role='ADMIN'>
            <button
              onClick={() => setOpenModalMaterials(true)}
              className='rounded-md border border-solid border-slate-900 bg-slate-600 p-2 text-base text-zinc-50 hover:bg-slate-300 hover:text-zinc-700'
            >
              Agregar material
            </button>
          </PrivateComponent>
        </div>
        <div className='flex items-center justify-center'>
          {loadingMaterials ? (
            <p>Cargando los materiales...</p>
          ) : (
            <table className='w-full border border-gray-700'>
              <thead>
                <tr className='bg-gray-500 text-left text-zinc-50'>
                  <th className='border-r border-gray-700 p-1'>
                    Identificador
                  </th>
                  <th className='border-r border-gray-700 p-1'>
                    Fecha de creación
                  </th>
                  <th className='border-r border-gray-700 p-1'>Nombre</th>
                  <th className='border-r border-gray-700 p-1'>Saldo</th>
                </tr>
              </thead>
              <tbody>
                {dataMaterials?.materials.map((material: any) => (
                  <tr key={material.id} className='even:bg-gray-200'>
                    <td className='border-r border-gray-700 p-1'>
                      {material.id}
                    </td>
                    <td className='border-r border-gray-700 p-1'>
                      {material.createdAt}
                    </td>
                    <td className='border-r border-gray-700 p-1'>
                      {material.name}
                    </td>
                    <td className='border-r border-gray-700 p-1'>
                      {material.balance}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <ModalMaterials />
    </div>
  );
};

export { Materials };
