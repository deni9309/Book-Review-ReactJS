import { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../contexts/authContext";
import { useForm } from "../../hooks/useForm";

export const Register = () => {
    const { onRegisterSubmit } = useContext(AuthContext);
    const { values, changeHandler, onSubmit, formValidate } = useForm({
        email: '',
        password: '',
        confirmPassword: '',
    }, onRegisterSubmit);

    return (
        <section id="register-page" className="content auth">
            <form id="register" method="post" onSubmit={onSubmit}>
                <div className="container">
                    <h1>Register</h1>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="maria@email.com"
                        value={values.email}
                        onChange={changeHandler}
                        required
                    />
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={values.password}
                        onChange={changeHandler}
                        onBlur={formValidate}
                        minLength={3}
                        required
                    />           
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={values.confirmPassword}
                        onChange={changeHandler}
                        onBlur={formValidate}
                        minLength={3}
                        required
                    />           
                    <input className="btn submit" type="submit" value="Register" />
                    <p className="field">
                        <span>If you already have an account click <Link to="/login"><strong>HERE</strong></Link></span>
                    </p>
                </div>
            </form>
        </section>
    );
};