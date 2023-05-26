import React from 'react';
import { useSession, signIn } from "next-auth/react";
import { useRouter } from 'next/router';

const Login = () => {
    const router = useRouter();
    const { data: session, status } = useSession();

    if (status === "loading") return <p>Cargando...</p>;

    if (session) {
        router.push('/app');
    }

    return (
        <div className='flex flex-col w-full h-screen justify-center items-center gap-y-12'>
            <div className="flex flex-col justify-center w-full gap-y-20 items-center">
                <h1 className='text-5xl'>Sistema de Gestión de Inventarios</h1>
            </div>
            <div className="flex flex-col justify-center w-full gap-y-5 items-center">
                <span className="flex flex-row justify-center w-full">
                    Por favor inicie sesión para continuar.
                </span>
            </div>
            <div className="flex justify-center items-center">
                <button type='button' onClick={() => signIn('auth0')} className="border border-solid border-slate-900 bg-slate-600 rounded-md p-2 text-base hover:bg-slate-300 text-zinc-50 hover:text-zinc-700">Iniciar sesión</button>
            </div>
        </div>
    )
}

export default Login