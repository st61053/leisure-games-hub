import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IUser, IUserState } from './types'
import { ILoginResponse, loginUser } from './api/loginUser'
import { ApiObjectType } from '../app/config'
import { getUser } from './api/getUser'
import { getUsers } from './api/getUsers'

const initialState: IUserState = {
    jwt: undefined,
    loginUserId: undefined,
    loggedUser: {
        id: '',
        type: ApiObjectType.USER,
        attributes: {
            username: '',
            firstname: '',
            lastname: '',
            email: ''
        }
    },
    users: [],
    loginData: {
        id: '',
        type: ApiObjectType.USER,
        attributes: {
            email: '',
            password: ''
        }
    },
    loading: {
        login: false,
        loggedUser: false,
        users: false
    },
    error: {
        login: '',
        loggedUser: '',
        users: ''
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logoutUser: (state) => state.jwt = undefined,
    },
    extraReducers: (builder) => {
        builder
            // LOGIN USER
            .addCase(loginUser.pending, (state) => {
                state.loading.login = true;
                state.error.login = "";
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<ILoginResponse>) => {
                state.jwt = action.payload.token;
                state.loginUserId = action.payload.userId;
                state.loading.login = false;

            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading.login = false;
                state.error.login = action.payload as string;
            })
            // GET USER
            .addCase(getUser.pending, (state) => {
                state.loading.loggedUser = true;
                state.error.loggedUser = "";
            })
            .addCase(getUser.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.loggedUser = action.payload;
                state.loading.loggedUser = false;

            })
            .addCase(getUser.rejected, (state, action) => {
                state.loading.loggedUser = false;
                state.error.loggedUser = action.payload as string;
            })
            // GET USERS
            .addCase(getUsers.fulfilled, (state, action: PayloadAction<IUser[]>) => {
                state.users = action.payload;
            })
    },
})

export const {
    logoutUser
} = userSlice.actions


export default userSlice.reducer