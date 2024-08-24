import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import '../src/App.css';

// Bileşenleri import edin
import GamePage from './pages/GamePage';
import Registration from './pages/Registration';
import Lise from './pages/Lise';
import Sinif from './pages/Sinif';  // Import the new Sinif component
import SinifDetay from './pages/SinifDetay';
import UniteDetay from './pages/UniteDetay';
import KonuDetay from './pages/KonuDetay';

function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1 className="title">TUNGA</h1>
        </header>
        <Routes>
          {/* Ana menü */}
          <Route 
            path="/" 
            element={
              <>
                <div className="menu">
                  <Link to="/sinif" className="menu-button">Sınıf</Link>
                  <Link to="/tek-kisilik" className="menu-button">Tek Kişilik</Link>
                  <Link to="/online" className="menu-button">Online</Link>
                </div>
                <div>
                  <button className="footer-button">Nasıl Oynanır?</button>
                </div>
              </>
            } 
          />

          {/* Sınıf sayfası */}
          <Route path="/sinif" element={<Sinif />} />

          {/* Lise detayları ve diğer sayfalar */}
          <Route path="/sinif/lise" element={<Lise />} />
          <Route path="/sinif/lise/9" element={<SinifDetay sinif="9. Sınıf" />} />
          <Route path="/sinif/lise/10" element={<SinifDetay sinif="10. Sınıf" />} />
          <Route path="/sinif/lise/11" element={<SinifDetay sinif="11. Sınıf" />} />
          <Route path="/sinif/lise/12" element={<SinifDetay sinif="12. Sınıf" />} />
          <Route path="/sinif/lise/:ders/konular" element={<UniteDetay />} />
          <Route path="/sinif/lise/:ders/:unite/konular" element={<KonuDetay />} />
          <Route path="/sinif/lise/:ders/:unite/konular/:konu/registration" element={<Registration />} />
          <Route path="/sinif/lise/:ders/:unite/konular/:konu/game" element={<GamePage />} />

          {/* Yönlendirmeler ve varsayılan rota */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
