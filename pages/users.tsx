import PrivateRoute from '@/components/PrivateRoute';
import { SideBar } from '@/components/SideBar';
import Users from '@/components/Users';
import { ModalContextProvider } from '@/context/modalContext';
import Layout from '@/layouts/Layout';
import React from 'react';

const users = () => (
  <PrivateRoute role='ADMIN'>
    <ModalContextProvider>
      <Layout>
        <SideBar />
        <Users />
      </Layout>
    </ModalContextProvider>
  </PrivateRoute>
);

export default users;
