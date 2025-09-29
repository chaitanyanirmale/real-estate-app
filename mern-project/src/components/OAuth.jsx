import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth';
import { auth } from '../firebase.js';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice.js';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';



export default function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const handleGoogleClick = async () => {
        if (loading) return;
        setLoading(true);
        try{
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);

            console.log("Google OAuth result:", result);
            const res = await fetch("/api/auth/google", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    image: result.user.photoURL,
                }),
            });
            const data = await res.json();
            dispatch(signInSuccess(data));
            navigate("/");
        }catch(err) {
            console.error("Error during Google OAuth:", err);
        }
    }
  return (
    <button onClick={handleGoogleClick} type='button' className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>{loading ? "Please wait..." : "Continue with Google"}</button>
  )
}
