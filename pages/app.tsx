import Inventory from '@/components/Inventory'
import PrivateRoute from '@/components/PrivateRoute'
import { SideBar } from '@/components/SideBar'
import React from 'react'

const app = () => 
        <PrivateRoute>
            <div className='flex flex-row h-screen w-full'>
                <SideBar />
                <Inventory />
            </div>
        </PrivateRoute>

export default app