import { Link } from "react-router-dom";

export const CatalogItem = ({
    _id,
    title,
    imageUrl,
    author,
    genre,
}) => {
    return (
        <div className="allBooks-info">
            <img src={imageUrl} />
            <h2>{title}</h2>
            <h3>{author}</h3>
            <p className="book-genre">{genre}</p>
            <Link to={`/catalog/${_id}`} className="details-button"><i className="fa-solid fa-circle-info fa-sm"></i>Details</Link>
        </div>
    );
};