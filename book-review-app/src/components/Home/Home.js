export const Home = () => {
    return (
        <section id="featured-container">    
            <div className="featured-section">
                    <h2>All Books you must read are</h2>
                    <h3>Only in Book Review</h3>
                </div>
       
            {/* <img src="./images/hero-img.jpeg" alt="hero" /> */}

            <div id="home-page">
                <h1>Latest Book Reviews</h1>

                <div className="featured-books">
                    <article className="featured-book-info">
                        <img className="featured-img-thumbnail" src="./images/CoverFire.png" />
                        <div className="body-wrap">
                            <h3>Cover Fire</h3>
                            <div className="rating">
                                <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
                            </div>
                            <div className="data-buttons">
                                <a href="#" className="btn details-btn">Details</a>
                            </div>
                        </div>
                    </article>
                    <article className="featured-book-info">
                        <img className="featured-img-thumbnail" src="./images/ZombieLang.png" />
                        <div className="body-wrap">

                            <h3>Zombie Lang</h3>
                            <div className="rating">
                                <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
                            </div>
                            <div className="data-buttons">
                                <a href="#" className="btn details-btn">Details</a>
                            </div>
                        </div>
                    </article>
                    <article className="featured-book-info">
                        <img className="featured-img-thumbnail" src="./images/MineCraft.png" />
                        <div className="body-wrap">
                            <h3>MineCraft</h3>
                            <div className="rating">
                                <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
                            </div>
                            <div className="data-buttons">
                                <a href="#" className="btn details-btn">Details</a>
                            </div>
                        </div>
                    </article>

                    {/* <!-- Display paragraph: If there is no books  --> */}
                    <p className="no-articles">No book reviews yet.</p>
                </div>
            </div>
        </section>
    );
};