import React, { Dispatch, SetStateAction, useState } from 'react';
import { Modal } from './Modal';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { useModalContext } from '@/context/modalContext';
import { CREATE_MATERIAL, GET_MATERIALS } from '@/graphql/client/material';
import { FormButtons } from './FormButtons';

const ModalMaterials = () => {
  const { openModalMaterials, setOpenModalMaterials } = useModalContext();
  return (
    <Modal
      title='Agregar material'
      open={openModalMaterials}
      setOpen={setOpenModalMaterials}
    >
      <FormModalMaterials setOpenModal={setOpenModalMaterials} />
    </Modal>
  );
};

interface MaterialData {
  name: string;
}

interface FormModalMaterialInterface {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}

const FormModalMaterials = ({ setOpenModal }: FormModalMaterialInterface) => {
  const [executeMutation, { loading: mutationLoading }] =
    useMutation(CREATE_MATERIAL);

  const [materialName, setMaterialName] = useState<MaterialData>({
    name: '',
  });

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await executeMutation({
        variables: {
          name: materialName.name,
        },
        refetchQueries: [GET_MATERIALS],
      });

      toast.success('Material agregado correctamente');
      setOpenModal(false);
    } catch (e) {
      toast.error('Error creando el material.');
    }
  };

  return (
    <div>
      <form onSubmit={submitForm} className='flex flex-col gap-y-5'>
        <label htmlFor='name' className='flex flex-row gap-x-2'>
          <span>Nombre</span>
          <input
            value={materialName.name}
            onChange={(e) =>
              setMaterialName((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            type='text'
            name='name'
            placeholder='Nombre del material'
            unselectable='on'
          />
        </label>
        <FormButtons loading={mutationLoading} setOpenModal={setOpenModal} />
      </form>
    </div>
  );
};

export default ModalMaterials;
