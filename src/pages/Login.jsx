import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const nav = useNavigate();

  // manejo de errores login
  const login = async e => {
  e.preventDefault();
  try {
      await signInWithEmailAndPassword(auth, email, pass);
      nav("/dashboard");
    } catch (err) {
      console.log("Error login:", err.message);
    }
  };

  return (
    <form onSubmit={login}>
      <h2>Login</h2>
      <input required placeholder="Correo electrónico" onChange={e => setEmail(e.target.value)} />
      <input required type="password" placeholder="Contraseña" onChange={e => setPass(e.target.value)} />
      <button>Ingresar</button>
      <Link to="/register">Registrarse</Link>
    </form>
  );
}

export default Login