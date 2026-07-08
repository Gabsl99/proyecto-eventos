import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EventList from './components/EventList';
import EventForm from './components/EventForm';
import ParticipantForm from './components/ParticipantForm';

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">Gestión Universitaria</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Ver Eventos</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/crear-evento">Nuevo Evento</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/inscripcion">Inscripciones</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<EventList />} />
          <Route path="/crear-evento" element={<EventForm />} />
          {/* Nueva ruta para editar pasándole el ID del evento */}
          <Route path="/editar-evento/:id" element={<EventForm />} /> 
          <Route path="/inscripcion" element={<ParticipantForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;