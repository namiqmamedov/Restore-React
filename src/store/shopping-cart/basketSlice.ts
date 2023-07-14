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

export const addBasketItemAsync = createAsyncThunk<Basket, {productID: number, quantity?:number}>(
    'basket/addBasketItemAsync',
    async ({productID,quantity = 1}) => {
        try {
            return await agent.Basket.addItem(productID,quantity);
        } catch (error) {
            console.log(error)
        }
    }
)

export const removeBasketItemAsync = createAsyncThunk<void, {productID: number, quantity: number, name?: string}>(
    'basket/removeBasketItemAsync',
    async ({productID,quantity}) => {
        try {
            await agent.Basket.removeItem(productID,quantity);
        } catch (error) {
            
        }
    }
)

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        setBasket: (state,action) => {
            state.basket = action.payload
        }
    },
    extraReducers: (builder => {
        builder.addCase(addBasketItemAsync.pending, (state,action) => {
            state.status = 'pendingAddItem' + action.meta.arg.productID;
        });
        builder.addCase(addBasketItemAsync.fulfilled, (state,action) => {
            state.basket = action.payload
            state.status = 'idle'
        });
        builder.addCase(addBasketItemAsync.rejected, (state) => {
            state.status = 'idle'
        });
        builder.addCase(removeBasketItemAsync.pending, (state,action) => {
            state.status = 'pendingRemoveItem' + action.meta.arg.productID + action.meta.arg.name;
        });
        builder.addCase(removeBasketItemAsync.fulfilled, (state,action) => {
            const {productID,quantity} = action.meta.arg;
            const itemIndex = state.basket?.items.findIndex(i => i.productID === productID)

            if(itemIndex === -1 || itemIndex === undefined) return
            state.basket!.items[itemIndex].quantity -= quantity;
            if(state.basket?.items[itemIndex].quantity === 0) state.basket.items.splice(itemIndex, 1)
            state.status = 'idle';
        })
        builder.addCase(removeBasketItemAsync.rejected, (state) => {
            state.status = 'idle';
        })
    }) 
}) 

export const {setBasket} = basketSlice.actions