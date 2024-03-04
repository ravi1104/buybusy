import React from "react";
import "./product.css"; 
import { toast } from "react-toastify";
import db from "../../Firebase/firebaseConfig";
import { doc, getDoc, collection, arrayUnion, updateDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { loginSelector ,setCartItems} from "../../redux/reducers/loginReducer";

const Product = ({ product }) => {
  const { url, description, name, price } = product;
  const {loginData} =useSelector(loginSelector);
  const {cartItems }= useSelector(loginSelector);
  const dispatch= useDispatch();

  const addToCart = async (itemId) => {
    try {
      if (!loginData.id) {
        toast("Please Login")
        return;
      }
      const userDocRef = doc(collection(db, "BuyBusyUser"), loginData.id);
      const productRef = doc(db, 'Products', itemId);
      const userDocSnapshot = await getDoc(userDocRef);
      if (userDocSnapshot.exists()) {
      
        const currentCart=userDocSnapshot.data().cart.map(i=>i.id);
        if (!currentCart.includes(productRef.id)) {

          await updateDoc(userDocRef, {
            cart: arrayUnion(productRef),
          });

          const itemDocSnapshot = await getDoc(productRef);
          if (itemDocSnapshot.exists()) {
            const newItem = { id: itemDocSnapshot.id, ...itemDocSnapshot.data() };
            
            let prevCartItems = cartItems.filter((i) => i.id != itemDocSnapshot.id);
            toast(`Added ${itemDocSnapshot.data().name}`)
            dispatch(setCartItems(newItem));
          }
        } else {
          console.log("Item is already in the cart.");
          toast("Already in Cart")
        }
      }
    } catch (error) {
      console.error("Error adding to cart:", error.message);
    }
  };

  return (
    <div className="product-container">
      <img className="product-image" src={url} alt={description} />
      <h2 className="product-name">{name}</h2>
      <h3 className="product-description">{description}</h3>
      <p className="product-price">{`Price: $${price}`}</p>
      <button className="add-to-cart-button" onClick={() => addToCart(product.id)}>
        Add to Cart
      </button>
    </div>
  );
};

export default Product;
