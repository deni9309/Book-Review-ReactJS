import { useState } from "react";

export const useForm = (initialValues, onSubmitHandler) => {
    const [values, setValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({
            'password': '',
            'confirmPassword': '',
            'title': '',
            'author': '',
            'imageUrl': '',
            'genre': '',
            'publisher': '',
            'price': '',
        });

    const changeHandler = (e) => {
        setValues(state => ({ ...state, [e.target.name]: e.target.value }));
    };

    const formValidate = (e) => {
        //TODO: assure 'newValues' shape matches 'initialValues'

        const value = e.target.value;
        const name = e.target.name;
        let errors = {};
        if (name === 'password' && value.length < 3) {
            errors.password = 'Password must be at least 3 characters long.';
        } else if (name === 'confirmPassword' && value.length < 3) {
            errors.confirmPassword = 'Password must be at least 3 characters long.';
        } else if (name === 'title' && value.length < 2) {
            errors.title = 'Book Title must be at least 2 characters long.';
        } else if (name === 'author' && value.length < 3) {
            errors.author = 'Book Author must be at least 3 characters long.';
        } else if (name === 'publisher' && value.length < 3) {
            errors.publisher = 'Book Publisher must be at least 3 characters long.';
        }

        setFormErrors(errors);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        onSubmitHandler(values);

        setValues(initialValues); //reset form fields after submit
    };

    const changeValues = (newValues) => {
        setValues(newValues);
    };

    return {
        values,
        formErrors,
        formValidate,
        changeHandler,
        onSubmit,
        changeValues,
    };
};