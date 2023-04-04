import { Link } from "react-router-dom";

export const CatalogItem = ({
    _id,
    title,
    imageUrl,
    author,
}) => {
    return (
        <div className="allBooks-info">
            <img src={imageUrl} />
            <h2>{title}</h2>
            <h3>{author}</h3>
            <Link to={`/catalog/${_id}`} className="details-button">Details</Link>
        </div>
    );
};