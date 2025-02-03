import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App/App.jsx'
import './Styling/index.css'
import EventsPage from './Pages/ApiTest.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/events" element={<EventsPage />} />
            </Routes>
        </Router>
    </React.StrictMode>,
)
