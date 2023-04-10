import { useBookContext } from "../../contexts/bookContext";
import LatestBookItem from "./LatestBookItem";

export const Home = () => {
    const { latestBooks, onLikeClick } = useBookContext();

    return (
        <section id="featured-container">
            <div className="featured-section">
                <h2>Book Review</h2>
                <h3>All Books you must read</h3>
            </div>

            <div id="home-page">
                <h1>Latest Book Reviews</h1>
                <div className="featured-books">
                    {latestBooks?.map(book =>
                        <LatestBookItem key={book._id} {...book} onLikeClick={onLikeClick} />
                    )}
                </div>
                {latestBooks.length === 0 &&
                    <p className="no-results">No book reviews yet.</p>
                }
            </div>
        </section>
    );
};