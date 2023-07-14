import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../models/product";
import agent from "../../api/agent";
import { RootState } from "../configureStore";

const productsAdapter = createEntityAdapter<Product>();

export const fetchProductsAsync = createAsyncThunk<Product[]>(
    'product/fetchProductsAsync',
    async () => {
        try {
            return await agent.Product.list();
        } catch (error) {
            console.log(error)
        }
    }
)

export const fetchProductAsync = createAsyncThunk<Product, number>(
    'product/fetchProductAsync',
    async (productID) => {
        try {
            return await agent.Product.details(productID);
        } catch (error) {
            console.log(error)
        }
    }
)

export const productSlice = createSlice({
    name: 'product',
    initialState: productsAdapter.getInitialState({
        productsLoaded: false,
        status: 'idle'
    }),
    reducers: {},
    extraReducers: (builder => {
        builder.addCase(fetchProductsAsync.pending, (state) => {
            state.status = 'pendingFetchProducts'
        })
        builder.addCase(fetchProductsAsync.fulfilled, (state,action) => {
            productsAdapter.setAll(state,action.payload);
            state.status = 'idle';
            state.productsLoaded = true;
        })
        builder.addCase(fetchProductsAsync.rejected, (state) => {
            state.status = 'idle';
        })
        builder.addCase(fetchProductAsync.pending, (state) => {
            state.status = 'pendingFetchProduct';
        })
        builder.addCase(fetchProductAsync.fulfilled, (state,action) => {
            productsAdapter.upsertOne(state,action.payload)
            state.status = 'idle';
        })
        builder.addCase(fetchProductAsync.rejected, (state) => {
            state.status = 'idle'
        })
    })
})

export const productSelectors = productsAdapter.getSelectors((state: RootState) => state.product)