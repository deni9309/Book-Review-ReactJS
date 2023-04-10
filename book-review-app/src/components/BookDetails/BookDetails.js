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
    }, [bookService, bookId]);

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
            <article className="details">
                <img className="book-img" alt={book.title} src={book.imageUrl} />
                <div className="book-info">
                    <h2>{book.title}</h2>

                    <div className="info-group">
                        <p className="label">Author: </p>
                        <p className="info">{book.author}</p>
                    </div>
                    <div className="info-group">
                        <p className="label">Genre: </p>
                        <p className="info">{book.genre}</p>
                    </div>
                    <div className="info-group">
                        <p className="label">Publisher: </p>
                        <p className="info">{book.publisher}</p>
                    </div>
                    <div className="info-group">
                        <p className="label">Price: </p>
                        <p className="info price">${book.price}</p>
                    </div>
                </div>
                <div className="info-group">
                    <p className="book-summary">{book.summary}</p>
                </div>
                {isOwner && (
                    <div className="buttons">
                        <Link to={`/catalog/${book._id}/edit`} className="edit-button"><i className="fa fa-file-pen fa-sm"></i>Edit</Link>
                        <button onClick={onDeleteClick} className="delete-button"><i className="fa fa-trash-alt fa-sm"></i>Delete</button>
                    </div>
                )}
            </article>

            <article>
                <div className="comments-info">
                    <h2>Comments:</h2>
                    <ul className="details-comments">
                        {book.comments && book.comments.map(x => (
                            <li key={x._id} className="comment">
                                <p className="author">{x.author.email}</p>
                                <p className="post">{x.comment}</p>
                            </li>
                        ))}
                    </ul>
                    {!book.comments?.length && (
                        <p className="no-comments">No comments.</p>
                    )}        
                </div>
            </article>
            {isAuthenticated && <AddComment onCommentSubmit={onCommentSubmit} />}
        </section>
    );
};