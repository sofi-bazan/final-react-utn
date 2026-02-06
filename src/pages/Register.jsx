import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/index.css";

const Register = () => {

  const register = async e => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, pass);
    nav("/dashboard");
  };

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const nav = useNavigate();

  return (
    <form onSubmit={register}>
      <h2>Registro</h2>
      <input onChange={e => setEmail(e.target.value)} placeholder="Correo electrónico" type="email" required />
      <input type="password" required placeholder="Contraseña" onChange={e => setPass(e.target.value)} />
      <button>Crear cuenta</button>
    </form>
  )
}

export default Register