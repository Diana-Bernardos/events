// src/components/EventForm.jsx
import React, { useState } from 'react';  // Agregamos la importación de useState
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, X } from 'lucide-react';

const EventForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    event_date: '',
    event_type: '',
    icon: '',
    color: '#3b82f6'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate('/');
      }
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fade-in">
      <button 
        onClick={() => navigate('/')}
        className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
      >
        <ArrowLeft className="h-5 w-5 mr-1" />
        Volver al calendario
      </button>

      <form onSubmit={handleSubmit} className="form-container">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Nuevo Evento</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Título del Evento
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-input"
            placeholder="Ej: Reunión de equipo"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Fecha y Hora
          </label>
          <input
            type="datetime-local"
            name="event_date"
            value={formData.event_date}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Tipo de Evento
          </label>
          <input
            type="text"
            name="event_type"
            value={formData.event_type}
            onChange={handleChange}
            className="form-input"
            placeholder="Ej: Reunión, Tarea, Recordatorio"
            required
          />
        </div>

        <div className="mb-4">
  <label className="block text-gray-700 text-sm font-medium mb-2">
    Icono
  </label>
  <select
    name="icon"
    value={formData.icon}
    onChange={handleChange}
    className="form-input"
  >
    <option value="default">📅 Predeterminado</option>
    <option value="meeting">👥 Reunión</option>
    <option value="task">✓ Tarea</option>
    <option value="reminder">⏰ Recordatorio</option>
    <option value="birthday">🎂 Cumpleaños</option>
    <option value="holiday">🌟 Festivo</option>
    <option value="work">💼 Trabajo</option>
    <option value="sport">⚽ Deporte</option>
    <option value="social">🎉 Social</option>
    <option value="health">🏥 Salud</option>
  </select>
</div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Color
          </label>
          <input
            type="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
            className="form-input h-10"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="button-secondary flex-1 flex items-center justify-center"
          >
            <X className="h-5 w-5 mr-1" />
            Cancelar
          </button>
          <button
            type="submit"
            className="button-primary flex-1 flex items-center justify-center"
          >
            <Save className="h-5 w-5 mr-1" />
            Guardar Evento
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;