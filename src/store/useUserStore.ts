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
                const userLocalStorage = sessionStorage.getItem('accessToken');
                if (userLocalStorage) {
                    set({ isLoggedIn: true })

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