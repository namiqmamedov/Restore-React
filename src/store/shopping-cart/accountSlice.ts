import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { User } from "../../models/user";
import { FieldValues } from "react-hook-form";
import agent from "../../api/agent";
import { router } from "../../main";
import { toast } from "react-toastify";
import { setBasket } from "./basketSlice";

interface AccountState {
    user: User | null;
}

const initialState : AccountState = {
    user: null
}

export const signInUser = createAsyncThunk<User,FieldValues>(
    'account/signInUser',
    async (data, thunkAPI) => {
        try {
            const userDto = await agent.Account.login(data);
            const {basket, ...user} = userDto;
            if(basket) thunkAPI.dispatch(setBasket(basket))
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
)

export const fetchCurrentUser = createAsyncThunk<User>(
    'account/fetchCurrentUser',
    async (_, thunkAPI) => {
        thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem('user')!))) // ! that meaning remove the type safety check 
        try {
            debugger
            const userDto = await agent.Account.currentUser();
            const {basket, ...user} = userDto;
            if(basket) thunkAPI.dispatch(setBasket(basket))
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    },
    {
        condition: () => {
            if(!localStorage.getItem('user')) return false;
        }
    }
)

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        signOut: (state) => {
            state.user = null;
            localStorage.removeItem('user');
            router.navigate('/')
        },
        setUser: (state,action) => {
            let claims = JSON.parse(atob(action.payload.token.split('.')[1]));
            let roles = claims['http://schemas.microsoft.com/2008/06/identity/claims/role'];
            state.user = {...action.payload, roles: typeof(roles) === 'string' ? [roles] : roles};
        }
    },
    extraReducers: (builder => {
        builder.addCase(fetchCurrentUser.rejected, (state) => {
            state.user = null;
            localStorage.removeItem('user');
            toast.error('Session expired - please login again');
            router.navigate('/');
        })
         builder.addMatcher(isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled), (state,action) => {
            let claims = JSON.parse(atob(action.payload.token.split('.')[1])); // take admin not member
            let roles = claims['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']; 
            state.user = {...action.payload, roles: typeof(roles) === 'string' ? [roles] : roles};
         });
         builder.addMatcher(isAnyOf(signInUser.rejected, fetchCurrentUser.rejected), (state,action) => {
            state;
            throw action.payload;
         });
    })
})

export const {signOut, setUser} = accountSlice.actions