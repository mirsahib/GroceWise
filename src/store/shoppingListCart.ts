import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { Products } from '@/interfaces/interfaces';

export interface InitialStateType {
    itemList: Array<{
        product: Products | null;
    }>;
    totalItem: number;
};

const initialState: InitialStateType = {
    itemList: [
        {
            product: null,
        }
    ],
    totalItem: 0
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToShoppingListCart(state, action: PayloadAction<Products>) {
            const newItem = action.payload;
            //const newItemprice = action.payload.attributes.price?action.payload.attributes.price:0
            const productCount = state.totalItem;
            //check if cart is empty
            if (productCount == 0) {
                state.itemList = [
                    { product: newItem}
                ];
                state.totalItem = state.totalItem + 1;
            } else {
                const productIndex = state.itemList.findIndex(
                    (item) => item.product?.id == newItem.id
                );
                //check if product exist
                if (productIndex == -1) {
                    state.itemList.push({
                        product: newItem,
                    });
                    state.totalItem = state.totalItem + 1;
                }
            }
            console.log("🚀 ~ file: cart.ts:32 ~ addToCart ~ state:", current(state))

        },
        
        
        removeFromShoppingListCart(state, action: PayloadAction<Products>) {
            const newItem = action.payload;
            const productIndex = state.itemList.findIndex(
                ({ product }) => product?.id === newItem.id
            );
            state.itemList.splice(productIndex, 1);
            state.totalItem = state.totalItem - 1;
        }
    }
});

export const { addToShoppingListCart, removeFromShoppingListCart } =
    cartSlice.actions;
export default cartSlice.reducer;
