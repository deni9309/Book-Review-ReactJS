import { useEffect, useReducer, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import { bookServiceFactory } from '../../services/bookService';
import * as commentService from '../../services/commentService';
import { useAuthContext } from "../../contexts/authContext";
import { useService } from "../../hooks/useService";
import { bookReducer } from "../../reducers/bookReducer";

import { AddComment } from "./AddComment/AddComment";
import { useBookContext } from "../../contexts/bookContext";


export const BookDetails = () => {
    const { bookId } = useParams();
    const { userId, isAuthenticated, email } = useAuthContext();
    //  const [book, setBook] = useState({});
    const { deleteBook } = useBookContext();
    const bookService = useService(bookServiceFactory);
    const navigate = useNavigate();
    const [book, dispatch] = useReducer(bookReducer, {});

    // useEffect(() => {
    //     Promise.all([
    //         bookService.getOne(bookId),
    //         commentService.getAll(bookId),
    //     ])
    //         .then(([bookData, comments]) => {
    //             setBook({
    //                 ...bookData,
    //                 comments,
    //             });
    //         });
    // }, [bookId]);

    useEffect(() => {
        Promise.all([
            bookService.getOne(bookId),
            commentService.getAll(bookId),
        ]).then(([bookData, comments]) => {
            const bookState = {
                ...bookData,
                comments,
            };

            dispatch({
                type: 'BOOK_FETCH',
                payload: bookState
            });
        });
    }, [bookId]);

    const onCommentSubmit = async (values) => {
        const response = await commentService.create(bookId, values.comment);

        dispatch({
            type: 'COMMENT_ADD',
            payload: response,
            email,
        });
        // setBook(state => ({
        //     ...state,
        //     comments: [
        //         ...state.comments,
        //         {
        //             ...response,
        //             author: {
        //                 email,
        //             }
        //         }
        //     ],
        // }));
    };

    const isOwner = book._ownerId === userId;

    const onDeleteClick = () => {
        // eslint-disable-next-line no-restricted-globals
        const isConfirmed = confirm(`Are you sure you want to delete ${book.title}?`);

        if (isConfirmed) {
            bookService.delete(book._id);

            deleteBook(book._id);

            navigate('/catalog');
        }
    };

    return (
        <section id="book-details">
            <h1>Book Details</h1>
            <div className="info-section">

                <article>
                    <div className="book-header">
                        <img className="book-img" src={book.imageUrl} />
                        <h1>{book.title}</h1>
                        <p className="label">Author: <span className="info">{book.author}</span></p>
                        <p className="label">Genre: <span className="info">{book.genre}</span></p>
                        <p className="label">Publisher: <span className="info">{book.publisher}</span></p>
                        <p className="label">Price: <span className="info price">{book.price}</span></p>
                    </div>
                    <p className="text book-summary">{book.summary}</p>
                </article>
                <div className="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        {book.comments && book.comments.map(x => (
                            <li key={x._id} className="comment">
                                <p>{x.author.email}: {x.comment}</p>
                            </li>
                        ))}
                    </ul>

                    {!book.comments?.length && (
                        <p className="no-comment">No comments.</p>
                    )}
                </div>

                {isOwner && (
                    <div className="buttons">
                        <Link to={`/catalog/${book._id}/edit`} className="button">Edit</Link>
                        <button onClick={onDeleteClick} className="button">Delete</button>
                    </div>
                )}
            </div>
            {isAuthenticated && <AddComment onCommentSubmit={onCommentSubmit} />}
        </section>
    );
};