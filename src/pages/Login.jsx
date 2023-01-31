//Firebase...
import {auth, provider} from "../config/firebase"
import {signInWithPopup} from "firebase/auth"

//React-router...
import { useNavigate } from "react-router-dom"

//React-icons...
import {FcGoogle} from "react-icons/fc"

//Styles...
import "../styles/Login.scss"

export default function Login() {
    const navigate = useNavigate()

    const signUpWithGoogle = async () => {
        await signInWithPopup(auth, provider);
        navigate("/")
    }

    return (
        <section className="login-page">
            <article>
                <button onClick={signUpWithGoogle}>
                    <FcGoogle/>
                    Sign in with Google
                </button>
            </article>
        </section>
    )
}