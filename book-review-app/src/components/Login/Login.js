import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/authContext";
import { useForm } from "../../hooks/useForm";

const LoginFormKeys = {
    Email: 'email',
    Password: 'password',
};

export const Login = () => {    // {auth} ->pass it as props for using hoc
    // const { onLoginSubmit } = auth;

    const { onLoginSubmit } = useAuthContext(); // using custom hook here (no need to import 'useContext')
    const { values, changeHandler, onSubmit } = useForm({
        [LoginFormKeys.Email]: '',
        [LoginFormKeys.Password]: '',
    }, onLoginSubmit);

    return (
        <section id="login-page" className="auth">
            <form id="login" method="post" onSubmit={onSubmit}>

                <div className="container">
                    <h1>Login</h1>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name={LoginFormKeys.Email}
                        value={values[LoginFormKeys.Email]}
                        placeholder="Sokka@gmail.com"
                        onChange={changeHandler}
                    />

                    <label htmlFor="login-pass">Password:</label>
                    <input
                        type="password"
                        id="login-password"
                        name={LoginFormKeys.Password}
                        value={values[LoginFormKeys.Password]}
                        onChange={changeHandler}
                    />
                    <input type="submit" className="btn submit" value="Login" />
                    <p className="field">
                        <span>If you don't have profile click <Link to="/register"><strong>HERE</strong></Link></span>
                    </p>
                </div>
            </form>
        </section>
    );
};