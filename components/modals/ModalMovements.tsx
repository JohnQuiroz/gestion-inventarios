import React, { Dispatch, SetStateAction, useState } from 'react'
import { Modal } from './Modal';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { useModalContext } from '@/context/modalContext';
import FormButtons from '../FormButtons';
import { CREATE_MOVEMENT, GET_MOVEMENTS } from '@/graphql/client/movement';
import { GET_MATERIAL_BALANCE } from '@/graphql/client/material';

const ModalMovements = () => {
    const { openModalMovements, setOpenModalMovements, materialId } = useModalContext();
    return (
      <Modal
        title='Agregar movimiento'
        open={openModalMovements}
        setOpen={setOpenModalMovements}
      >
        <FormModalMovements setOpenModal={setOpenModalMovements} materialId={materialId} />
      </Modal>
    );
}

interface MovementsData {
    materialId: string;
    entry: number;
    out: number;
  }
  
  interface FormModalMovementInterface {
    setOpenModal: Dispatch<SetStateAction<boolean>>;
    materialId: string;
  }

const FormModalMovements = ({ setOpenModal, materialId }: FormModalMovementInterface) => {
    const [executeMutation, { loading: mutationLoading }] = useMutation(CREATE_MOVEMENT);
  
    const [movementData, setMovementData] = useState<MovementsData>({
      materialId: materialId,
      entry: 0,
      out: 0,
    });

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const response = await executeMutation({
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
      <div>
        <form onSubmit={submitForm} className='flex flex-col gap-6'>
          <label className='hidden' htmlFor='materialId'>
            <input type="text" name='materialId' value={movementData.materialId} readOnly/>
          </label>
          <label htmlFor='entry' className='flex flex-row gap-2'>
            <span>Entrada</span>
            <input
              value={movementData.entry}
              onChange={(e) =>
                setMovementData((prev) => ({
                  ...prev,
                  entry: parseInt(e.target.value),
                }))
              }
              type='number'
              name='entry'
            />
          </label>
          <label htmlFor='out' className='flex flex-row gap-2'>
            <span>Salida</span>
            <input
              value={movementData.out}
              onChange={(e) =>
                setMovementData((prev) => ({
                  ...prev,
                  out: parseInt(e.target.value),
                }))
              }
              type='number'
              name='out'
            />
          </label>
          <FormButtons loading={mutationLoading} setOpenModal={setOpenModal} />
        </form>
      </div>
    );
  };

export default ModalMovements