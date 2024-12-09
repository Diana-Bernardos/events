// src/components/Calendar.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar as CalendarIcon, Plus, Trash2, AlertCircle } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameDay } from 'date-fns';
import { es } from 'date-fns/locale';

// Objeto con iconos comunes - puedes agregar más según necesites
const eventIcons = {
  meeting: "👥",
  task: "✓",
  reminder: "⏰",
  birthday: "🎂",
  holiday: "🌟",
  work: "💼",
  sport: "⚽",
  social: "🎉",
  health: "🏥",
  default: "📅"
};

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/events');
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const deleteEvent = async (eventId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este evento?')) {
      try {
        const response = await fetch(`http://localhost:3000/api/events/${eventId}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          setEvents(events.filter(event => event.id !== eventId));
        }
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  const getEventIcon = (iconName) => {
    return eventIcons[iconName.toLowerCase()] || eventIcons.default;
  };

  const getDaysInMonth = () => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    return eachDayOfInterval({ start, end });
  };

  const getEventsForDay = (date) => {
    return events.filter(event => 
      isSameDay(new Date(event.event_date), date)
    );
  };

  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <CalendarIcon className="h-6 w-6 text-blue-500 mr-2" />
          <h2 className="text-2xl font-semibold text-gray-800">
            {format(currentDate, 'MMMM yyyy', { locale: es })}
          </h2>
        </div>
        <Link 
          to="/new-event" 
          className="button-primary flex items-center"
        >
          <Plus className="h-5 w-5 mr-1" />
          Nuevo Evento
        </Link>
      </div>

      {/* Vista de Calendario */}
      <div className="mb-8">
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
            <div key={day} className="text-center font-semibold p-2">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {getDaysInMonth().map((day, index) => {
            const dayEvents = getEventsForDay(day);
            return (
              <div
                key={day.toISOString()}
                className={`min-h-24 p-2 border rounded ${
                  isToday(day) ? 'bg-blue-50 border-blue-200' : 'bg-white'
                } ${
                  isSameDay(day, selectedDate) ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedDate(day)}
              >
                <div className="font-medium text-sm mb-1">
                  {format(day, 'd')}
                </div>
                {dayEvents.map((event, i) => (
                  <div
                    key={event.id}
                    className="text-xs p-1 mb-1 rounded truncate"
                    style={{ backgroundColor: `${event.color}20`, color: event.color }}
                  >
                    <span className="mr-1">{getEventIcon(event.icon || 'default')}</span>
                    {event.title}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* Lista de Eventos del Día Seleccionado */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">
          Eventos para {format(selectedDate, 'd MMMM yyyy', { locale: es })}
        </h3>
        <div className="space-y-4">
          {getEventsForDay(selectedDate).length === 0 ? (
            <div className="text-center py-8 text-gray-500 flex flex-col items-center">
              <AlertCircle className="h-8 w-8 mb-2" />
              <p>No hay eventos para este día</p>
            </div>
          ) : (
            getEventsForDay(selectedDate).map(event => (
              <div 
                key={event.id}
                className="event-card fade-in"
                style={{ borderLeftColor: event.color }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">
                      {getEventIcon(event.icon || 'default')}
                    </span>
                    <h3 className="event-title">{event.title}</h3>
                  </div>
                  <button
                    onClick={() => deleteEvent(event.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <p className="event-date flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-1 text-gray-400" />
                    {format(new Date(event.event_date), 'HH:mm', { locale: es })}
                  </p>
                  <span 
                    className="event-type"
                    style={{ 
                      backgroundColor: `${event.color}15`,
                      color: event.color,
                      borderColor: event.color
                    }}
                  >
                    {event.event_type}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Calendar;