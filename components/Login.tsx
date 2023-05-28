import React from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

const Login = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === 'loading') return <p>Cargando...</p>;

  if (session) {
    router.push('/inventories');
  }

  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-y-12'>
      <div className='flex w-full flex-col items-center justify-center gap-y-20'>
        <h1 className='text-5xl'>Sistema de Gestión de Inventarios</h1>
      </div>
      <div className='flex w-full flex-col items-center justify-center gap-y-5'>
        <span className='flex w-full flex-row justify-center'>
          Por favor inicie sesión para continuar.
        </span>
      </div>
      <div className='flex items-center justify-center'>
        <button
          type='button'
          onClick={() => signIn('auth0')}
          className='rounded-md border border-solid border-slate-900 bg-slate-600 p-2 text-base text-zinc-50 hover:bg-slate-300 hover:text-zinc-700'>
          Iniciar sesión
        </button>
      </div>
    </div>
  );
};

export { Login };
