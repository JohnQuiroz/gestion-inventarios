import {
  GET_MATERIAL_BALANCE,
  GET_MATERIAL_NAMES,
} from '@/graphql/client/material';
import { GET_MOVEMENTS } from '@/graphql/client/movement';
import { useQuery } from '@apollo/client';
import React, { ChangeEvent, useState } from 'react';
import { Material, Movement } from 'prisma/prisma-client';
import { useModalContext } from '@/context/modalContext';
import { ModalMovements } from './modals/ModalMovements';

const Movements = () => {
  const [materialFilter, setMaterialFilter] = useState<{ materialId: String }>({
    materialId: '',
  });
  const [enableButton, setEnableButton] = useState<boolean>(false);
  const { data: dataMaterials, loading: loadingMaterials } = useQuery<{
    materialNames: Material[];
  }>(GET_MATERIAL_NAMES);
  const { data: dataMovements, loading: loadingMovements } = useQuery<{
    movements: Movement[];
  }>(GET_MOVEMENTS, {
    variables: { materialId: materialFilter.materialId },
  });
  const { data: balance } = useQuery<{
    materialBalance: Material;
  }>(GET_MATERIAL_BALANCE, {
    variables: { id: materialFilter.materialId },
  });
  const { setOpenModalMovements, setMaterialId } = useModalContext();

  const selectedMaterial = (e: ChangeEvent<HTMLSelectElement>) => {
    setMaterialFilter({ materialId: e.target.value });
    setMaterialId(e.target.value);
    setEnableButton(true);
  };

  return (
    <div className='page'>
      <div className='title-page'>
        <h1 className='text-5xl'>Gestión de inventarios</h1>
      </div>
      <div className='main-container'>
        <div className='buttons-container'>
          {loadingMaterials ? (
            <p>Cargando la lista de materiales...</p>
          ) : (
            <select
              value={materialFilter.materialId.toString()}
              onChange={(e) => selectedMaterial(e)}
              className='select-material'
            >
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
            className='primary-button'
          >
            Agregar movimiento
          </button>
        </div>
        <div className='table-container'>
          {loadingMovements ? (
            <p>Cargando los movimientos del material...</p>
          ) : (
            <table>
              <thead>
                <tr className='table-header'>
                  <th className='table-border'>Identificador</th>
                  <th className='table-border'>Fecha de creación</th>
                  <th className='table-border'>Entrada</th>
                  <th className='table-border'>Salida</th>
                </tr>
              </thead>
              <tbody>
                {dataMovements?.movements.map((movement: any) => (
                  <tr key={movement.id} className='even:bg-gray-200'>
                    <td className='table-border'>{movement.id}</td>
                    <td className='table-border'>{movement.createdAt}</td>
                    <td className='table-border'>{movement.entry}</td>
                    <td className='table-border'>{movement.out}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className='total-container'>
          <span className='text-sm'>Total: </span>
          <span className='text-sm'>
            {balance?.materialBalance === null ||
            balance?.materialBalance === undefined
              ? 0
              : balance?.materialBalance.balance.toString()}
          </span>
        </div>
      </div>
      <ModalMovements />
    </div>
  );
};

export { Movements };
