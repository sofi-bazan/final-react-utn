import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { Link, useNavigate } from "react-router-dom";

import "../styles/index.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const nav = useNavigate();

  const [error, setError] = useState("");

  // manejo de errores login
  const login = async e => {
  e.preventDefault();
  setError("");

  try {
      await signInWithEmailAndPassword(auth, email, pass);
      nav("/dashboard");
    } catch (err) {
      console.log("Error login:", err.message);
      setError("Contraseña o correo electrónico incorrectos");
    }
  };

  return (
    <form onSubmit={login}>
      <h2>Login</h2>
      <input required type="email" placeholder="Correo electrónico" onChange={e => setEmail(e.target.value)} />
      <input required type="password" placeholder="Contraseña" onChange={e => setPass(e.target.value)} />
      <button>Ingresar</button>
      <p className="error">{error}</p>
      <Link to="/register">Registrarse</Link>
      <Link to="/about">Acerca del Proyecto</Link>
    </form>
  );
}

export default Login