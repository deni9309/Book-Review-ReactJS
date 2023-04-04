import { useBookContext } from "../../contexts/bookContext";
import { CatalogItem } from "./CatalogItem/CatalogItem";

export const Catalog = () => {
    const { books } = useBookContext();

    return (
        <section id="catalog-page">
            <h1>All Book Reviews</h1>
            <div className="allBooks">
                {books.map(x =>
                    <CatalogItem key={x._id} {...x} />
                )}

                {books.length === 0 && (
                    <h3 className="no-articles">No articles yet</h3>
                )}
            </div>
        </section>
    );
};