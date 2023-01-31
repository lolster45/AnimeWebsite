//Components..
import { useEffect } from "react"
import { Link } from "react-router-dom"


//React-carousel...
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

//Home data...
import {settings, images, manhwa} from "./Home-data"


//firebase...
import {auth, database} from "../config/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { setDoc, doc, getDoc } from "firebase/firestore"

//Styles...
import "../styles/subHome.scss"
import MobileNav from "../pages/Mobile-nav"



export default function Home () {
    const [user] = useAuthState(auth)
    //const dispatch = useDispatch();


    const handleAnimeClick = (e) => {
        localStorage.setItem("currentAnimePage", "1")
        //dispatch(nameInput({type: e.currentTarget.getAttribute("data-name")}))
    }
    const handleMangaClick = (e) => {
        localStorage.setItem("currentAnimePage", "1")
        //dispatch(nameInput({type: e.currentTarget.getAttribute("data-name")}))
    }

    const createUserInfo = async () => {
        await setDoc(doc(database, "userInfo", user?.uid), {
            userId: user?.uid,
            userBookmarks: []
        });
    }

    const haveAccount = async () => {
        try {
            const res = await getDoc(doc(database, "userInfo", user?.uid))
            if (!res?.data()) {
                createUserInfo()
            }
        } catch (error) {
            return;
        }
    }
    
    
    useEffect(() => {
        haveAccount()
    }, [])

    return (
        <section className="subHome-page">
            <MobileNav/>
            <h1 className="trending-title">Trending</h1>
            <div className="image-gradient">
                <img className="main-image" src="https://i0.wp.com/anitrendz.net/news/wp-content/uploads/2021/07/Vinland-Saga-Season-2-e1625659396193.png?fit=1001%2C562&ssl=1" alt="image of vinland sage show"/>
                <h2 className="main-title">Vinland Saga Season 2</h2>
                <Link 
                    to="discovery/anime/moreInfo/49387"
                    data-name="anime"
                    className="more-info-btn" 
                    onClick={handleAnimeClick}
                >
                    More Info
                </Link>
            </div>
            <div className="mobile-pic">
                <img src="https://i0.wp.com/anitrendz.net/news/wp-content/uploads/2021/07/Vinland-Saga-Season-2-e1625659396193.png?fit=1001%2C562&ssl=1"/>
            </div>
            <h1 className="rec-title">Anime for you:</h1>
            <Slider {...settings} className="slider" id="sliderId">
                {
                    images.map((item,i) => (
                        <Link 
                            key={i} 
                            to={`discovery/anime/moreInfo/${item.id}`}
                            data-name="anime"
                        >
                            <img src={item.image}/>
                        </Link>
                    ))
                }
            </Slider>
            <h1 className="rec-title">Manhwa</h1>
            <Slider {...settings} className="slider">
                {
                    manhwa.map((item,i) => (
                        <Link 
                            key={i} 
                            to={`discovery/manga/moreInfo/${item.id}`}
                            onClick={handleAnimeClick} 
                            data-name="manga"
                        >
                            <img src={item.image}/>
                        </Link>
                    ))
                }
            </Slider>
        </section>
    )
}



  // <section className="home-page">
        //     <nav>
        //         <Link to="/">Home</Link>
        //         <Link onClick={handleAnimeClick} data-name="anime" to="anime">Anime</Link>
        //         <Link onClick={handleMangaClick} data-name="manga" to="manga">Manga</Link>
        //     </nav>
        //     <section className="home-routes">
       
        //         <Outlet/>
        //     </section>
        // </section>