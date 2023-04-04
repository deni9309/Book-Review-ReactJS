export const bookReducer = (state, action) => {
    switch (action.type) {
        case 'BOOK_FETCH':
            return { ...action.payload } //return Object.assign({}, action.payload);
        case 'COMMENT_ADD':
            return {
                ...state,
                comments: [
                    ...state.comments,
                    {
                        ...action.payload,
                        author: {
                            email: action.email
                        }
                    }
                ]
            };
        default:
            return state;
    }
};