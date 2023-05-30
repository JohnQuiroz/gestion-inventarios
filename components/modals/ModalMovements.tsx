import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { Modal } from './Modal';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { useModalContext } from '@/context/modalContext';
import { FormButtons } from './FormButtons';
import { CREATE_MOVEMENT, GET_MOVEMENTS } from '@/graphql/client/movement';
import { GET_MATERIAL_BALANCE } from '@/graphql/client/material';

const ModalMovements = () => {
  const { openModalMovements, setOpenModalMovements, materialId } =
    useModalContext();
  return (
    <Modal
      title='Agregar movimiento'
      open={openModalMovements}
      setOpen={setOpenModalMovements}
    >
      <FormModalMovements
        setOpenModal={setOpenModalMovements}
        materialId={materialId}
      />
    </Modal>
  );
};

interface MovementsData {
  materialId: string;
  entry: number;
  out: number;
}

interface FormModalMovementInterface {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  materialId: string;
}

const FormModalMovements = ({
  setOpenModal,
  materialId,
}: FormModalMovementInterface) => {
  const [executeMutation, { loading: mutationLoading }] =
    useMutation(CREATE_MOVEMENT);

  const [movementData, setMovementData] = useState<MovementsData>({
    materialId: materialId,
    entry: 0,
    out: 0,
  });

  const entryValidation = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      e.target.value = '0';
    }
    setMovementData((prev) => ({
      ...prev,
      entry: parseInt(e.target.value),
    }));
  };

  const outValidation = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      e.target.value = '0';
    }
    setMovementData((prev) => ({
      ...prev,
      out: parseInt(e.target.value),
    }));
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (movementData.entry === 0 && movementData.out === 0) {
        toast.error('Debe ingresar una cantidad');
        return;
      }
      await executeMutation({
        variables: {
          materialId: movementData.materialId,
          entry: movementData.entry,
          out: movementData.out,
        },
        refetchQueries: [GET_MOVEMENTS, GET_MATERIAL_BALANCE],
      });

      toast.success('Movimiento agregado correctamente');
      setOpenModal(false);
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <div className='p-8'>
      <form onSubmit={submitForm}>
        <label className='hidden' htmlFor='materialId'>
          <input
            type='text'
            name='materialId'
            value={movementData.materialId}
            readOnly
          />
        </label>
        <label htmlFor='entry'>
          <span>Entrada</span>
          <input
            value={movementData.entry}
            onChange={(e) => entryValidation(e)}
            type='number'
            name='entry'
          />
        </label>
        <label htmlFor='out'>
          <span>Salida</span>
          <input
            value={movementData.out}
            onChange={(e) => outValidation(e)}
            type='number'
            name='out'
          />
        </label>
        <FormButtons loading={mutationLoading} setOpenModal={setOpenModal} />
      </form>
    </div>
  );
};

export { ModalMovements };
