import { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../contexts/authContext";

export const Header = () => {
    const { isAuthenticated, email } = useContext(AuthContext);

    return (
        <header id="header">
            <h1><Link className="home" to="/">Book Review</Link></h1>
            {isAuthenticated && (<span>Hello, {email}!</span>)}
            <nav>
                <Link className="nav-link" to="/catalog">All Books</Link>
                {isAuthenticated && (
                    <div id="user">
                        <Link className="nav-link" to="/create-review">Create Book Review</Link>
                        <Link className="nav-link" to="/logout">Logout</Link>
                    </div>
                )}
                {!isAuthenticated && (
                    <div id="guest">
                        <Link className="nav-link" to="/login">Login</Link>
                        <Link className="nav-link" to="/register">Register</Link>
                    </div>
                )}
            </nav>
        </header>
    );
};