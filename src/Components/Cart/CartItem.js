import React from "react";
import "./cart.css"; // Import the CSS file
import {toast } from 'react-toastify'
import { doc,getDoc,arrayRemove, updateDoc } from "firebase/firestore";
import db from "../../Firebase/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { loginSelector , removeCartItem} from "../../redux/reducers/loginReducer";

const CartItem = ({item}) => {
  const { id, name, price ,url } = item;
  const {loginData} =useSelector(loginSelector);
  const dispatch= useDispatch();

  const removeFromCart = async (itemId) => {
    try {
      // Create a reference to the "Products" collection using itemId
      const productRef = doc(db, 'Products', itemId);

      // Create a reference to the "BuyBusyUser" document
      const docRef = doc(db, 'BuyBusyUser', loginData.id);
      const userDocRef = await getDoc(docRef);

      if (userDocRef.exists()) {
        // Update the document, removing the reference from the "cart" array
        await updateDoc(docRef, {
          cart: arrayRemove(productRef),
        });

        dispatch(removeCartItem(itemId));
        const productf = await getDoc(productRef);
        toast(`Removed ${productf.data().name}`)
      }
    } catch (error) {
      console.error("Error removing from cart:", error.message);
    }
  };


  return (
    <div className="cart-item">
      <img className="product-image" src={url} alt="img" />
      <span>{name}</span>
      <span>{`Total: $${(price).toFixed(2)}`}</span>
      <button onClick={() => removeFromCart(id)}>Remove Item</button>
    </div>
  );
};

export default CartItem;
