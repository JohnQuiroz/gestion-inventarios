import React from 'react';
import PrivateComponent from './PrivateComponent';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useUserData } from '@/hooks/useUserData';

const SideBar = () => {
  const { session } = useUserData();
  return (
    <aside className='flex h-full w-64 flex-col gap-y-28 bg-gray-500 pt-20'>
      <div className='flex flex-col items-center justify-center gap-y-2'>
        <div className=''>
          <img
            src={session?.user?.image || 'https://i.imgur.com/7IhjZrO.png'}
            alt='imagen de usuario'
            className='h-20 w-20 rounded-full'
          />
        </div>
        <div className='flex items-center justify-center'>
          <h3 className='text-sm text-zinc-50'>
            <span>{session?.user?.name}</span>
          </h3>
        </div>
      </div>
      <div className='flex h-full flex-col gap-y-3 px-4'>
        <SidebarLink href='/inventories' text='Inventarios' />
        <SidebarLink href='/materials' text='Materiales' />
        <PrivateComponent role='ADMIN'>
          <SidebarLink href='/users' text='Usuarios' />
        </PrivateComponent>
      </div>
      <div className='flex h-full flex-col justify-center gap-y-3 px-4'>
        <button
          type='button'
          onClick={() => signOut({ callbackUrl: '/' })}
          className='rounded-md border border-slate-900 bg-slate-300 p-2 text-base text-zinc-700 hover:bg-slate-600 hover:text-zinc-50'
        >
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
};

interface SidebarLinkProps {
  href: string;
  text: string;
}

const SidebarLink = ({ href, text }: SidebarLinkProps) => {
  const router = useRouter();

  const isActive = router.pathname === href;

  return (
    <Link
      href={href}
      className={
        isActive
          ? 'rounded-md border-2 border-cyan-500 bg-slate-500 p-2 text-center text-base text-zinc-50 hover:bg-slate-300 hover:text-zinc-700'
          : 'rounded-md border border-slate-900 bg-slate-600 p-2 text-center text-base text-zinc-50 hover:bg-slate-300 hover:text-zinc-700'
      }
    >
      <span>{text}</span>
    </Link>
  );
};

export { SideBar };
