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
          <>
           <div className="menu">
            <Link to="/sinif" className="menu-button" onClick={() => setIsClassSelected(true)}>Sınıf</Link>
            <Link to="/tek-kisilik" className="menu-button">Tek Kişilik</Link>
            <Link to="/online" className="menu-button">Online</Link>
            
          </div>
          <div>
            <button className="footer-button">Nasıl Oynanır ?</button>
          </div>
          </>
         
          
          
        )}
        {isClassSelected && !isLiseSelected && (
          <>
          <div className="menu">
            <Link to="/sinif/ilkokul" className="menu-button">İlkokul</Link>
            <Link to="/sinif/ortaokul" className="menu-button">Ortaokul</Link>
            <Link to="/sinif/lise" className="menu-button" onClick={() => setIsLiseSelected(true)}>Lise</Link>
            
          </div>
          <div>
            <button onClick={() => setIsClassSelected(false)} className="back-button">Geri</button>
          </div>
          </>
          
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
              <Route path="/sinif/lise/:ders/:unite" element={<KonuDetay />} />
            </Routes>
          </div>
        )}
        
      </div>
    </Router>
  );
}
/*<footer className="footer">
          <button className="footer-button">Nasıl Oynanır ?</button>
</footer>*/
function Lise({ setIsLiseSelected }) {
  const navigate = useNavigate();

  const handleBackClick = () => {
    setIsLiseSelected(false);
    navigate('/sinif'); // Kategorilere geri döner
  };
//<h2>Lise Sınıf Seçimi</h2>
  return (
    <div className='lise-page'>
      <>
      <div className="menu">
        <Link to="/sinif/lise/9" className="menu-button">9. Sınıf</Link>
        <Link to="/sinif/lise/10" className="menu-button">10. Sınıf</Link>
        <Link to="/sinif/lise/11" className="menu-button">11. Sınıf</Link>
        <Link to="/sinif/lise/12" className="menu-button">12. Sınıf</Link>
      </div>
      <div>
        <button onClick={handleBackClick} className="back-button">Geri</button>
      </div>
      
      </>
      
      
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
    { name: "Ünite 1", path: "/sinif/lise/tarih/ünite1" },
    { name: "Ünite 2", path: "/sinif/lise/tarih/ünite2" },
    { name: "Ünite 3", path: "/sinif/lise/tarih/ünite3" },
    { name: "Ünite 4", path: "/sinif/lise/tarih/ünite4" },
    { name: "Ünite 5", path: "/sinif/lise/tarih/ünite5" },
    { name: "Ünite 6", path: "/sinif/lise/tarih/ünite6" },
    { name: "Ünite 7", path: "/sinif/lise/tarih/ünite7" },
    { name: "Ünite 8", path: "/sinif/lise/tarih/ünite8" },
    { name: "Ünite 9", path: "/sinif/lise/tarih/ünite9" }
  ];

  return (
    <div className="unite-detay">
      <h2>Üniteler</h2>
      <div className="courses-grid">
        {unites.map((unite) => (
          <Link key={unite.name} to={unite.path} className="course-button">
            {unite.name}
          </Link>
        ))}
      </div>
      <button onClick={() => navigate(-1)} className="back-button">Geri</button>
    </div>
  );
}

function KonuDetay() {
  const navigate = useNavigate();

  const topics = [
    { name: "Konu 1", path: "/sinif/lise/tarih/ünite1/konu1" },
    { name: "Konu 2", path: "/sinif/lise/tarih/ünite2/konu2" },
    { name: "Konu 3", path: "/sinif/lise/tarih/ünite3/konu3" },
    { name: "Konu 4", path: "/sinif/lise/tarih/ünite3/konu4" }
  ];

  return (
    <div className="konu-detay">
      <h2>Konular</h2>
      <div className="courses-grid">
        {topics.map((topic) => (
          <Link key={topic.name} to={topic.path} className="course-button">
            {topic.name}
          </Link>
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
