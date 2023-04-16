import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useLocalStorage } from "../hooks/useLocalStorage";
import { useForm } from "../hooks/useForm";
import { authServiceFactory } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({
    children,
}) => {
    const [auth, setAuth] = useLocalStorage('auth', {});
    const navigate = useNavigate();
    const { resetForm } = useForm();
    const authService = authServiceFactory(auth.accessToken);

    const onLoginSubmit = async (data) => {
        try {
            const result = await authService.login(data);
            setAuth(result);

            resetForm();

            navigate('/catalog');
        } catch (error) {
            console.log(error);
            alert("Email and Password don't match!")
            throw error;
        }
    };

    const onRegisterSubmit = async (values, formErrors) => {
        const { confirmPassword, ...registerData } = values;

        if (confirmPassword !== registerData.password) {
            alert('Passwords don\'t match!');
            return;
        }

        try {
            if (Object.values(formErrors).length === 0) {         
                const result = await authService.register(registerData);
                if (result.status === 409) {
                    throw new Error(result);
                }

                setAuth(result);
                resetForm();

                navigate('/catalog');
            }
        } catch (err) {
            alert(err.message);
        }
    };

    const onLogout = async () => {
        await authService.logout();
        setAuth({});
    };

    const contextValues = {
        onLoginSubmit,
        onRegisterSubmit,
        onLogout,
        userId: auth._id,
        token: auth.accessToken,
        email: auth.email,
        isAuthenticated: !!auth.accessToken,
    };

    return (
        <>
            <AuthContext.Provider value={contextValues}>
                {children}
            </AuthContext.Provider>
        </>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    return context;
};