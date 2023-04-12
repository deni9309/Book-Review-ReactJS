import { useBookContext } from "../../contexts/bookContext";
import { Search } from "../Search/Search";
import { CatalogItem } from "./CatalogItem/CatalogItem";

export const Catalog = () => {
    const { books } = useBookContext();

    return (
        <section id="catalog-page">
            <h1>All Book Reviews</h1>
            <Search />
            <div className="allBooks">
                {books.map(x =>
                    <CatalogItem key={x._id} {...x} />
                )}
            </div>
            {books.length === 0 && (
                <p className="no-results">No book reviews yet.</p>
            )}
        </section>
    );
};