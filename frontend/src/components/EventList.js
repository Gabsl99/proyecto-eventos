import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';

function EventList() {
  const [eventos, setEventos] = useState([]);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    cargarEventos();
  }, []);

  const cargarEventos = async () => {
    try {
      const response = await api.get('/eventos');
      setEventos(response.data);
    } catch (error) {
      console.error("Error cargando eventos", error);
    }
  };

  const eliminarEvento = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este evento?')) {
      await api.delete(`/eventos/${id}`);
      cargarEventos();
    }
  };

  const eventosFiltrados = eventos.filter(evento => 
    evento.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div>
      <h2 className="page-title" data-testid="titulo-lista">Lista de Eventos Académicos</h2>
      <div className="input-group mb-4" style={{ maxWidth: '400px' }}>
        <span className="input-group-text bg-white">
          <i className="bi bi-search text-muted"></i>
        </span>
        <input 
          type="text" 
          className="form-control" 
          placeholder="Buscar evento por título..." 
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>
      <div className="row">
        {eventosFiltrados.length === 0 ? (
          <div className="col-12"><p className="text-muted">No hay eventos registrados o que coincidan con la búsqueda.</p></div>
        ) : (
          eventosFiltrados.map(evento => (
            <div className="col-md-6 col-lg-4 mb-4" key={evento.id}>
              <div className="card h-100">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-primary">{evento.titulo}</h5>
                  <p className="card-text flex-grow-1">{evento.descripcion}</p>
                  
                  {/* Ícono de calendario agregado aquí */}
                  <p className="card-text text-muted small">
                    <i className="bi bi-calendar3 me-2"></i>
                    <strong>Fecha:</strong> {evento.fecha}
                  </p>
                  
                  <div className="mt-auto pt-3 d-flex gap-2">
                    {/* Ícono de lápiz agregado aquí */}
                    <Link to={`/editar-evento/${evento.id}`} className="btn btn-outline-primary btn-sm flex-fill">
                      <i className="bi bi-pencil-square me-1"></i> Editar
                    </Link>
                    
                    {/* Ícono de tacho de basura agregado aquí */}
                    <button className="btn btn-outline-danger btn-sm flex-fill" onClick={() => eliminarEvento(evento.id)}>
                      <i className="bi bi-trash me-1"></i> Eliminar
                    </button>
                  </div>
                  
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default EventList;