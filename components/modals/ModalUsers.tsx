import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react'
import { Modal } from './Modal';
import { useMutation, useQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import { useModalContext } from '@/context/modalContext';
import { CREATE_MATERIAL, GET_MATERIALS } from '@/graphql/client/material';
import FormButtons from '../FormButtons';
import { GET_ROLES } from '@/graphql/client/roles';
import { GET_USERS, UPDATE_USER } from '@/graphql/client/user';
import { Role, User } from '@prisma/client';

interface ModalUsersProps {
    roleId: string;
}

const ModalUsers = () => {
    const { openModalUsers, setOpenModalUsers, materialId } = useModalContext();
    console.log('materialId', materialId);
    return (
      <Modal
        title='Editar usuario'
        open={openModalUsers}
        setOpen={setOpenModalUsers}
      >
        <FormModalUsers setOpenModal={setOpenModalUsers}/>
      </Modal>
    );
}

interface UserData {
    roleId: string;
  }
  
  interface FormModalUserInterface {
    setOpenModal: Dispatch<SetStateAction<boolean>>;
  }

const FormModalUsers = ({ setOpenModal }: FormModalUserInterface) => {
    const [executeMutation, { loading: mutationLoading }] = useMutation(UPDATE_USER);
    const { data: rolesData, loading: loadingRoles } = useQuery<{ roles: Role[] }>(GET_ROLES);
    const { data: usersData, loading: loadingUsers } = useQuery<{ users: User[] }>(GET_USERS);
    const [userId, setUserId] = useState<string>('');
    const [roleId, setRoleId] = useState<string>('');
  
    /* const [selectedRole, setSelectedRole] = useState<UserData>({
      roleId: '',
    }); */

    const submitForm = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log('userId', userId);
      console.log('roleId', roleId);
      try {
        await executeMutation({
          variables: {
            id: userId,
            role: roleId,
          },
          refetchQueries: [GET_USERS],
        });
  
        toast.success('Rol actualizado correctamente');
        setOpenModal(false);
      } catch (e) {
        toast.error('Error actualizando el rol del usuario.');
      }
    };
  
    return (
      <div>
        <form onSubmit={submitForm} className='flex flex-col gap-y-5'>
        <label htmlFor='user' className='flex flex-row gap-x-2'>
            <span>Usuario</span>
            <select
            name='user'
                value={userId}
                onChange={(e) => setUserId(e.target.value)}>
                <option value='' disabled>Seleccione el usuario</option>
                {usersData?.users.map((user) => (
                    <option key={user.id} value={user.id}>
                        {user.name}
                    </option>
                ))}
            </select>
          </label>
          <label htmlFor='role' className='flex flex-row gap-x-2'>
            <span>Rol</span>
            <select
            name='role'
                value={roleId}
                onChange={(e) => setRoleId(e.target.value)}>
                <option value='' disabled>Seleccione el nuevo rol</option>
                {rolesData?.roles.map((role) => (
                    <option key={role.id} value={role.id}>
                        {role.name}
                    </option>
                ))}
            </select>
          </label>
          <FormButtons loading={mutationLoading} setOpenModal={setOpenModal} />
        </form>
      </div>
    );
  };

export default ModalUsers