import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Lise() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/sinif');  // Sınıf sayfasına yönlendir
  };

  return (
    <div className="lise-page">
      <div className="menu">
        <Link to="/sinif/lise/9" className="menu-button">9. Sınıf</Link>
        <Link to="/sinif/lise/10" className="menu-button">10. Sınıf</Link>
        <Link to="/sinif/lise/11" className="menu-button">11. Sınıf</Link>
        <Link to="/sinif/lise/12" className="menu-button">12. Sınıf</Link>
      </div>
      <div>
        <button onClick={handleBackClick} className="back-button">Geri</button>
      </div>
    </div>
  );
}

export default Lise;
