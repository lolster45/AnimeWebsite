import {useDispatch, useSelector} from "react-redux"
import "../../styles/Manga.scss"

//Components...
import { useParams, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Comment from "./comment";

//React Icons...
import {MdOutlineArrowBack} from "react-icons/md"
import {BsFillBookmarkDashFill} from "react-icons/bs"
import {AiFillStar} from "react-icons/ai"
import {SiMyanimelist} from "react-icons/si"

//Firebase...
import { auth, database } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { nameInput } from "../../store";



export default function MoreInfo() {
    //React router....
    const location = useLocation()
    const urlName = location.pathname.split("/")[2];

    //React redux...
    const dispatch = useDispatch()
    let nameTypeState = useSelector((state) => state.type.value.type)

    //Anonymis helpers...
    const {id} = useParams();
    const type = urlName == "manga" || urlName == "anime" ? urlName : "manga"

    //React state...
    const [user] = useAuthState(auth);

    const [result, setResult] = useState({});
    const [reviews, setReviews] = useState([]);

    const [loading, setLoading] = useState(false)
    const [loadingR, setLoadingR] = useState(false)


    useEffect(() => {
        if (!nameTypeState) {
            //console.log(location.pathname.split("/")[2].toString())
           dispatch(nameInput({type: urlName}))
        }
    }, [nameTypeState])

    useEffect(() => {
        getInfo()

        if (user){
            getUserBookMarks()
        }
        const timeOut = setTimeout(getReviews, 4000)
        return function ()  {
            clearTimeout(timeOut)
        }

    }, [id, nameTypeState])

    //Use this API for only Manga, Manhwa purposes...
    async function getInfo () {
        setLoading(true)
        const res = await fetch(`https://api.jikan.moe/v4/${type}/${id}/full`)
        const data = await res.json()
        setResult(data)
        setLoading(false)
    }

    const getReviews = async () => {
        setLoadingR(true)
        const response = await fetch(`https://api.jikan.moe/v4/${type}/${id}/reviews`)
        const reviewsData = await response.json()
        setReviews(reviewsData.data)
        setLoadingR(false)
    }

    //-----------------------------------------------

    const [userBM, setUserBM] = useState([]);
    
    
    const addUserBookMark = async () => {
        const docRef = doc(database, "userInfo", user?.uid)

        if (!userBM.includes(result.data.title)) {

            await updateDoc(docRef, {
                userBookmarks: arrayUnion({
                    mal_id: result.data.mal_id,
                    type: nameTypeState,
                    title: result.data.title,
                    image: result.data?.images?.jpg?.large_image_url,
                    synopsis: result.data.synopsis,
                    score: result.data.score,
                    status: result.data.status
                })
            }) 
            setUserBM(prev => prev ? [...prev, result.data.title] : [result.data.title])


        } else {
            await updateDoc(docRef, {
                userBookmarks: arrayRemove({
                    mal_id: result.data.mal_id,
                    type: nameTypeState,
                    title: result.data.title,
                    image: result.data?.images?.jpg?.large_image_url,
                    synopsis: result.data.synopsis,
                    score: result.data.score,
                    status: result.data.status
                })
            });
            setUserBM(prev => prev.filter(item => item !== result.data.title));
            
        }
    }

    
    const getUserBookMarks = async () => {
        const bookmark = doc(database, "userInfo", user?.uid)
        const data = await getDoc(bookmark)
        setUserBM(data.data().userBookmarks.map(doc => doc.title))
    }

    const none = "No info..."

    
    return (
        <section>
            <Link to={-1} className="back-arrow">
                <MdOutlineArrowBack/>
            </Link>
            {loading && <h1>Loading...</h1>}
            {!loading && result.data &&(
                <div className="more-info-card">
                    <img src={result.data?.images?.jpg?.large_image_url} alt="picture of the work you are looking at"/>
                    <h2>{result.data.title}</h2>
                    {user &&
                    <button onClick={addUserBookMark} className="bookmark-btn">
                        {userBM.includes(result.data.title) ? <BsFillBookmarkDashFill/> : "Add to Bookmarks"}
                    </button>}
                    <a href={result.data.url} target="_blank">
                        <button style={{
                            backgroundColor: "#2E51A2", 
                            color: "white", 
                            height: "35px", 
                            width: "200px", 
                            cursor: "pointer", 
                            marginBottom: "10px"
                        }}>
                            <SiMyanimelist style={{fontSize: "20px"}}/>
                        </button>
                    </a>
                    <p style={{display: "flex", alignItems: "center"}}>
                        <AiFillStar style={{color: "yellow", fontSize: "18px", marginRight: "2px"}}/>
                        {result.data.score}
                    </p>
                    <div className="tags">
                        {result.data.genres[0] && <span>{result.data.genres[0]?.name}</span>}
                        {result.data.genres[1] && <span>{result.data.genres[1]?.name}</span>}
                        {result.data.genres[2] && <span>{result.data.genres[2]?.name}</span>}
                    </div>          
                    <h3>Synopsis:</h3>
                    <p>{result.data.synopsis}</p>
                </div>
                )
            }
            <section className="details">
                <h2>Details</h2>
                <ul className="more-details">
                    <li>Release: {result.data?.year}</li>
                    <li>{
                        `Aired: ${new Date(result.data?.aired?.from).toLocaleString()} - ${new Date(result.data?.aired?.to).toLocaleString()}`} 
                    </li>
                    <li>Rating: {result.data?.rating}</li>
                    <li>Status: {result.data?.status}</li>
                </ul>
                <article className="more-details">

                </article>
            </section>
            <section className="comment-reviews">
                <h2>Reviews</h2>
                {loadingR && <h1>Loading...</h1>}
                {!loadingR && reviews?.map((review,i) => (
                        <Comment
                            key={i}
                            image={review.user.images.jpg.image_url}
                            data= {review.date}
                            review = {review.review}
                            score = {review.score}
                            user = {review.user.username}
                        />
                    ))
                }
                {reviews.length === 0 && <h4>No Reviews...</h4>}
            </section>
        </section>
    )
}