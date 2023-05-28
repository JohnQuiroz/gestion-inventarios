import {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useState,
  } from 'react';
  
  interface ModalContextProps {
    openModalMaterials: boolean;
    setOpenModalMaterials: Dispatch<SetStateAction<boolean>>;
    openModalUsers: boolean;
    setOpenModalUsers: Dispatch<SetStateAction<boolean>>;
    openModalMovements: boolean;
    setOpenModalMovements: Dispatch<SetStateAction<boolean>>;
    materialId: string;
    setMaterialId: Dispatch<SetStateAction<string>>;
  }
  
  const ModalContext = createContext<ModalContextProps>(
    {} as ModalContextProps
  );
  
  export const useModalContext = () => useContext(ModalContext);
  
  interface ModalContextProviderProps {
    children: JSX.Element;
  }
  
  const ModalContextProvider = ({
    children,
  }: ModalContextProviderProps) => {
    const [openModalMaterials, setOpenModalMaterials] = useState<boolean>(false);
    const [openModalMovements, setOpenModalMovements] = useState<boolean>(false);
    const [openModalUsers, setOpenModalUsers] = useState<boolean>(false);
    const [materialId, setMaterialId] = useState<string>('');
  
    return (
      <ModalContext.Provider
        value={{
          openModalUsers,
          setOpenModalUsers,
          openModalMaterials,
          setOpenModalMaterials,
          openModalMovements,
          setOpenModalMovements,
          materialId,
          setMaterialId,
        }}
      >
        {children}
      </ModalContext.Provider>
    );
  };
  
  export { ModalContextProvider };