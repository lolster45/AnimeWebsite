//React hook form library components...
import {useForm} from "react-hook-form"
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"

//Firebase...
import {addDoc, collection} from "firebase/firestore"
import {database, auth} from "../../config/firebase"
import { useAuthState } from "react-firebase-hooks/auth"

//Styles...
import "../../styles/Form.scss"



export default function CreatePosts () {

    const [user] = useAuthState(auth)
    
    const schema = yup.object().shape({
        title: yup.string().required("You must add a title."),
        description: yup.string().required("You must add a description.")
    })

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
    })

    const postReference = collection(database, "userPosts")

    const CreatePost = async (data) => {
        await addDoc(postReference, {
            ...data,
            username: user?.displayName,
            userId: user?.uid,
            userImg: user.photoURL
        })
    }

    return (
        <form className="community-form" onSubmit={handleSubmit(CreatePost)}>
            <input className="input" placeholder="Title..." {...register("title")}/>
                <p style={{color: "red"}}>{errors.title?.message}</p>
            <textarea placeholder="Description..." {...register("description")}/>
                <p style={{color: "red"}}>{errors.description?.message}</p>
            <input className="submit-btn" type="submit"/>
        </form>
    )
}