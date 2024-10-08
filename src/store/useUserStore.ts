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
            login: () => {
                // const userLocalStorage = localStorage.getItem('accessToken');
                const userSessionStorage = sessionStorage.getItem('accessToken');
                if (userSessionStorage) {
                    set({ isLoggedIn: true })
                } else if (!userSessionStorage) {
                    set({ isLoggedIn: false })
                }
            },
            logout: () => {
                set({ isLoggedIn: false });
                sessionStorage.removeItem('accessToken');
                // localStorage.removeItem('accessToken');

            },
        }),
        {
            name: 'user-store',
        }
    )
);