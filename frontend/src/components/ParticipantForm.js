import React, { useState, useEffect } from 'react';
import api from '../api';

function ParticipantForm() {
  const [eventos, setEventos] = useState([]);
  const [inscripciones, setInscripciones] = useState([]);
  const [participante, setParticipante] = useState({ nombre: '', email: '', eventoId: '' });
  const [mensajeExito, setMensajeExito] = useState(false);

  useEffect(() => {
    cargarDatos();
  }, []);

  // Cargamos tanto los eventos (para el select) como las inscripciones (para la tabla)
  const cargarDatos = async () => {
    try {
      const [resEventos, resInscripciones] = await Promise.all([
        api.get('/eventos'),
        api.get('/inscripciones')
      ]);
      setEventos(resEventos.data);
      setInscripciones(resInscripciones.data);
    } catch (error) {
      console.error("Error cargando datos de la API", error);
    }
  };

  const handleChange = (e) => {
    setParticipante({ ...participante, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/inscripciones', participante);
      
      setMensajeExito(true);
      setParticipante({ nombre: '', email: '', eventoId: '' });
      
      // Recargamos los datos para que la tabla se actualice al instante
      cargarDatos();
      
      setTimeout(() => {
        setMensajeExito(false);
      }, 3000);
      
    } catch (error) {
      console.error("Error inscribiendo participante", error);
      alert("Error al inscribir. Verifica que el backend esté corriendo.");
    }
  };

  // Función auxiliar para buscar el título del evento usando el ID guardado en la inscripción
  const obtenerNombreEvento = (eventoId) => {
    const evento = eventos.find(ev => ev.id === String(eventoId));
    return evento ? evento.titulo : 'Evento no encontrado / Eliminado';
  };

  return (
    <div className="row justify-content-center">
      <div className="col-lg-10">
        
        {/* Sección 1: Formulario de Registro */}
        <div className="card p-4 mt-2 mb-5">
          <h2 className="page-title" data-testid="titulo-form-participante">Inscribir Participante</h2>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label fw-bold">Nombre Completo</label>
                <input type="text" className="form-control" name="nombre" value={participante.nombre} onChange={handleChange} required placeholder="Ej: Juan Pérez" />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label fw-bold">Correo Electrónico</label>
                <input type="email" className="form-control" name="email" value={participante.email} onChange={handleChange} required placeholder="juan@ejemplo.com" />
              </div>
              <div className="col-md-4 mb-4">
                <label className="form-label fw-bold">Seleccionar Evento</label>
                <select className="form-select" name="eventoId" value={participante.eventoId} onChange={handleChange} required>
                  <option value="">Seleccione un evento...</option>
                  {eventos.map(ev => (
                    <option key={ev.id} value={ev.id}>{ev.titulo}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="d-grid mb-3">
              <button type="submit" className="btn btn-success btn-lg">Inscribir Participante</button>
            </div>

            {mensajeExito && (
              <div className="alert alert-success text-center fw-bold" role="alert">
                ¡Participante inscrito con éxito!
              </div>
            )}
          </form>
        </div>

        {/* Sección 2: Consultar Inscritos (Requerimiento de la consigna) */}
        <div className="card p-4">
          <h3 className="page-title text-success">Consultar Inscritos</h3>
          {inscripciones.length === 0 ? (
            <p className="text-muted">Aún no hay participantes inscritos en los eventos.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover table-bordered mt-3">
                <thead className="table-light">
                  <tr>
                    <th>Nombre</th>
                    <th>Correo Electrónico</th>
                    <th>Evento Inscrito</th>
                  </tr>
                </thead>
                <tbody>
                  {inscripciones.map(inscripcion => (
                    <tr key={inscripcion.id}>
                      <td>{inscripcion.nombre}</td>
                      <td>{inscripcion.email}</td>
                      <td className="fw-bold text-primary">{obtenerNombreEvento(inscripcion.eventoId)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default ParticipantForm;