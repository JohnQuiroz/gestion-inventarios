import { Materials } from '@/components/Materials';
import PrivateRoute from '@/components/PrivateRoute';
import { SideBar } from '@/components/SideBar';
import { ModalContextProvider } from '@/context/modalContext';
import Layout from '@/layouts/Layout';
import React from 'react';

const materials = () => (
  <PrivateRoute role='ADMIN && USER'>
    <ModalContextProvider>
      <Layout>
        <SideBar />
        <Materials />
      </Layout>
    </ModalContextProvider>
  </PrivateRoute>
);

export default materials;
