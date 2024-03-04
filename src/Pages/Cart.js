import { loginSelector } from "../redux/reducers/loginReducer";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../Components/Cart/CartItem";
export const Cart = () => {

  const {cartItems}= useSelector(loginSelector);
  return (
    <div className="cart-container">
      <h2 style={{textAlign:"center"}}>Your Cart</h2>
      {cartItems.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
  );
};
