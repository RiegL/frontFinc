"use client";

import { useState } from "react";

export const  RegisterForm = () => {
    const [message, setMessage] = useState()

    const handleSubmit = (e) => {
        e.preventDefault();
        // setMessage('Formulário enviado')
        console.log("Formulario enviado")
    }

  return (
    <form onSubmit={handleSubmit}>
        <h1>Registrar</h1>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" placeholder="E-mail" required />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Password" required />
        <label htmlFor="name">Name</label>
        <input type="text" id="text" name="text" placeholder="Name" required />
        <button type="submit">Login</button>
    </form>
  );
};

export default RegisterForm;
