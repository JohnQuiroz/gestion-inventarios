import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react'

interface PrivateRouteProps {
    children: JSX.Element | JSX.Element[];
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const router = useRouter();
    const { data: session, status } = useSession();

    if (status === "loading") return <p>Cargando...</p>;

    if (!session) {
        return (
            <div className='h-screen w-full flex flex-col justify-center items-center gap-y-9'>
                <h1 className='text-4xl'>Para acceder a esta página debe iniciar sesión</h1>
                <button type='button' onClick={() => router.push('/')} className="border border-solid border-slate-900 bg-slate-600 rounded-md p-2 text-base hover:bg-slate-300 text-zinc-50 hover:text-zinc-700">Volver al inicio</button>
            </div>
        )
    }

    return (
        <>{children}</>
    )
}

export default PrivateRoute