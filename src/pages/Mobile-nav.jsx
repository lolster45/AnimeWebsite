//React-router...
import { Link } from "react-router-dom"

//Styles...
import "../styles/subHome.scss"

//React icons...
import {RxHamburgerMenu} from "react-icons/rx"

export default function MobileNav () {

    const handleHamburger = (e) => {
        e.target.nextSibling.classList.toggle("active");
    }

    return (
        <nav className="mobile-nav">
            <RxHamburgerMenu className="hamburger" onClick={handleHamburger}/>
            <div className="mobile-bg">
                <ul>
                    <Link to="/">Home</Link>
                    <Link to="/discovery/anime">Discovery</Link>
                    <Link to="/community">Community</Link>
                    <Link to="/bookMarks">Bookmarks</Link>
                </ul>
            </div>
        </nav>
    )
}