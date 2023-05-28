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
      </div>
    </div>
  );
};

export { Inventory };
