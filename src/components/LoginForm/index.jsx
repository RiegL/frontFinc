"use client";

import { useState } from "react";

export const  LoginForm = () => {
    const [message, setMessage] = useState()

    const handleSubmit = (e) => {
        e.preventDefault();
        // setMessage('Formulário enviado')
        console.log('Formulário enviado')
    }

  return (
    <form onSubmit={handleSubmit}>
        <h1>login</h1>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" placeholder="E-mail" required />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Password" required />
        <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
