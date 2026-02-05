import { createContext, useContext, useEffect, useState } from "react";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    useEffect(() => {
            console.log("AuthContext iniciado");

    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
            console.log("Usuario autenticado:", firebaseUser.email);
        } else {
            console.log("Usuario no autenticado");
        }

      setUser(firebaseUser);
    });

    return unsub;
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
        {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
