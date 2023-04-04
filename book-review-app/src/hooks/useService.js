import { useContext } from "react";

import { AuthContext } from "../contexts/authContext";

export const useService = (serviceFactory) => {
    const { token } = useContext(AuthContext);

    const service = serviceFactory(token);

    return service;
};