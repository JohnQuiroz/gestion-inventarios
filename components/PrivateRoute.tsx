import { useUserData } from '@/hooks/useUserData';
import { Enum_RoleName } from '@prisma/client';
import { useRouter } from 'next/router';
import React from 'react';

interface PrivateRouteProps {
  children: JSX.Element | JSX.Element[];
  role: string;
}

const PrivateRoute = ({ children, role: allowedRoles }: PrivateRouteProps) => {
  const router = useRouter();
  const { role: userRole, loadingUserData, status: userStatus } = useUserData();
  const { status, session } = useUserData();

  if (status === 'loading' || loadingUserData) return <p>Cargando...</p>;

  if (!session) {
    return (
      <div className='flex h-screen w-full flex-col items-center justify-center gap-y-9'>
        <h1 className='text-4xl'>
          Para acceder a esta página debe iniciar sesión
        </h1>
        <button
          type='button'
          onClick={() => router.push('/')}
          className='rounded-md border border-solid border-slate-900 bg-slate-600 p-2 text-base text-zinc-50 hover:bg-slate-300 hover:text-zinc-700'
        >
          Volver al inicio
        </button>
      </div>
    );
  }

  if(allowedRoles === 'ADMIN && USER' || userRole === allowedRoles) return <>{children}</>;

    return (
      <div className='flex h-screen w-full flex-col items-center justify-center gap-y-9'>
        <h1 className='text-4xl'>
          No tiene permiso para ingresar a esta página
        </h1>
        <h2 className='text-2xl'>
          Por favor contacte con el administrador del sistema
        </h2>
        <button
          type='button'
          onClick={() => router.push('/')}
          className='rounded-md border border-solid border-slate-900 bg-slate-600 p-2 text-base text-zinc-50 hover:bg-slate-300 hover:text-zinc-700'
        >
          Volver al inicio
        </button>
      </div>
    );
};

export default PrivateRoute;
