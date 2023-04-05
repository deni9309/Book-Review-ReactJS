import { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../contexts/authContext";

export const Header = () => {
    const { isAuthenticated, email } = useContext(AuthContext);

    return (
        <header id="header">
            <h1><Link className="home" to="/">Book Review</Link></h1>
            <nav>
                {isAuthenticated && (<span className="nav-link msg">Hello, {email}!</span>)}
                <Link className="nav-link" to="/catalog"><i className="fa fa-book-open"></i>All Books</Link>
                {isAuthenticated && (
                    <>
                        <Link className="nav-link" to="/create-review"><i className="fa-regular fa-square-plus"></i>Create Book Review</Link>
                        <Link className="nav-link" to="/logout"><i className="fa-solid fa-arrow-right-from-bracket"></i>Logout</Link>
                    </>
                )}
                {!isAuthenticated && (
                    <>
                        <Link className="nav-link" to="/login"><i className="fa-solid fa-arrow-right-to-bracket"></i>Login</Link>
                        <Link className="nav-link" to="/register"><i className="fa-solid fa-user-plus"></i>Register</Link>
                    </>
                )}
            </nav>
        </header>
    );
};