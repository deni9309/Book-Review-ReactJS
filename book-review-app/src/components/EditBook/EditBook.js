import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useForm } from "../../hooks/useForm";
import { useService } from "../../hooks/useService";
import { useBookContext } from "../../contexts/bookContext";
import { bookServiceFactory } from "../../services/bookService";

export const EditGame = () => {
    const { bookId } = useParams();
    const bookService = useService(bookServiceFactory);
    const { onBookEditSubmit } = useBookContext();
    const { values, changeHandler, onSubmit, changeValues } = useForm({
        _id: '',
        title: '',
        author: '',
        imageUrl: '',
        genre: '',
        publisher: '',
        price: '',
        summary: '',
    }, onBookEditSubmit);

    useEffect(() => {
        bookService.getOne(bookId)
            .then(result => {
                changeValues(result);
            });
    }, [bookId]);

    return (
        <section id="edit-page" className="auth">
            <form id="edit" method="post" onSubmit={onSubmit}>
                <div className="container">
                    <h1>Edit Book</h1>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={values.title}
                        onChange={changeHandler}
                        required
                    />
                    <label htmlFor="author">Author:</label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        value={values.author}
                        onChange={changeHandler}
                        required
                    />
                    <label htmlFor="book-img">Image URL:</label>
                    <input
                        type="text"
                        id="imageUrl"
                        name="imageUrl"
                        value={values.imageUrl}
                        onChange={changeHandler}
                        required
                    />
                    <label htmlFor="genre">Genre:</label>
                    <input
                        type="text"
                        id="genre"
                        name="genre"
                        value={values.genre}
                        onChange={changeHandler}
                        required
                    />
                    <label htmlFor="publisher">Publisher:</label>
                    <input
                        type="text"
                        id="publisher"
                        name="publisher"
                        value={values.publisher}
                        onChange={changeHandler}
                        required
                    />                  
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        min={0.00}
                        step="any"
                        value={values.price}
                        onChange={changeHandler}
                        required
                    />                 
                    <label htmlFor="summary">Summary:</label>
                    <textarea
                        name="summary"
                        id="summary"
                        value={values.summary}
                        onChange={changeHandler}
                        required
                    ></textarea>
                    <input className="btn submit" type="submit" defaultValue="Edit Book" />
                </div>
            </form>
        </section>
    );
}