export const Search = () => {
    return (
        <form className="search-form">
            <div className="search-input-container">
                <input type="text" placeholder="Search..." name="search-input" />
                <button className="close-btn">
                    <i className="fa fa-xmark-square fa-2x"></i>
                </button>

                <button className="search-btn" title={`Select "Search By" option first.`}>
                    <i className="fa-solid fa-magnifying-glass fa-xl"></i>
                </button>
            </div>

            <div className="filter">
                <span>Search By</span>
                <select name="criteria" className="criteria">
                    <option>Not selected</option>
                    <option>Book Title</option>
                    <option>Book Author</option>
                    <option>Book Genre</option>
                </select>
            </div>
        </form>
    );
};