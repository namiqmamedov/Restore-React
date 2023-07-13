import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { basketSlice } from "./shopping-cart/basketSlice";
import { configureStore } from "@reduxjs/toolkit";


 export const store = configureStore({
    reducer: {
        basket: basketSlice.reducer
    }
 })

 export type RootState = ReturnType<typeof store.getState>
 export type AppDispatch = typeof store.dispatch

 export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector:  TypedUseSelectorHook<RootState> = useSelector; // her defe oz tipinnen miras almasin deye qisa method yaradiriq