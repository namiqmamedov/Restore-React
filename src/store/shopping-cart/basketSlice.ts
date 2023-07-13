import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Basket } from "../../models/basket";
import agent from "../../api/agent";

interface BasketState {
    basket: Basket | null,
    status: string
}

const initialState: BasketState = {
    basket: null,
    status: 'idle' 
}

export const addBasketItemAsync = createAsyncThunk<Basket, {productID: number, quantity:number}>(
    'basket/addBasketItemAsync',
    async ({productID,quantity}) => {
        try {
            return await agent.Basket.addItem(productID,quantity);
        } catch (error) {
            console.log(error)
        }
    }
)

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        setBasket: (state,action) => {
            state.basket = action.payload
        },
        removeItem: (state,action) => {
            const {productID,quantity} = action.payload;
            const itemIndex = state.basket?.items.findIndex(i => i.productID === productID)

            if(itemIndex === -1 || itemIndex === undefined) return
            state.basket!.items[itemIndex].quantity -= quantity
            if(state.basket?.items[itemIndex].quantity === 0) state.basket.items.splice(itemIndex, 1)
        }
    },
    extraReducers: (builder => {
        builder.addCase(addBasketItemAsync.pending, (state,action) => {
            console.log(action)
            state.status = 'pendingAddItem'
        });
        builder.addCase(addBasketItemAsync.fulfilled, (state,action) => {
            state.basket = action.payload
            state.status = 'pendingAddItem'
        });
        builder.addCase(addBasketItemAsync.rejected, (state) => {
            state.status = 'idle'
        });
    }) 
}) 

export const {setBasket, removeItem} = basketSlice.actions