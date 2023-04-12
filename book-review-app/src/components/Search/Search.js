import { useState } from 'react';
import { useBookContext } from '../../contexts/bookContext';

export const Search = () => {
    const [criteria, setCriteria] = useState('all');
    const [search, setSearch] = useState('');
    const { filterBooks, clearFilters } = useBookContext();

    const onSearchChange = (e) => {
        setSearch(e.target.value);

        filterBooks(e.target.value, criteria);
    };

    const onSearchSubmit = (e) => {
        e.preventDefault();

        filterBooks(search, criteria);
    };

    const onSearchCriteriaChange = (e) => {
        setCriteria(e.target.value);

        filterBooks(search, e.target.value);
    };

    const onSearchFilterClear = () => {
        setSearch('');
        clearFilters();
    }

    return (
        <form className="search-form" onSubmit={onSearchSubmit}>
            <div className="search-input-container">
                <input
                    type="text"
                    placeholder="Search..."
                    name="search-input"
                    onChange={onSearchChange}
                    value={search}
                />
                {search.length > 0 &&
                    <button type="button" className="close-btn" onClick={onSearchFilterClear}>
                        <i className="fa fa-xmark-square fa-2x"></i>
                    </button>
                }
                <button type="submit" className="search-btn" title={`Select "Search By" option first.`}>
                    <i className="fa-solid fa-magnifying-glass fa-xl"></i>
                </button>
            </div>

            <div className="filter">
                <span>Search By</span>
                <select name="criteria" className="criteria" onChange={onSearchCriteriaChange}>
                    <option value="all">Not selected</option>
                    <option value="title">Book Title</option>
                    <option value="author">Book Author</option>
                    <option value="genre">Book Genre</option>
                </select>
            </div>
        </form>
    );
};