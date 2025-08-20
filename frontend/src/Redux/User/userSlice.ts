
import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from '@reduxjs/toolkit'
import type { IUser } from "../../Types/authTypes";

interface UserState {
    user: IUser | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    user: null,
    loading: false,
    error: null
}


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLoading: (state: UserState) => {
            console.log("Current state before setting Loading :", state);
            if (!state) return;
            state.loading = true

        },

        setUser: (state: UserState, action: PayloadAction<IUser>) => {
            state.user = {
                ...action.payload,
                accessToken: action.payload.accessToken || state.user?.accessToken,
                refreshToken: action.payload.refreshToken || state.user?.refreshToken
            }
        },
        setError: (state, action: PayloadAction<string>) => {
            console.log("Error setting state:", state);
            if (!state) return;
            state.error = action.payload;
            state.loading = false;
        },
        logoutUser: (state) => {
            state.user = null;
            state.loading = false;
            state.error = null;
            localStorage.removeItem('userProfile');
        },
    }
})
export const { setLoading:setLoadingAction,setUser,setError,logoutUser } = userSlice.actions
export default userSlice.reducer