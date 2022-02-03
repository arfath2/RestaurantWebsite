import CartContext from "./CartContext";
import { useReducer } from "react";


const defaultCartState ={
    items:[],
    totalAmount: 0,
}

const cartReducer =(state,action)=>{
    if(action.type ==='ADD'){
        const updatedTotalAmount = state.totalAmount + action.item.price*action.item.amount;

        const existingCartItemIndex = state.items.findIndex((item)=> item.id === action.item.id);
        const exictingCartItem = state.items[existingCartItemIndex];
        let updatedItems;
         if(exictingCartItem){
          const updatedItem ={
                 ...exictingCartItem,
                 amount:exictingCartItem.amount+action.item.amount
             }
             updatedItems=[...state.items];
             updatedItems[existingCartItemIndex]= updatedItem;
         }else{
             updatedItems =state.items.concat(action.item)
         }        
        return{
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        }
    }
    if(action.type === 'REMOVE'){
        const existingCartItemIndex = state.items.findIndex((item)=> item.id === action.id);
        const exictingItem = state.items[existingCartItemIndex];
        const updatedtotalAmount = state.totalAmount - exictingItem.price;
        let updatedItems;
        if(exictingItem.amount === 1){
            updatedItems= state.items.filter(item=>item.id !== action.id)
        }else{
            const updatedItem = {...exictingItem, amount: exictingItem.amount - 1};
            updatedItems=[...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        return {
            items: updatedItems,
            totalAmount :updatedtotalAmount 
        }
    }
    return defaultCartState
}

const CartProvider =(props)=>{
   const[cartState, dispatchCartAction]= useReducer(cartReducer,defaultCartState )
    const additemToCartHandler = item =>{
        dispatchCartAction({type: 'ADD', item:item})
    }

    const removeItemFromCartHandler = id =>{
        dispatchCartAction({type: 'REMOVE', id:id})
    }

    const cartContext ={
        items:cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: additemToCartHandler,
        removeItem:removeItemFromCartHandler,
    }

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}

export default CartProvider;