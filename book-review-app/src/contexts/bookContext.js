import { useState, useEffect, createContext, useContext, useCallback } from "react";
import { useNavigate } from 'react-router-dom';

import { bookServiceFactory } from '../services/bookService';

export const BookContext = createContext();

export const BookProvider = ({
    children,
}) => {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [latestBooks, setLatestBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const bookService = bookServiceFactory();

    useEffect(() => {
        bookService.getAll()
            .then(result => {
                setBooks(result);
                setFilteredBooks(result);
            });
    }, []);

    useEffect(() => {
        bookService.getLatest()
            .then(result => {
                setLatestBooks(result.map(x => ({ ...x, rating: 0 })));
                setFilteredBooks(books);
            });
    }, [books]);

    const onLikeClick = useCallback((bookId) => {
        setLatestBooks(state => state.map(x => x._id === bookId
            ? { ...x, rating: x.rating < 5 ? x.rating + 1 : x.rating }
            : x
        ));
    }, []);

    const getBook = (bookId) => {
        return books.find(x => x._id === bookId);
    };

    const onCreateBookSubmit = async (data) => {
        const newBook = await bookService.create(data);

        setBooks(state => [newBook, ...state]);
        setFilteredBooks(books);

        navigate('/catalog');
    };

    const onBookEditSubmit = async (values) => {
        const result = await bookService.edit(values._id, values);

        setBooks(state => state.map(x => x._id === values._id ? result : x));
        setFilteredBooks(books);

        navigate(`/catalog/${values._id}`);
    };

    const deleteBook = (bookId) => {
        setBooks(state => state.filter(x => x._id !== bookId));
     
        setFilteredBooks(books);
    };

    const filterBooks = (searchString, criteria = 'all') => {
        if (criteria === 'all' || searchString === '') {
            setFilteredBooks(books);
        } else {
            setFilteredBooks(books.filter(b =>
                b[criteria].toLowerCase().includes(searchString.toLowerCase())));
        }
    };

    const clearFilters = () => {
        setFilteredBooks(books);
    };

    const contextValues = {
        books: filteredBooks,
        latestBooks,
        onLikeClick,
        getBook,
        onCreateBookSubmit,
        onBookEditSubmit,
        deleteBook,
        filterBooks,
        clearFilters,
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