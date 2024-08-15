import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import './App.css';

function App() {
  const [isClassSelected, setIsClassSelected] = useState(false);
  const [isLiseSelected, setIsLiseSelected] = useState(false);

  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1 className="title">TUNGA</h1>
        </header>
        {!isClassSelected && (
          <div className="menu">
            <Link to="/sinif" className="menu-button" onClick={() => setIsClassSelected(true)}>Sınıf</Link>
            <Link to="/tek-kisilik" className="menu-button">Tek Kişilik</Link>
            <Link to="/online" className="menu-button">Online</Link>
          </div>
        )}
        {isClassSelected && !isLiseSelected && (
          <div className="menu">
            <Link to="/sinif/ilkokul" className="menu-button">İlkokul</Link>
            <Link to="/sinif/ortaokul" className="menu-button">Ortaokul</Link>
            <Link to="/sinif/lise" className="menu-button" onClick={() => setIsLiseSelected(true)}>Lise</Link>
            <button onClick={() => setIsClassSelected(false)} className="back-button">Geri</button>
          </div>
        )}
        {isLiseSelected && (
          <div className="content">
            <Routes>
              <Route path="/sinif/lise" element={<Lise setIsLiseSelected={setIsLiseSelected} />} />
              <Route path="/sinif/lise/9" element={<SinifDetay sinif="9. Sınıf" />} />
              <Route path="/sinif/lise/10" element={<SinifDetay sinif="10. Sınıf" />} />
              <Route path="/sinif/lise/11" element={<SinifDetay sinif="11. Sınıf" />} />
              <Route path="/sinif/lise/12" element={<SinifDetay sinif="12. Sınıf" />} />
              <Route path="/sinif/lise/:ders" element={<UniteDetay />} />
            </Routes>
          </div>
        )}
        <footer className="footer">
          <button className="footer-button">Nasıl Oynanır ?</button>
        </footer>
      </div>
    </Router>
  );
}

function Lise({ setIsLiseSelected }) {
  const navigate = useNavigate();

  const handleBackClick = () => {
    setIsLiseSelected(false);
    navigate('/sinif'); // Kategorilere geri döner
  };

  return (
    <div>
      <h2>Lise Sınıf Seçimi</h2>
      <div className="menu">
        <Link to="/sinif/lise/9" className="menu-button">9. Sınıf</Link>
        <Link to="/sinif/lise/10" className="menu-button">10. Sınıf</Link>
        <Link to="/sinif/lise/11" className="menu-button">11. Sınıf</Link>
        <Link to="/sinif/lise/12" className="menu-button">12. Sınıf</Link>
      </div>
      <button onClick={handleBackClick} className="back-button">Geri</button>
    </div>
  );
}

function SinifDetay({ sinif }) {
  const navigate = useNavigate();

  const courses = [
    { name: "Tarih", path: "/sinif/lise/tarih" },
    { name: "Coğrafya", path: "/sinif/lise/cografya" },
    { name: "Fizik", path: "/sinif/lise/fizik" },
    { name: "Kimya", path: "/sinif/lise/kimya" },
    { name: "Biyoloji", path: "/sinif/lise/biyoloji" },
    { name: "Matematik", path: "/sinif/lise/matematik" },
    { name: "Edebiyat", path: "/sinif/lise/edebiyat" },
    { name: "Din", path: "/sinif/lise/din" },
    { name: "İngilizce", path: "/sinif/lise/ingilizce" }
  ];

  return (
    <div className="sinif-detay">
      <h2>{sinif} Dersleri</h2>
      <div className="courses-grid">
        {courses.map((course) => (
          <Link key={course.name} to={course.path} className="course-button">
            {course.name}
          </Link>
        ))}
      </div>
      <button onClick={() => navigate(-1)} className="back-button">Geri</button>
    </div>
  );
}

function UniteDetay() {
  const navigate = useNavigate();

  const unites = [
    "Ünite 1: Konu A",
    "Ünite 2: Konu B",
    "Ünite 3: Konu C",
    "Ünite 4: Konu D",
    "Ünite 5: Konu E",
    "Ünite 6: Konu F",
    "Ünite 7: Konu G",
    "Ünite 8: Konu H",
    "Ünite 9: Konu I"
  ];

  return (
    <div className="unite-detay">
      <h2>Üniteler</h2>
      <div className="courses-grid">
        {unites.map((unite) => (
          <div key={unite} className="course-button">
            {unite}
          </div>
        ))}
      </div>
      <button onClick={() => navigate(-1)} className="back-button">Geri</button>
    </div>
  );
}

function TekKisilik() {
  return <div>Tek Kişilik içeriği buraya gelecek.</div>;
}

function Online() {
  return <div>Online içeriği buraya gelecek.</div>;
}

export default App;
