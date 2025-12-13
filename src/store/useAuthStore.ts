import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface UserInfo{
    user_id: string | number | null;
    username: string | null;
}

interface AllUserData extends UserInfo {
    [key: string]: any;
}

//
interface AuthState{
    allUserData: AllUserData | null;
    loading: boolean;

    user: () => UserInfo;

    setUser: (user: AllUserData | null) => void;
    setLoading: (loading: boolean) => void;
    isLoggedIn: () => boolean;
}

const useAuthStore = create<AuthState>()(
    devtools(
        (set, get) => ({
            allUserData: null,
            loading: false,

            user: () => ({
                user_id: get().allUserData?.user_id || null,
                username: get().allUserData?.username || null,
            }),

            setUser: (user) => 
                set({
                    allUserData: user,
                }),
            
            setLoading: (loading) => set({loading}),

            isLoggedIn: () => get().allUserData !== null


            

        }),

        {
            name: "AuthStore",
            //TODO: enable: import.meta.env.DEV,
        }
    )
);

export {useAuthStore};
export type {AuthState}