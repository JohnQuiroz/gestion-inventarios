import {
  GET_MATERIAL_BALANCE,
  GET_MATERIAL_NAMES,
} from '@/graphql/client/material';
import { GET_MOVEMENTS } from '@/graphql/client/movement';
import { useQuery } from '@apollo/client';
import React, { ChangeEvent, useState } from 'react';
import { Material, Movement } from 'prisma/prisma-client';
import { useModalContext } from '@/context/modalContext';
import ModalMovements from './modals/ModalMovements';

const Movements = () => {
  const [materialFilter, setMaterialFilter] = useState<{ materialId: String }>({ materialId: '' });
  const [enableButton, setEnableButton] = useState<boolean>(false);
  const { data: dataMaterials, loading: loadingMaterials } = useQuery<{ materialNames: Material[] }>(GET_MATERIAL_NAMES);
  const { data: dataMovements, loading: loadingMovements } = useQuery<{ movements: Movement[] }>(GET_MOVEMENTS, {
    variables: { materialId: materialFilter.materialId },
  });
  const { data: balance, loading: loadingBalance } = useQuery<{ materialBalance: Material }>(GET_MATERIAL_BALANCE, {
    variables: { id: materialFilter.materialId },
  });
  const { setOpenModalMovements, setMaterialId } = useModalContext();

  const selectedMaterial = (e: ChangeEvent<HTMLSelectElement>) => {
    setMaterialFilter({ materialId: e.target.value });
    setMaterialId(e.target.value);
    setEnableButton(true);
  };

  return (
    <div className='flex h-full w-full flex-col justify-center gap-y-20 p-20'>
      <div className='flex w-full flex-row justify-center'>
        <h1 className='text-5xl'>Gestión de inventarios</h1>
      </div>
      <div className='flex h-full w-full flex-col justify-center gap-y-5 align-middle'>
        <div className='flex flex-row justify-between'>
          {loadingMaterials ? (
            <p>Cargando la lista de materiales...</p>
          ) : (
            <select
              value={materialFilter.materialId.toString()}
              onChange={(e) => selectedMaterial(e)}
              className='rounded-md border border-solid border-slate-900 bg-slate-300 p-2 text-base text-zinc-700'>
              <option value='' disabled>
                Selecciona un material
              </option>
              {dataMaterials?.materialNames.map((material: any) => (
                <option key={material.id} value={material.id}>
                  {material.name}
                </option>
              ))}
            </select>
          )}
          <button
            onClick={() => setOpenModalMovements(true)}
            hidden={!enableButton}
            className='rounded-md border border-solid border-slate-900 bg-slate-600 p-2 text-base text-zinc-50 hover:bg-slate-300 hover:text-zinc-700'>
            Agregar movimiento
          </button>
        </div>
        <div className='flex items-center justify-center'>
          {loadingMovements ? (
            <p>Cargando los movimientos del material...</p>
          ) : (
            <table className='w-full border border-gray-700'>
              <thead>
                <tr className='bg-gray-500 text-left text-zinc-50'>
                  <th className='border-r border-gray-700 p-1'>Identificador</th>
                  <th className='border-r border-gray-700 p-1'>Fecha de creación</th>
                  <th className='border-r border-gray-700 p-1'>Entrada</th>
                  <th className='border-r border-gray-700 p-1'>Salida</th>
                </tr>
              </thead>
              <tbody>
                {dataMovements?.movements.map((movement: any) => (
                  <tr key={movement.id} className='even:bg-gray-200'>
                    <td className='border-r border-gray-700 p-1'>{movement.id}</td>
                    <td className='border-r border-gray-700 p-1'>{movement.createdAt}</td>
                    <td className='border-r border-gray-700 p-1'>{movement.entry}</td>
                    <td className='border-r border-gray-700 p-1'>{movement.out}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <div className='flex flex-row justify-end gap-x-2'>
        <span className='text-sm'>Total: </span>
        <span className='text-sm'>
          {balance?.materialBalance === null || balance?.materialBalance === undefined ? 0 : balance?.materialBalance.balance.toString()}
        </span>
      </div>
      <ModalMovements />
    </div>
  );
};

export { Movements };
