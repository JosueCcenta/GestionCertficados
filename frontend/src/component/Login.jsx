import React, { useState } from 'react';
import { useForm } from 'react-hook-form'; 

const Login = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const [error, setError] = useState(null);

    const onSubmit = handleSubmit((data) => {
        console.log(data);
    });

    return (
        <div className="container colors-azul_oscuro">
            <form onSubmit={onSubmit}>
                <img src="src\img\logo.webp" alt="Logo ERP" />
                <p className="title">Bienvenido</p>
                <p className="subtitle">Por favor ingresa tus credenciales</p>
                <input className="margin-top1" placeholder="Dni..." type="text"
                    {...register('Dni', {
                        required: {
                            value: true,
                            message: "Se requiere el dni"
                        },
                        minLength: {
                            value: 8,
                            message: 'El dni debe de tener 8 numeros'
                        },
                        maxLength: {
                            value: 20,
                            message: 'El carnet de extranjeria no debe superar los 20 numeros'
                        }
                    })} />
                {errors.Dni && (<span>{errors.Dni.message}</span>)}
                <input className="margin-top1" placeholder="Contraseña" type="password"
                    {...register('Contrasena', {
                        required: {
                            value: true,
                            message: "Se requiere la contraseña"
                        },
                        minLength: {
                            value: 5,
                            message: "La contraseña debe de tener minimo 5 caracteres"
                        }
                    })} />
                {errors.Contrasena && (<span>{errors.Contrasena.message}</span>)}
                <div className="containerA">
                    <a href="#" className="redireccion">Olvidaste tu contraseña?</a>
                </div>
                <button className="margin-top1 submit-button">Ingresar</button>
            </form>
            
        </div>
    );
};

export default Login;
