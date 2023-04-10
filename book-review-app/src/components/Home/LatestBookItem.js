import { memo } from "react";
import { Link } from "react-router-dom";

const LatestBookItem = ({
    _id,
    title,
    imageUrl,
    rating,
    onLikeClick,
}) => {
    let starRating = [];
    for (let i = 0; i < rating; i++) {
        starRating.push(<span key={i.toString()}>☆</span>);
    }

    return (
        <article className="featured-book-info">
            <img className="featured-img-thumbnail" alt={title} src={imageUrl} />
            <div className="body-wrap">
                <h3>{title}</h3>
                <div className="rating">
                    {starRating}
                </div>
                <div className="buttons-group">
                    <button className="star-button" onClick={()=>onLikeClick(_id)}><i className="fa-regular fa-star fa-sm"></i>Like</button>
                    <Link to={`/catalog/${_id}`} className="details-btn"><i className="fa-solid fa-circle-info fa-sm"></i>Details</Link>
                </div>
            </div>
        </article>
    );
};

export default memo(LatestBookItem);