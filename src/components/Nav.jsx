//Components...
import { useState } from "react"
import {Link} from "react-router-dom"
import {auth} from "../config/firebase"
import {signOut} from "firebase/auth"
import {useAuthState} from "react-firebase-hooks/auth"


//Styles...
import "../styles/Nav.scss"

//React Icons...
import {AiFillHome, AiOutlineClockCircle} from "react-icons/ai"
import {BsCompass, BsJournalBookmarkFill} from "react-icons/bs"
import {FaDiscord} from "react-icons/fa"
import {IoLogOutOutline} from "react-icons/io5"
import {IoIosLogIn} from "react-icons/io"


import { useDispatch } from "react-redux"
import { nameInput } from "../store"



export default function Nav () {
    const dispatch = useDispatch()
    const [user] = useAuthState(auth)
    const [active, setActive] = useState("home")

    const activeNav = (navLink) => {
        setActive(navLink)
    }

    const userSignOut = async () => {
        await signOut(auth)
    }

    const handleAnimeClick = (e) => {
        //localStorage.setItem("currentAnimePage", "1")
        dispatch(nameInput({type: "anime"}))
        //console.log("it works")
    }
    

    return (
        <section className="home-nav">
            <h1>LOGO</h1>
            <nav>
                <h2>MENU</h2>
                <ul>
                    <Link 
                        to="/"
                        onClick={() => activeNav("home")} 
                        className={`menu-item ${active === "home" ? "active" : ""}`} 
                    >
                        <AiFillHome className={`icon ${active === "home" ? "active": ""}`}/>Home
                    </Link>
                    <Link 
                        to="/discovery/anime"
                        onClick={() => {
                            activeNav("discovery")
                            handleAnimeClick()
                        }} 
                        className={`menu-item ${active === "discovery" ? "active" : ""}`} 
                    >
                        <BsCompass className={`icon ${active === "discovery" ? "active": ""}`}/>Discovery
                    </Link>
                    {user &&
                        <Link 
                            to="/community"
                            onClick={() => activeNav("community")} 
                            className={`menu-item ${active === "community" ? "active" : ""}`} 
                        >
                            <FaDiscord className={`icon ${active === "community" ? "active": ""}`}/>Community
                        </Link>
                    }
                </ul>
            </nav>
            <nav>
                <h2>LIBRARY</h2>
                <ul>
                    {/* <Link className={`menu-item ${active === "recent" ? "active" : ""}`} onClick={() => activeNav("recent")} to="/recent">
                        <AiOutlineClockCircle className={`icon ${active === "recent" ? "active": ""}`}/>
                        Recent
                    </Link> */}
                    <Link 
                        to="/bookmarks"
                        onClick={() => {
                            activeNav("bookmarks")
                        }} 
                        // className={`menu-item ${active === "collection" ? "active" : ""}`} 
                    >
                        <BsJournalBookmarkFill className={`icon ${active === "bookmarks" ? "active": ""}`} />
                        BookMarks
                    </Link>   
                </ul>
            </nav>
            <nav className="user-account">
                {!user && 
                    <div>
                        <Link className="login-button" to="/login"><IoIosLogIn/>Login</Link>
                    </div>
                }
                {user && (
                    <button onClick={userSignOut} className="userStatusBtn"><IoLogOutOutline/>Log out</button>
                )}
            </nav>
        </section>
    )
}