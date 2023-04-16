import { useState } from "react";

import { useBookContext } from "../../contexts/bookContext";
import { useForm } from "../../hooks/useForm";

export const CreateBook = () => {
    const { onCreateBookSubmit } = useBookContext();
    const { values, changeHandler, onSubmit, formValidate } = useForm({
        title: '',
        author: '',
        imageUrl: '',
        genre: '',
        publisher: '',
        price: '',
        summary: '',
    }, onCreateBookSubmit);

    return (
        <section id="create-page" className="auth">
            <form id="create" method="post" onSubmit={onSubmit}>
                <div className="container">
                    <h1>Create Book Review</h1>
                    
                    <label htmlFor="title">Title:</label>
                    <input
                        value={values.title}
                        onChange={changeHandler}
                        onBlur={formValidate}
                        minLength={2}
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Book title..."
                        required
                    />

                    <label htmlFor="author">Author:</label>
                    <input
                        value={values.author}
                        onChange={changeHandler}
                        onBlur={formValidate}
                        minLength={3}
                        type="text"
                        id="author"
                        name="author"
                        placeholder="Book author..."
                        required
                    />

                    <label htmlFor="imageUrl">Cover Image:</label>
                    <input
                        value={values.imageUrl}
                        onChange={changeHandler}
                        type="text"
                        id="imageUrl"
                        name="imageUrl" placeholder="Image URL..."
                        required
                    />

                    <label htmlFor="genre">Genre:</label>
                    <input
                        value={values.genre}
                        onChange={changeHandler}
                        onBlur={formValidate}
                        minLength={3}
                        type="text"
                        id="genre"
                        name="genre"
                        placeholder="Book genre..."
                        required
                    />
        
                    <label htmlFor="publisher">Publisher:</label>
                    <input
                        value={values.publisher}
                        onChange={changeHandler}
                        type="text"
                        id="publisher"
                        name="publisher"
                        placeholder="Book publisher......"
                        required
                    />

                    <label htmlFor="price">Price:</label>
                    <input
                        value={values.price}
                        onChange={changeHandler}
                        type="number"
                        id="price"
                        name="price"
                        min={0.00}
                        step="any"
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
                    
                    <input className="btn submit" type="submit" value="Create Book Review" />
                </div>
            </form>
        </section>
    );
};
