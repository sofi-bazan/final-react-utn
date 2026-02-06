import { useEffect, useState } from "react";
import { db, auth } from "../services/firebase";
import { collection, addDoc, deleteDoc, doc, onSnapshot, query, where } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useAuth } from "../context/AuthContext";

import "../styles/index.css";

export default function Dashboard() {
  const { user } = useAuth();
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, "tasks"), where("userId", "==", user.uid));
    
    return onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setTasks(docs);
    });
  }, [user]);

  const addTask = async () => {
    if (!task.trim()) return;
    await addDoc(collection(db, "tasks"), { name: task, userId: user.uid });
    setTask("");
  };

  const deleteTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <input name="task" placeholder="Nueva tarea..." value={task} onChange={e => setTask(e.target.value)} />
      <button onClick={addTask}>Agregar</button>

      {tasks.map(t => (
        <div key={t.id} className="tarea">
          {t.name}
          <button onClick={() => deleteTask(t.id)}>
            <img src="../public/close.png" alt="close-sing"/>
          </button>
          
        </div>
      ))}

      <button onClick={() => signOut(auth)}>
        Cerrar sesión
      </button>
    </div>
  );
}
