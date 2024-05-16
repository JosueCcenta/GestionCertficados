import React, { useState } from 'react';
import { useForm } from 'react-hook-form'; // Asumo que estás usando react-hook-form

const Login = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const [error, setError] = useState(null);

    const onSubmit = handleSubmit((data) => {
        console.log(data);
    });

    return (
        <div className="container">
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
            <div className="redes">
                <ul>
                    <li className="elemento-lista">
                        <a className="containerA" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-browser-chrome" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M16 8a8 8 0 0 1-7.022 7.94l1.902-7.098a3 3 0 0 0 .05-1.492A3 3 0 0 0 10.237 6h5.511A8 8 0 0 1 16 8M0 8a8 8 0 0 0 7.927 8l1.426-5.321a3 3 0 0 1-.723.255 3 3 0 0 1-1.743-.147 3 3 0 0 1-1.043-.7L.633 4.876A8 8 0 0 0 0 8m5.004-.167L1.108 3.936A8.003 8.003 0 0 1 15.418 5H8.066a3 3 0 0 0-1.252.243 2.99 2.99 0 0 0-1.81 2.59M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/>
                        </svg></a>
                        Visita Nuestra pagina web
                    </li>
                    <li className="elemento-lista">
                        <a className="containerA" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 16 16">
                            <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                        </svg></a>
                        Tienes dudas? Escribenos (FontWsp)
                    </li>
                    <li className="elemento-lista">
                        <a className="containerA" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
                        </svg></a>
                        Tenemos noticias para ti en Facebook
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Login;
