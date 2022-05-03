import { createSlice, PayloadAction,  } from "@reduxjs/toolkit";
import { BasketProductType, BasketSliceStateType } from "../utils/type";

const initialState: BasketSliceStateType = {
    items: []
}

export const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        addToBaskets: (state, action: PayloadAction<BasketProductType>) => {
            state.items = [...state.items, action.payload]
        },
        removeFromBaskets: (state, action: PayloadAction<{_id: string}>) => {
            state.items = state.items.filter(item => item._id.toString() !== action.payload._id)
        },
        initializeBaskets: (state, action: PayloadAction<BasketProductType[]>) => {
            state.items = action.payload
        }
    }
})

export const {addToBaskets, removeFromBaskets, initializeBaskets} = basketSlice.actions

// export const selectItems = (state: BasketSliceStateType) => state.items


export default basketSlice.reducer

