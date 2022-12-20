import create from 'zustand';
import {persist} from 'zustand/middleware';
import {IUser} from '../types';
import {BASE_URL} from '../utils';
import axios from 'axios';

interface AuthState {
    userProfile: IUser | null;
    allUsers: IUser[];
    addUser: (user : IUser) => void;
    removeUser: () => void;
    fetchAllUsers: () => void;
}
export default create<AuthState>()(
    persist(set => ({
        userProfile : null,
        allUsers : [],
        addUser: (user : IUser) => set({userProfile : user}),
        removeUser: () => set({userProfile : null}),
        fetchAllUsers: async () => {
            const {data} = await axios.get(`${BASE_URL}/api/users`);
            set({allUsers : data});
        }
    }), {name : 'auth'})
)

