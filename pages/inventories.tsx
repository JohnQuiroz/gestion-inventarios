import { Movements } from '@/components/Movements';
import { PrivateRoute } from '@/components/PrivateRoute';
import { SideBar } from '@/components/SideBar';
import { ModalContextProvider } from '@/context/modalContext';
import { Layout } from '@/layouts/Layout';
import React from 'react';

const inventories = () => (
  <PrivateRoute role='ADMIN && USER'>
    <ModalContextProvider>
      <Layout>
        <SideBar />
        <Movements />
      </Layout>
    </ModalContextProvider>
  </PrivateRoute>
);

export default inventories;
