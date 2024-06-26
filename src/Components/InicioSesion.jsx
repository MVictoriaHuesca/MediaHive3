
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "../styles/InicioSesion.css";

const InicioSesion = () => {
    const initialValues = { email: "", password: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    const submit = () => {
        console.log(formValues);
    };

    //input change handler
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    //form submission handler
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmitting(true);
    };

    //form validation handler
    const validate = (values) => {
        let errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        const Users = JSON.parse(localStorage.getItem('users')) || [];
        const validUser = Users.find(user => user.email === values.email && user.password === values.password);
        if (!validUser) {
            errors.email = <span className="error-message">Correo electrónico o contraseña incorrectos</span>;
            errors.password = <span className="error-message">Correo electrónico o contraseña incorrectos</span>;
        } else {
            localStorage.setItem('username', validUser.username);
            localStorage.setItem('profileImage', '');
            navigate(`/Inicio/${validUser.username}`);
        }

        if (!values.email) {
            errors.email = <span className="error-message">Este campo es obligatorio</span>;
        } else if (!regex.test(values.email)) {
            errors.email = <span className="error-message">Formato de correo electrónico no válido</span>;
        }

        if (!values.password) {
            errors.password = <span className="error-message">Este campo es obligatorio</span>;
        } else if (values.password.length < 4) {
            errors.password = <span className="error-message">La contraseña debe tener más de 4 caracteres</span>;
        }

        return errors;
    };

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmitting) {
            submit();
        }
    }, [formErrors]);

    return (
        <div id="inicioSesioncontainer">
            <link href='https://fonts.googleapis.com/css?family=Livvic' rel='stylesheet'></link>
            <div className="form-container-iniciosesion">
                <h1 style={{ fontWeight: 'bold', alignSelf:'center' }}>Inicio de sesión</h1>
                {Object.keys(formErrors).length === 0 && isSubmitting && (
                    <span>Formulario enviado con éxito</span>
                )}
                <form onSubmit={handleSubmit} noValidate>

                    <label htmlFor="email">Correo electrónico</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formValues.email}
                        onChange={handleChange}
                    />
                    {formErrors.email && <span className="error-message">{formErrors.email}</span>}


                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={formValues.password}
                        onChange={handleChange}
                    />
                    {formErrors.password && <span className="error-message">{formErrors.password}</span>}

                    <button type="submit">Aceptar</button>
                </form>
            </div>
        </div>
    );
};

export default InicioSesion;
