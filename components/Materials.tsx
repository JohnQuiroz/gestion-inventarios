import { GET_MATERIALS } from '@/graphql/client/material';
import { useQuery } from '@apollo/client';
import React from 'react';
import { Material } from 'prisma/prisma-client';
import { useModalContext } from '@/context/modalContext';
import { PrivateComponent } from './PrivateComponent';
import { ModalMaterials } from './modals/ModalMaterials';

const Materials = () => {
  const { setOpenModalMaterials } = useModalContext();
  const { data: dataMaterials, loading: loadingMaterials } = useQuery<{
    materials: Material[];
  }>(GET_MATERIALS);
  return (
    <div className='page'>
      <div className='title-page'>
        <h1 className='text-5xl'>Gestión de materiales</h1>
      </div>
      <div className='main-container'>
        <div className='flex flex-row justify-end'>
          <PrivateComponent role='ADMIN'>
            <button
              onClick={() => setOpenModalMaterials(true)}
              className='primary-button'
            >
              Agregar material
            </button>
          </PrivateComponent>
        </div>
        <div className='table-container'>
          {loadingMaterials ? (
            <p>Cargando los materiales...</p>
          ) : (
            <table>
              <thead>
                <tr className='table-header'>
                  <th className='table-border'>Identificador</th>
                  <th className='table-border'>Fecha de creación</th>
                  <th className='table-border'>Nombre</th>
                  <th className='table-border'>Saldo</th>
                </tr>
              </thead>
              <tbody>
                {dataMaterials?.materials.map((material: any) => (
                  <tr key={material.id} className='even:bg-gray-200'>
                    <td className='table-border'>{material.id}</td>
                    <td className='table-border'>{material.createdAt}</td>
                    <td className='table-border'>{material.name}</td>
                    <td className='table-border'>{material.balance}</td>
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
