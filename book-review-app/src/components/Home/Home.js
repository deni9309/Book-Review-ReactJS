import { useState, useEffect } from "react";
import { useBookContext } from "../../contexts/bookContext";

export const Home = () => {

    const [latestBooks, setLatestBooks] = useState([]);
    const { books } = useBookContext();
    // useEffect(() => {
    //     fetch('http://localhost:3030/data/books')
    //         .then(response => response.json())
    //         .then(data => {
    //             setLatestBooks(Object.values(data.result));
    //         });
    // });

    console.log(books);

    return (
        <section id="featured-container">
            <div className="featured-section">
                <h2>Book Review</h2>
                <h3>All Books you must read</h3>
            </div>

            <div id="home-page">
                <h1>Latest Book Reviews</h1>
                <div className="featured-books">
                    {books?.map(book => (
                        <article key={book._id} className="featured-book-info">
                            <img className="featured-img-thumbnail" src={book.imageUrl} />
                            <div className="body-wrap">
                                <h3>{book.title}</h3>
                                <div className="rating">
                                    <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
                                </div>
                                <div className="data-buttons">
                                    <a href="#" className="btn details-btn">Details</a>
                                </div>
                            </div>
                        </article>
                    ))}
                    {books.length === 0 &&
                        <p className="no-articles">No book reviews yet.</p>
                    }
                </div>
            </div>
        </section>
    );
};