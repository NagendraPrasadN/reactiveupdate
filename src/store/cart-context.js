import React, { useReducer } from 'react';


const defaultCartState = {
    items: [],
    totalAmount: 0,
};

const CartContext = React.createContext({
    items: [],
    totalAmount: 0,
    addItem: (item) => { },
    removeItem: (id) => { }
});

const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        const itemExistenceIndex = state.items.findIndex((item) => item.id === action.item.id);
        const existingCartItem = state.items[itemExistenceIndex];
        let updatedItems;
        if (existingCartItem) {
            const updatingExistedItem = { ...existingCartItem, amount: existingCartItem.amount + action.item.amount }
            updatedItems = [...state.items];
            updatedItems[itemExistenceIndex] = updatingExistedItem;
        }
        else {
            updatedItems = state.items.concat(action.item);
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        };
    }
    if (action.type === 'REMOVE') {

        const itemExistenceIndex = state.items.findIndex((item) => item.id === action.id);
        const existingCartItem = state.items[itemExistenceIndex];
        const updatedTotalAmount = state.totalAmount - existingCartItem.price;
        let updatedItems;
        if (existingCartItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.id);
        }
        else {
            const updatedItem = { ...existingCartItem, amount: existingCartItem.amount - 1 };
            updatedItems = [...state.items];
            updatedItems[itemExistenceIndex] = updatedItem;
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        };
    }

    return defaultCartState;
}

export const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)

    const addItemToCartHandler = (item) => {
        dispatchCartAction({ type: 'ADD', item: item });
    };

    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({ type: 'REMOVE', id: id });
    };

    const defaultValue = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
    }


    return (<CartContext.Provider value={defaultValue} >
        {props.children}
    </CartContext.Provider>)
}

export default CartContext;