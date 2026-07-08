import React, { useState, useEffect } from 'react';
import api from '../api';
import { useNavigate, useParams } from 'react-router-dom'; 

function EventForm() {
  const [evento, setEvento] = useState({ titulo: '', descripcion: '', fecha: '' });
  const [mensajeExito, setMensajeExito] = useState(false);
  
  const navigate = useNavigate();
  const { id } = useParams(); // Extrae el ID de la URL si estamos en modo "Editar"

  // Si detecta un ID, va a la base de datos y trae la información del evento
useEffect(() => {
    if (id) {
      cargarEventoAEditar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const cargarEventoAEditar = async () => {
    try {
      const response = await api.get(`/eventos/${id}`);
      setEvento(response.data);
    } catch (error) {
      console.error("Error cargando el evento para editar", error);
    }
  };

  const handleChange = (e) => {
    setEvento({ ...evento, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        // Si hay ID, hacemos un PUT para actualizar la información
        await api.put(`/eventos/${id}`, evento);
      } else {
        // Si no hay ID, hacemos un POST para crear uno nuevo
        await api.post('/eventos', evento);
      }
      
      setMensajeExito(true);
      
      if (!id) {
        setEvento({ titulo: '', descripcion: '', fecha: '' });
      }
      
      setTimeout(() => {
        navigate('/');
      }, 2000);
      
    } catch (error) {
      console.error("Error guardando evento", error);
      alert("Error al guardar. ¿Aseguraste de tener encendido el terminal del backend?");
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8 col-lg-6">
        <div className="card p-4 mt-2">
          {/* El título cambia dependiendo de la acción */}
          <h2 className="page-title" data-testid="titulo-form-evento">
            {id ? 'Editar Evento' : 'Registrar Nuevo Evento'}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-bold">Título del Evento</label>
              <input type="text" className="form-control" name="titulo" value={evento.titulo} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Descripción</label>
              <textarea className="form-control" name="descripcion" rows="3" value={evento.descripcion} onChange={handleChange} required></textarea>
            </div>
            <div className="mb-4">
              <label className="form-label fw-bold">Fecha</label>
              <input type="date" className="form-control" name="fecha" value={evento.fecha} onChange={handleChange} required />
            </div>
            
            <div className="d-grid mb-3">
              {/* El texto del botón cambia dependiendo de la acción */}
              <button type="submit" className="btn btn-primary btn-lg">
                {id ? 'Actualizar Evento' : 'Guardar Evento'}
              </button>
            </div>

            {mensajeExito && (
              <div className="alert alert-success text-center fw-bold" role="alert">
                {id ? '¡Evento actualizado con éxito!' : '¡Evento guardado con éxito!'} Redirigiendo a la lista...
              </div>
            )}
            
          </form>
        </div>
      </div>
    </div>
  );
}

export default EventForm;