import React from 'react';

interface LayoutProps {
  children: JSX.Element | JSX.Element[];
}

const Layout = ({ children }: LayoutProps) => {
  return <div className='layout'>{children}</div>;
};

export { Layout };
