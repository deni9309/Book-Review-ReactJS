import { useForm } from "../../../hooks/useForm";

export const AddComment = ({
    onCommentSubmit,
}) => {
    const { values, changeHandler, onSubmit } = useForm({
        comment: ''
    }, onCommentSubmit);

    return (
        <article className="create-comment">
            <form className="form" onSubmit={onSubmit}>
                <textarea
                    className="comment"
                    name="comment"
                    placeholder="Write your comment here..."
                    value={values.comment}
                    onChange={changeHandler}>
                </textarea>
                    <input className="submit-button" type="submit" value="Add Comment" />
            </form>
        </article>
    );
};