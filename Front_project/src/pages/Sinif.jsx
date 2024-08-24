// src/pages/Sinif.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Sinif({ setIsClassSelected, setIsLiseSelected }) {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');  
  };

  return (
    <div className="sinif-page">
      <div className="menu">
        <Link to="/sinif" className="menu-button">İlkokul</Link>
        <Link to="/sinif" className="menu-button">Ortaokul</Link>
        <Link to="/sinif/lise" className="menu-button" onClick={() => setIsLiseSelected(true)}>Lise</Link>
      </div>
      <div>
        <button onClick={handleBackClick} className="back-button">Geri</button>
      </div>
    </div>
  );
}

export default Sinif;
