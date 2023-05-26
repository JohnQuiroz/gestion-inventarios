import React from 'react'
import PrivateComponent from './PrivateComponent'

const SideBar = () => 
        <aside className='flex flex-col gap-y-28 w-64 bg-gray-500 h-full pt-20'>
            <div className="flex flex-col gap-y-2 justify-center items-center">
                <div className="">
                    <img src="https://i.imgur.com/7IhjZrO.png" alt="imagen de usuario" className="w-20 h-20 rounded-full" />
                </div>
                <div className="flex justify-center items-center">
                    <h3 className="text-sm text-zinc-50">
                        <span>Nombre de usuario</span>
                    </h3>
                </div>
            </div>
            <div className="flex flex-col gap-y-3 h-full px-4">
                <button className='border border-slate-900 bg-slate-600 rounded-md p-2 text-base hover:bg-slate-300 text-zinc-50 hover:text-zinc-700'>Inventarios</button>
                <button className='border border-slate-900 bg-slate-600 rounded-md p-2 text-base hover:bg-slate-300 text-zinc-50 hover:text-zinc-700'>Materiales</button>
                <PrivateComponent role='ADMIN'>
                    <button className='border border-slate-900 bg-slate-600 rounded-md p-2 text-base hover:bg-slate-300 text-zinc-50 hover:text-zinc-700'>Usuarios</button>
                </PrivateComponent>
            </div>
            <div className="flex flex-col gap-y-3 h-full px-4 justify-center items-end">
                <button className='border border-slate-900 bg-slate-600 rounded-md p-2 text-base hover:bg-slate-300 text-zinc-50 hover:text-zinc-700'>Cerrar sesión</button>
            </div>
        </aside>

export { SideBar }