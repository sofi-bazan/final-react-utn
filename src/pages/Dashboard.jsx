import { useEffect, useState } from "react";
import { db, auth } from "../services/firebase";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { signOut } from "firebase/auth";

const Dashboard = () => {

  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const tasksRef = collection(db, "tasks");

  const loadTasks = async () => {
    const data = await getDocs(tasksRef);
    setTasks(data.docs.map(d => ({ ...d.data(), id: d.id })));
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = async () => { await addDoc(tasksRef, { name: task });
    loadTasks();
  };

  const deleteTask = async id => { await deleteDoc(doc(db, "tasks", id));
    loadTasks();
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <h3>Agregar una tarea:</h3>
      <input placeholder="Nueva tarea..." onChange={e => setTask(e.target.value)} />
      <button onClick={addTask}>Agregar</button>
      {tasks.map(t => ( 
        <div key={t.id}> {t.name}
          <button onClick={() => deleteTask(t.id)}>X</button>
        </div>
      ))}
      <button onClick={() => signOut(auth)}>Salir</button>
    </div>
  )
}

export default Dashboard
