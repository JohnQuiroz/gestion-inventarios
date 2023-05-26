import React from 'react';
import PrivateComponent from './PrivateComponent';
import { signOut } from 'next-auth/react';

const SideBar = () => (
  <aside className='flex h-full w-64 flex-col gap-y-28 bg-gray-500 pt-20'>
    <div className='flex flex-col items-center justify-center gap-y-2'>
      <div className=''>
        <img
          src='https://i.imgur.com/7IhjZrO.png'
          alt='imagen de usuario'
          className='h-20 w-20 rounded-full'
        />
      </div>
      <div className='flex items-center justify-center'>
        <h3 className='text-sm text-zinc-50'>
          <span>Nombre de usuario</span>
        </h3>
      </div>
    </div>
    <div className='flex h-full flex-col gap-y-3 px-4'>
      <button className='rounded-md border border-slate-900 bg-slate-600 p-2 text-base text-zinc-50 hover:bg-slate-300 hover:text-zinc-700'>
        Inventarios
      </button>
      <button className='rounded-md border border-slate-900 bg-slate-600 p-2 text-base text-zinc-50 hover:bg-slate-300 hover:text-zinc-700'>
        Materiales
      </button>
      <PrivateComponent role='ADMIN'>
        <button className='rounded-md border border-slate-900 bg-slate-600 p-2 text-base text-zinc-50 hover:bg-slate-300 hover:text-zinc-700'>
          Usuarios
        </button>
      </PrivateComponent>
    </div>
    <div className='flex h-full flex-col justify-center gap-y-3 px-4'>
      <button
        type='button'
        onClick={() => signOut({ callbackUrl: '/' })}
        className='rounded-md border border-slate-900 bg-slate-600 p-2 text-base text-zinc-50 hover:bg-slate-300 hover:text-zinc-700'>
        Cerrar sesión
      </button>
    </div>
  </aside>
);

export { SideBar };
