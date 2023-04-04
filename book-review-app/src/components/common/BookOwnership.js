import { Navigate, Outlet, useParams } from "react-router-dom";

import { useBookContext } from "../../contexts/bookContext";
import { useAuthContext } from "../../contexts/authContext";

export const BookOwnership = ({
    children,
}) => {
    const { bookId } = useParams();
    const { getBook } = useBookContext();
    const { userId } = useAuthContext();

    const currentGame = getBook(bookId);

    if (currentGame && currentGame._ownerId !== userId) {
        return <Navigate to={`/catalog/${bookId}`} replace />
    }

    return children ? children : <Outlet />
};