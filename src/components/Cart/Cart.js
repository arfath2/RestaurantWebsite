import classes from "./Cart.module.css";
import Modal from "../UI/Modal";

const Cart = (props)=>{
    const cartItems= (
        <ul className={classes['cart-items']}>
            {[{ id:'c1', name:'arfath', amount:2, price:12.99 }] .map((item)=>(
                <li>{item.name}</li>
            ))}
        </ul>
    )

    return <Modal>
        {cartItems} 
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>36.58</span>
        </div>
        <div className={classes.actions}>
            <button className={classes['button--alt']}>close</button>
            <button className={classes.button}>order</button>
        </div>
    </Modal>
}

export default Cart;
