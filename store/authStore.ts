import create from 'zustand';
import {persist} from 'zustand/middleware';
import {IUser} from '../types';

interface AuthState {
    userProfile: IUser | null
    addUser: (user : IUser) => void
    removeUser: () => void
}
export default create<AuthState>()(
    persist(set => ({
        userProfile : null,
        addUser: (user : IUser) => set({userProfile : user}),
        removeUser: () => set({userProfile : null}),
    }), {name : 'auth'})
)

