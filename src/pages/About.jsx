import "../styles/index.css";

const About = () => {
  return (
    <div className="about">
      <h2>Acerca del Proyecto</h2>

      <h3>Descripción</h3>
      <p>
        Esta aplicación web fue desarrollada como trabajo final integrador
        en React JS. Permite registrarse, iniciar sesión y gestionar tareas
        desde un panel principal (dashboard).
      </p>

      <h3>Tecnologías</h3>
      <ul>
        <li>React JS</li>
        <li>Firebase</li>
        <li>CSS nativo</li>
      </ul>

      <h3>Estructura y autenticación</h3>
      <p>
        Se organiza en páginas, componentes reutilizables y un contexto global
        de autenticación. Las rutas privadas verifican el usuario antes de
        permitir el acceso al dashboard.
      </p>

      <h3>Dificultades</h3>
      <p>
        El principal desafío fue el dashboard, debido a la tardanza en que
        aparecían las tareas. Se solucionó ajustando la gestión del estado
        y optimizando la carga de datos.
      </p>
    </div>
  )
}

export default About