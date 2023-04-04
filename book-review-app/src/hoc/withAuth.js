import { useAuthContext } from "../contexts/authContext";

export const withAuth = (Component) => {
    const WrapperComponent = (props) => {
        const authContext = useAuthContext();
        
        return (
            <Component {...props} auth={authContext} />
        );
    };

    return WrapperComponent;
};