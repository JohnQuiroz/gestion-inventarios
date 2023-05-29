import { GET_USER } from "@/graphql/client/user";
import { ExtendedUser } from "@/types";
import { useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";

const useUserData = () => {
    const { data: session, status } = useSession();
    const { data, loading: loadingUserData } = useQuery<{ user: ExtendedUser }>(GET_USER, {
        variables: {
            email: session?.user?.email,
        },
    });

    const role = data?.user.role.name;

    return {
        session,
        status,
        loadingUserData,
        role
    }
}

export { useUserData };