import { useUserData } from '@/hooks/useUserData';
import { useRouter } from 'next/router';
import React from 'react';

interface PrivateRouteProps {
  children: JSX.Element | JSX.Element[];
  role?: string;
}

const PrivateRoute = ({ children, role }: PrivateRouteProps) => {
  const router = useRouter();
  const { role: userRole, loadingUserData } = useUserData();
  const { status, session } = useUserData();

  if (status === 'loading' || loadingUserData) return <p>Cargando...</p>;

  if (!session) {
    return (
      <div className='page-container'>
        <h1 className='text-4xl'>
          Para acceder a esta página debe iniciar sesión
        </h1>
        <button
          type='button'
          onClick={() => router.push('/')}
          className='primary-button'
        >
          Volver al inicio
        </button>
      </div>
    );
  }

  if (role && userRole !== role)
    return (
      <div className='page-container'>
        <h1 className='text-4xl'>
          No tiene permiso para ingresar a esta página
        </h1>
        <h2 className='text-2xl'>
          Por favor contacte con el administrador del sistema
        </h2>
        <button
          type='button'
          onClick={() => router.push('/')}
          className='primary-button'
        >
          Volver al inicio
        </button>
      </div>
    );

  return <>{children}</>;
};

export { PrivateRoute };
