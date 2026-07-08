import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import EventForm from '../components/EventForm';

// Helper para envolver el componente en el Router
const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Pruebas Unitarias del Frontend (EventForm)', () => {
  
  // Prueba 4
  it('Debe renderizar el título del formulario de eventos', () => {
    renderWithRouter(<EventForm />);
    const titulo = screen.getByTestId('titulo-form-evento');
    expect(titulo).toBeInTheDocument();
    expect(titulo).toHaveTextContent('Registrar Nuevo Evento');
  });

  // Prueba 5
  it('Debe contener un botón para guardar el evento', () => {
    renderWithRouter(<EventForm />);
    const botonGuardar = screen.getByRole('button', { name: /Guardar Evento/i });
    expect(botonGuardar).toBeInTheDocument();
  });

  // Prueba 6
  it('Debe contener los campos de entrada de texto (input)', () => {
    renderWithRouter(<EventForm />);
    // Buscamos las etiquetas (labels) para asegurar que el formulario está completo
    expect(screen.getByText('Título del Evento')).toBeInTheDocument();
    expect(screen.getByText('Descripción')).toBeInTheDocument();
    expect(screen.getByText('Fecha')).toBeInTheDocument();
  });

});