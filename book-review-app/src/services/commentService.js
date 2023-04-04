import { requestFactory } from './requester'

const baseUrl = 'http://localhost:3030/data/comments';


// export const getAll = async (bookId) => {
//     const query = encodeURIComponent(`bookId="${bookId}"`);

//     const result = await request.get(`${baseUrl}?where=${query}`);
//     const comments = Object.values(result);

//     return comments;
// };

export const getAll = async (bookId) => {
    const request = requestFactory();
    const searchQuery = encodeURIComponent(`bookId="${bookId}"`);
    const relationQuery = encodeURIComponent(`author=_ownerId:users`)

    const result = await request.get(`${baseUrl}?where=${searchQuery}&load=${relationQuery}`);
    const comments = Object.values(result);

    return comments;
};

export const create = async (bookId, comment) => {
    const request = requestFactory();
    const result = await request.post(baseUrl, { bookId, comment });

    return result;
};