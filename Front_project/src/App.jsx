import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import '../src/App.css';
import Sidebar from './Components/SideBar'; // Sidebar bileşenini import ediyoruz

// Components
import GamePage from './pages/GamePage';
import HomePage from './pages/HomePage';
import GameSelection from './pages/GameSelection';
import SinifDetay from './pages/SinifDetay';
import UniteDetay from './pages/UniteDetay';
import KonuDetay from './pages/KonuDetay';
import Registration from './pages/Registration';
import AuthSystem from './Components/AuthSystem';
import OgrenciProfil from './pages/Profile'; // Profil sayfasını import ediyoruz
import StudentAnalytics from './pages/Analize'; // Analiz sayfasını import ediyoruz

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
    // Gerekirse localStorage temizleme veya token silme işlemleri burada yapılabilir
  };

  return (
    <Router>
      <Sidebar 
        isAuthenticated={isAuthenticated} 
        onLogout={handleLogout} 
      />
      
      {/* Ana içerik alanı - z-index değerini düşürüyoruz ki sidebar'ın altında kalmasın */}
      <div style={{ backgroundColor: "#66cdaa" }} className="min-h-screen relative z-0">
        <header className="pt-4">
          <h1 className="text-center text-black text-6xl font-bold ">TUNGA</h1>
        </header>
        
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route 
              path="/" 
              element={
                isAuthenticated ? (
                  <HomePage />
                ) : (
                  <Navigate to="/auth" replace />
                )
              } 
            />

            <Route 
              path="/auth" 
              element={
                <AuthSystem 
                  onAuthSuccess={() => setIsAuthenticated(true)} 
                />
              } 
            />

            <Route 
              path="/profile" 
              element={isAuthenticated ? <OgrenciProfil /> : <Navigate to="/auth" replace />} 
            />

            <Route 
              path="/gameselection" 
              element={isAuthenticated ? <GameSelection /> : <Navigate to="/auth" replace />} 
            />

            <Route 
              path="/sinif" 
              element={isAuthenticated ? <SinifDetay sinif="Lise 9" /> : <Navigate to="/auth" replace />} 
            />

            <Route 
              path="/sinif/lise/9/:ders" 
              element={isAuthenticated ? <UniteDetay /> : <Navigate to="/auth" replace />} 
            />

            <Route 
              path="/sinif/lise/9/:ders/:unite" 
              element={isAuthenticated ? <KonuDetay /> : <Navigate to="/auth" replace />} 
            />

            <Route 
              path="/sinif/lise/9/:ders/:unite/:konu/registration" 
              element={isAuthenticated ? <Registration /> : <Navigate to="/auth" replace />} 
            />

            <Route 
              path="/sinif/lise/9/:ders/:unite/:konu/game" 
              element={isAuthenticated ? <GamePage /> : <Navigate to="/auth" replace />} 
            />

            <Route 
              path="/analytics" 
              element={isAuthenticated ? <StudentAnalytics /> : <Navigate to="/auth" replace />} 
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;