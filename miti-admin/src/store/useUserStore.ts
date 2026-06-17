import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type User = {
    id: string;
    name: string;
    email: string;
};

type UserStore = {
    isLoggedIn: boolean;
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
};

export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            isLoggedIn: false,
            user: null,
            login: (user: User) => {
                const accessToken = sessionStorage.getItem('accessToken');
                if (accessToken) {
                    set({ isLoggedIn: true, user: user });
                }

            },
            logout: () => {
                set({ isLoggedIn: false, user: null });
                sessionStorage.removeItem('accessToken');
                sessionStorage.removeItem('refreshToken');
            },
        }),
        {
            name: 'user-store',
        }
    )
);
