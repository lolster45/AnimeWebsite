//React...
import { useState, useEffect } from "react"

//React-router...
import {useNavigate} from "react-router-dom"

//Firebase...
import {auth, database} from "../../../config/firebase"
import {addDoc, collection, getDocs, query, where, deleteDoc, doc} from "firebase/firestore"
import {useAuthState} from "react-firebase-hooks/auth"

//React icons...
import {AiOutlineHeart, AiFillHeart} from "react-icons/ai"

//Styles...
import "../../../styles/Community.scss"

export default function Post (props) {
    const {post} = props
    const [user] = useAuthState(auth)
    const [likeAmount, setLikeAmount] = useState(null)
    const navIfLogOut = useNavigate()
    
    if (!user) {
        navIfLogOut("/")
    }

   //Gets the likes from Firebase/Firestore by getting the length of the array which corresponds to the post which has objects that contain the userId and postId in it. The length represent how many people have clicked on the heart/liked the post.
    const LikesReference = collection(database, "likes");
    const likesDoc = query(LikesReference, where("postId", "==", post.id))

    const getLikes = async () => {
        const data = await getDocs(likesDoc)
        setLikeAmount(data.docs.map(doc => ({userId: doc.data().userId, likeId: doc.id})))
    }

    const addLike = async () => {
        try {
            const newDoc = await addDoc(LikesReference, {userId: user?.uid, postId: post.id})
    
            if (user) {
                setLikeAmount(
                    prev => prev 
                        ? [...prev, {userId: user?.uid, likeId: newDoc.id}] 
                        : {userId: user?.uid, likeId: newDoc.id})
            }  
        } catch (error) {
            console.log("error....")
        }
    }

    const removeLike = async () => {
        try {
            console.log("deleting...")
            const likeToDeleteQuery = query(LikesReference, 
                where("postId", "==", post.id), 
                where("userId", "==", user?.uid)
            )

            const likeToDeleteData = await getDocs(likeToDeleteQuery)
            const likeId = likeToDeleteData.docs[0].id;
            const actualDeleteData = doc(database, "likes", likeId)
            await deleteDoc(actualDeleteData)
    
            if (user) {
                setLikeAmount(prev => prev && prev.filter(item => item.likeId !== likeId))
            }  
            
        } catch (error) {
            console.log("error....")
        }
    }

    //Checks if the user has previously liked the same post...
    const hasLikedPost = likeAmount?.find(like => like.userId === user?.uid)

    useEffect(() => {
        getLikes()
    }, [])
    //------------------------------------------

    return (
        <article className="user-post">
            <div>
                <img src={post.userImg} alt="profile picture of user"/>
                {post.username}
            </div>
            <h1>{post.title}</h1>
            <p>{post.description}</p>


            <button onClick={hasLikedPost ? removeLike : addLike} className="likes">
                {!hasLikedPost && <AiOutlineHeart className="no-like"/>}
                {hasLikedPost && <AiFillHeart className="yes-like"/>}
                {likeAmount && likeAmount?.length}
            </button>
            {/* <button onClick={addLike} className="likes">
                {!hasLikedPost && <AiOutlineHeart className="no-like"/>}
                {hadLikedPost && <AiFillHeart className="yes-like"/>}
                {likeAmount && likeAmount?.length}
            </button> */}
        </article>
    )
}