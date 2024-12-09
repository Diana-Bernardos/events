
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Calendar from './components/Calendar';
import EventForm from './components/EventForm';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <div className="calendar-container">
          <h1 className="text-4xl font-bold text-center py-8 text-gray-800">
            Calendario de Eventos
          </h1>
          <Routes>
            <Route path="/" element={<Calendar />} />
            <Route path="/new-event" element={<EventForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
