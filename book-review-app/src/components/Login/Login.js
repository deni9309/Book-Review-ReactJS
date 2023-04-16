import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/authContext";
import { useForm } from "../../hooks/useForm";

export const Login = () => {    

    const { onLoginSubmit } = useAuthContext(); // using custom hook here (no need to import 'useContext')
    const { values, changeHandler, onSubmit} = useForm({
        email: '',
        password: '',
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
                        name="email"
                        value={values.email}
                        placeholder="example@email.com"
                        onChange={changeHandler}
                        required
                    />

                    <label htmlFor="loginPassword">Password:</label>
                    <input
                        type="password"
                        id="loginPassword"
                        name="password"
                        value={values.password}
                        onChange={changeHandler}                     
                        required
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