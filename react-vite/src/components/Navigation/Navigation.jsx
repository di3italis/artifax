import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import logo from "../../images/artifax-logo.webp";
import "./Navigation.css";
// import styles from "./Navigation.module.css";

function Navigation({ isLoaded }) {
    const sessionUser = useSelector((state) => state.session.user);

    return (
        <ul className="navContainer">
            <li>
                <NavLink to="/">
                    <div className="logoLink">
                        <img className="logo" src={logo} alt="logo" />
                    </div>
                </NavLink>
            </li>
            <ul className="navLinks">
                <li>
                    {sessionUser && (
                        <NavLink className="createFax" to="artifax/create">
                            Create a New Artifax
                        </NavLink>
                    )}
                </li>
                {isLoaded && (
                    <li>
                        <ProfileButton user={sessionUser} />
                    </li>
                )}
            </ul>
        </ul>
    );
}

export default Navigation;
