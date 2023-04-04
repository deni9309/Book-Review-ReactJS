import { useState, useEffect, createContext, useContext } from "react";
import { useNavigate } from 'react-router-dom';

import { bookServiceFactory } from '../services/bookService';

export const BookContext = createContext();

export const BookProvider = ({
    children,
}) => {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const bookService = bookServiceFactory();  //auth.accessToken

    useEffect(() => {
        bookService.getAll()
            .then(result => {
                setBooks(result);
            })
    }, []);

    const getBook = (bookId) => {
        return books.find(x => x._id === bookId);
    };

    const onCreateBookSubmit = async (data) => {
        const newBook = await bookService.create(data);

        setBooks(state => [newBook, ...state]);

        navigate('/catalog');
    };

    const onBookEditSubmit = async (values) => {
        const result = await bookService.edit(values._id, values);

        setBooks(state => state.map(x => x._id === values._id ? result : x));

        navigate(`/catalog/${values._id}`);
    };

    const deleteBook = (bookId) => {
        setBooks(state => state.filter(x => x._id !== bookId));
    };

    const contextValues = {
        books,
        getBook,
        onCreateBookSubmit,
        onBookEditSubmit,
        deleteBook,
    };

    return (
        <BookContext.Provider value={contextValues}>
            {children}
        </BookContext.Provider>
    );
};

export const useBookContext = () => {
    const context = useContext(BookContext);

    return context;
};