import React from 'react';
import { PrivateComponent } from './PrivateComponent';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useUserData } from '@/hooks/useUserData';

const SideBar = () => {
  const { session } = useUserData();
  return (
    <aside>
      <div className='user-container'>
        <div>
          <img
            src={session?.user?.image || '/default.webp'}
            alt='imagen de usuario'
            className='h-20 w-20 rounded-full'
          />
        </div>
        <div>
          <h3 className='text-sm text-zinc-50'>
            <span>{session?.user?.name}</span>
          </h3>
        </div>
      </div>
      <div className='navigation-container'>
        <SidebarLink href='/inventories' text='Inventarios' />
        <SidebarLink href='/materials' text='Materiales' />
        <PrivateComponent role='ADMIN'>
          <SidebarLink href='/users' text='Usuarios' />
        </PrivateComponent>
      </div>
      <div className='logout-container'>
        <button
          type='button'
          onClick={() => signOut({ callbackUrl: '/' })}
          className='secondary-button'
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
    <Link href={href} className={isActive ? 'active-button' : 'primary-button'}>
      <span>{text}</span>
    </Link>
  );
};

export { SideBar };
