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
    <div className='page-container'>
      <div>
        <h1 className='text-5xl'>Sistema de Gestión de Inventarios</h1>
      </div>
      <div>
        <span>Por favor inicie sesión para continuar.</span>
      </div>
      <div>
        <button
          type='button'
          onClick={() => signIn('auth0')}
          className='primary-button'
        >
          Iniciar sesión
        </button>
      </div>
    </div>
  );
};

export { Login };
