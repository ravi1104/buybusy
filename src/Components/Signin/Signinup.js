import { signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import db from "../../Firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import "./SignIn.css";
import { setLoginData, setError, loginSelector } from "../../redux/reducers/loginReducer";
import { useDispatch, useSelector } from "react-redux";

const SignInUp = () => {
    const [login, setLogin] = useState(true);
    const { error } = useSelector(loginSelector);
    const dispatch = useDispatch();
    const passwordRef = useRef();
    const userIdRef = useRef();
    const fnameRef = useRef();
    const navigate = useNavigate();

    const handleSignIn = async () => {
        try {
            const id = userIdRef.current.value;
            const pass = passwordRef.current.value;
            const userCredential = await signInWithEmailAndPassword(getAuth(), id, pass);
            const user = userCredential.user;
            if (user) {
                const docRef = doc(db, "BuyBusyUser", id);
                const docSnap = await getDoc(docRef);
                const userData = docSnap.data();
                const cartData = await Promise.all(userData.cart.map(async (id) => {
                    const item = await getDoc(id);
                    return { id: id.id, ...item.data() }
                }));
                dispatch(setLoginData({ loginData: { fname: userData.fname, id: docSnap.id }, cart: cartData }));
                navigate('/');
            }
        } catch (error) {
            dispatch(setError(error));
            console.log(error.message);
        }
    };

    const handleSignUp = async () => {
        try {
            const id = userIdRef.current.value;
            const pass = passwordRef.current.value;
            const fname = fnameRef.current.value;
            const userCredential = await createUserWithEmailAndPassword(getAuth(), id, pass);
            const user = userCredential.user;
            if (user) {
                const userData = { fname: fname, cart: [] }; // Assuming initial user data
                const docRef = doc(db, "BuyBusyUser", id);
                await setDoc(docRef, userData);
                dispatch(setLoginData({ loginData: { fname: fname, id: id }, cart: [] }));
                navigate('/');
            }
        } catch (error) {
            dispatch(setError(error));
            console.log(error.message);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (login) {
            handleSignIn();
        } else {
            handleSignUp();
        }
    };

    return (
        <form className="signin-form" onSubmit={handleSubmit}>
            <label className="form-label">Email</label>
            <input className="form-input" ref={userIdRef} type="email" defaultValue="temp@temp.com" required />
            {!login &&
                <>
                    <label className="form-label">First Name</label>
                    <input className="form-input" ref={fnameRef} type="text" required />
                </>
            }
            <label className="form-label">Password</label>
            <input className="form-input" ref={passwordRef} type="password" defaultValue="123456" required />
            <a className="toggle-link" href="#" onClick={() => setLogin(!login)}>
                Sign {login ? "up" : "in"} here
            </a>
            {error && <p>{error.message}</p>}
            <button className="form-button" type="submit">{login ? "Login" : "Sign Up"}</button>
        </form>
    );
};

export default SignInUp;
