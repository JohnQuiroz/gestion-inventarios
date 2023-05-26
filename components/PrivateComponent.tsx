import { GET_USER } from '@/graphql/client/user';
import { useUserData } from '@/hooks/useUserData';
import { useQuery } from '@apollo/client';
import { Enum_RoleName } from '@prisma/client';
import { useSession } from 'next-auth/react';
import React from 'react'

interface PrivateComponentProps {
    role: Enum_RoleName;
    children: JSX.Element | JSX.Element[];
}

const PrivateComponent = ({ role, children }: PrivateComponentProps) => {
    const { role: userRole, loadingUserData, status } = useUserData();

    if (status === "loading" || loadingUserData) return <></>

    if (userRole !== role) return <></>
    
    return (
        <>{children}</>
    )
}

export default PrivateComponent