import Spinner from 'react-spinner-material';
import Product from '../Components/Product/Product';
import { shopSelector, setProducts } from "../redux/reducers/shopReducer";
import {  useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Filter from '../Components/filter/Filter';
import {collection, getDocs, query, where } from 'firebase/firestore';
import db from '../Firebase/firebaseConfig';

const Home = () => {
  const {products, filter} = useSelector(shopSelector);
  const dispatch=useDispatch();
  const [loading, setLoading]=useState(true);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, "Products");
        // console.log(filter);
        // Apply filter to the query
        const querySnapshot = await getDocs(
          query(
            productsCollection,
            where("price", "<=", parseInt(filter))

          )
        );
        const docSnap=querySnapshot.docs.map(d=> {return {...d.data(),id:d.id}});

        dispatch(setProducts(docSnap));
        
        setTimeout(() => {
          setLoading(false);
        }, 1000);
  
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
  
    fetchProducts();
  
  },[dispatch,filter]);



  return (
    <>
    <div className="container">
    <div className="home" >
      {loading ? (
        <Spinner style={{ position: "relative", top: "30vh" }} radius={50} color={"blue"} stroke={3} visible={true} />
      ) : (
        <>
          {products.map((product) => (
             <Product key={product.id} product={product} />
            
          ))}
        </>
      )}
    </div>
    <div className="filter">
            <Filter />
    </div>
    </div>
    </>
  );
};

export default Home;
