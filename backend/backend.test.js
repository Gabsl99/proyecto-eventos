const request = require('supertest');
const server = require('./server');

describe('Pruebas de Backend API (Eventos y Participantes)', () => {
  // Prueba 1: Obtener eventos
  it('Debe obtener la lista de eventos con status 200', async () => {
    const response = await request(server).get('/eventos');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Prueba 2: Crear un nuevo evento
  it('Debe crear un nuevo evento', async () => {
    const nuevoEvento = {
      id: "99", // Solución: Usamos un ID alto para evitar duplicados con los preinstalados
      titulo: "Taller de Node.js",
      descripcion: "Backend desde cero",
      fecha: "2026-09-10"
    };
    const response = await request(server).post('/eventos').send(nuevoEvento);
    expect(response.status).toBe(201);
    expect(response.body.titulo).toBe("Taller de Node.js");
  });

  // Prueba 3: Obtener participantes
  it('Debe obtener la lista de participantes', async () => {
    const response = await request(server).get('/participantes');
    expect(response.status).toBe(200);
  });
});