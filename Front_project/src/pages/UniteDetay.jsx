import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
          <Link key={unite.name} to={`${unite.path}/konular`} className="course-button">
            {unite.name}
          </Link>
        ))}
      </div>
      <button onClick={() => navigate(-1)} className="back-button">Geri</button>
    </div>
  );
}

export default UniteDetay;
