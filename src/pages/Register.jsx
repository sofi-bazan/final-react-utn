import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/index.css";

const Register = () => {

  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const nav = useNavigate();

  const register = async e => {
    e.preventDefault();
    setError("");
    
    try {
      await createUserWithEmailAndPassword(auth, email, pass);
      nav("/dashboard");
      
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("Este correo ya está en uso");
      } else {
        setError("Error al registrar usuario");
      }
    }
  };

  return (
    <form onSubmit={register}>
      <h2>Registro</h2>
      <input onChange={e => setEmail(e.target.value)} placeholder="Correo electrónico" type="email" required />
      <input type="password" required placeholder="Contraseña" onChange={e => setPass(e.target.value)} />
      <button>Crear cuenta</button>
      <p className="error">{error}</p>
    </form>
  )
}

export default Register