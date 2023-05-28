import React from 'react';

interface LayoutProps {
  children: JSX.Element | JSX.Element[];
}

const Layout = ({ children }: LayoutProps) => {
  return <div className='flex h-screen w-full flex-row'>{children}</div>;
};

export default Layout;
