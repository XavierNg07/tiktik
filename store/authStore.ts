import create from 'zustand';
import {persist} from 'zustand/middleware';

const authStore = (set : any) => ({
    userProfile : null,
    addUser: (user : any) => set({userProfile : user}),
    removeUser: () => set({userProfile : null}),
});

export default create(persist(authStore, {name: 'auth'}))
